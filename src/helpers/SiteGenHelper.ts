import { Environment } from "./Environment.js";

// Low-cost page generation. JEV (typed decisions, no text) picks the structure, judges layouts, fact-checks copy and
// picks visuals; a small chat model only fills named text slots. No model ever emits builder JSON: every template below is a fixed
// section + element tree from the ElementTypes catalog, so output can never be structurally invalid.

export interface SiteGenChurch {
  name: string;
  brief: string;
  address?: string;
  palette?: { accent?: string; dark?: string; light?: string };
  // Facts pulled from the church's own B1 records (service times, campuses...). Counts as ground truth for fact-checking.
  facts?: string;
  hasServiceTimes?: boolean;
  hasGroups?: boolean;
  nextService?: { dayOfWeek: number; time: string };
  // True when the client swaps "pexels:<term>" placeholders for real photos. Older clients get a built-in image instead.
  resolvesPhotos?: boolean;
  pageType?: string;
  // True once the dialog has shown its follow-up questions, so they are not offered twice.
  askedQuestions?: boolean;
}

export interface SiteGenUsage { jevIn: number; jevCalls: number; copyIn: number; copyOut: number; copyCalls: number }

const JEV = "typesafe-ai/jev";
// The copywriter. A blind side-by-side against Claude Haiku 4.5 was close (Haiku slightly warmer), and this is about 4x cheaper
// and faster. Any chat model id on the gateway works; set SITEGEN_COPY_MODEL=anthropic/claude-haiku-4.5 to switch back.
const COPY_MODEL = process.env.SITEGEN_COPY_MODEL || "openai/gpt-4.1-mini";
const CANDIDATES = 10;
const TOP = 3;
const SAMPLE_TEMP = 1.5;
const JEV_TIMEOUT_MS = 6000;
// JEV is nearly free, so a slow call is raced against a duplicate instead of waited on.
const JEV_HEDGE_MS = 1500;
const COPY_TIMEOUT_MS = 12000;
// API Gateway cuts requests at 29s; skip the optional repair pass once a writePage call has used this much.
const REPAIR_DEADLINE_MS = 14000;
const HEADLINE_OPTIONS = 5;
const SECTIONS_PER_CALL = 2;

type Slot = { guide: string; max: number };
const s = (guide: string, max: number): Slot => ({ guide, max });
const threeCards = (first: string) => ({
  heading: s("Section heading", 50),
  intro: s("One or two sentences under the heading that set up the three cards", 220),
  c1t: s(first, 30),
  c1: s("Card 1 text: two full sentences", 240),
  c2t: s("Card 2 title", 30),
  c2: s("Card 2 text: two full sentences", 240),
  c3t: s("Card 3 title", 30),
  c3: s("Card 3 text: two full sentences", 240)
});

export const SECTIONS: Record<string, { role: "hero" | "mid" | "close"; desc: string; slots: Record<string, Slot> }> = {
  heroPhoto: {
    role: "hero",
    desc: "Full-width photo hero with big headline, a supporting sentence or two, and one button. Classic, warm, works for any page.",
    slots: { headline: s("Main headline, concrete and specific to this page's subject", 60), sub: s("One or two supporting sentences", 200), button: s("Button label", 22) }
  },
  heroTimes: {
    role: "hero",
    desc: "Hero with headline plus the key when-and-where line shown right in the hero (service times, or an event's date, time and place). Best when the reader's main question is when and where.",
    slots: { headline: s("Main headline", 60), sub: s("One or two supporting sentences", 180), times: s("Service times, or the event's date, time and place; compact, separated by ' · '", 110), button: s("Button label", 22) }
  },
  heroVideo: {
    role: "hero",
    desc: "Hero with headline beside the latest sermon video. Best for churches that stream and whose visitors watch online before attending.",
    slots: { headline: s("Main headline", 60), sub: s("One or two supporting sentences", 200), button: s("Button label", 22), videoCaption: s("Caption under the video", 60) }
  },
  heroSplit: {
    role: "hero",
    desc: "Split hero: headline and button on one side, a photo on the other, on a light background. Calmer and more editorial than a full-bleed photo; good for about, ministry and information pages.",
    slots: { headline: s("Main headline", 60), sub: s("One or two supporting sentences", 200), button: s("Button label", 22) }
  },
  welcome: {
    role: "mid",
    desc: "Two-column photo and text: who the church is on a general page, or the story behind this page's subject (why this event, what it means) on a focused page.",
    slots: { heading: s("Section heading", 50), body: s("Two short paragraphs (separate them with a blank line) about the page's subject, using real details", 700) }
  },
  expect: {
    role: "mid",
    desc: "What to expect: three icon cards about what it will actually be like (a first visit, or the event this page is about). Lowers anxiety for someone coming for the first time.",
    slots: threeCards("Card 1 title: an aspect of the experience")
  },
  pathways: {
    role: "mid",
    desc: "Three quick-link cards for the specific things people come looking for, or the different ways to take part (e.g. baptism, marriage prep, a recovery group; or attend, bring a dish, volunteer).",
    slots: threeCards("Card 1: a thing people look for, or a way to take part")
  },
  times: {
    role: "mid",
    desc: "Service times block: every regular gathering with day and time. Essential on general pages; on an event page it invites people back on Sundays.",
    slots: { heading: s("Section heading", 50), rows: s("Every gathering, one per line as 'Name | day and time'", 420), note: s("One or two sentences under the list", 220) }
  },
  ministries: {
    role: "mid",
    desc: "Three ministry photo cards (e.g. kids, students, groups, recovery, outreach). Best when the church has distinct programs people search for.",
    slots: threeCards("Ministry 1 name")
  },
  pastor: {
    role: "mid",
    desc: "Personal note from the pastor: a first-person message and signature, no photo. Builds trust for small or relational churches.",
    slots: { heading: s("Section heading", 50), body: s("First-person note from the pastor, four to six sentences, sounds like a real person", 600), sign: s("Signature line: name and role", 60) }
  },
  sermon: {
    role: "mid",
    desc: "Latest sermon / watch online band with the newest sermon video and a link to the archive.",
    slots: { heading: s("Section heading", 50), body: s("Two or three sentences on what the teaching is like", 350), button: s("Button label", 22) }
  },
  quote: {
    role: "mid",
    desc: "Large pull quote: a scripture verse that fits the page's subject, or a line about the church's heart, centered on a colored band. A breather between dense sections.",
    slots: { quote: s("A scripture verse (quoted accurately) that fits this page's subject", 260), cite: s("Reference or attribution", 50) }
  },
  faq: {
    role: "mid",
    desc: "FAQ with five questions a first-time visitor, or someone deciding whether to come to this event, would actually ask.",
    slots: {
      heading: s("Section heading", 50),
      q1: s("Question 1: only ask questions the brief can answer, or that can be answered honestly without new facts", 80),
      a1: s("Answer 1: two or three sentences, no promises the brief does not make", 300),
      q2: s("Question 2", 80),
      a2: s("Answer 2", 300),
      q3: s("Question 3", 80),
      a3: s("Answer 3", 300),
      q4: s("Question 4", 80),
      a4: s("Answer 4", 300),
      q5: s("Question 5", 80),
      a5: s("Answer 5", 300)
    }
  },
  serve: {
    role: "mid",
    desc: "Community impact band: what this church does for its neighbors (food pantry, recovery, school), with one short highlight box.",
    slots: { heading: s("Section heading", 50), body: s("Three or four sentences about real community work from the brief", 450), highlight: s("Short highlight, e.g. 'Open every Thursday'", 40) }
  },
  details: {
    role: "mid",
    desc: "Key details: three icon cards answering the practical questions about this page's subject (when, where, what to bring, who it is for, cost, how to sign up). The core of any event page.",
    slots: threeCards("Card 1 title: a practical detail stated in the request")
  },
  eventCountdown: {
    role: "mid",
    desc: "Live countdown to the event's date. Builds anticipation for a dated event.",
    slots: { title: s("Short line above the countdown naming the event", 50), date: s("The event's start as an ISO date-time, e.g. 2026-11-12T18:00. Use the date and time from the request and the next future occurrence of that date. If the request gives no time, use 12:00", 20) }
  },
  gallery: {
    role: "mid",
    desc: "Photo strip: three photos that set the mood for this page's subject, under a short heading. Adds warmth and breaks up text; needs no facts.",
    slots: { heading: s("Short heading for the photo strip", 50), intro: s("One sentence under the heading", 160) }
  },
  invite: {
    role: "mid",
    desc: "Bring-someone band: a warm, short invitation to bring a friend, neighbor or family member along, with one button. Needs no facts, so it always has something true to say.",
    slots: { heading: s("Invitation heading", 60), body: s("Three or four warm sentences encouraging the reader to bring someone", 380), button: s("Button label", 22) }
  },
  groups: {
    role: "mid",
    desc: "Live list of the church's small groups pulled from its records, with a short intro. Only useful when finding a group is a real next step for this audience.",
    slots: { heading: s("Section heading", 50), body: s("Two or three sentences inviting people to find a group, brief facts only", 320) }
  },
  countdown: {
    role: "mid",
    desc: "Live countdown to the next main weekly gathering. Energetic; suits churches with one main gathering and a younger or online-first audience.",
    slots: { title: s("Short line above the countdown, e.g. what is starting", 50) }
  },
  visitCta: {
    role: "close",
    desc: "Closing call-to-action band inviting people to take this page's main action (plan a visit, come to the event, sign up), with one button.",
    slots: { heading: s("Invitation headline", 60), body: s("Two sentences", 240), button: s("Button label", 22) }
  },
  contact: {
    role: "close",
    desc: "Closing section with map, address, a when-and-where recap and a contact button. Best for local, walk-in, or older audiences, and for events people must find.",
    slots: { heading: s("Section heading", 50), times: s("When-and-where recap, one or two sentences", 220), button: s("Button label", 22) }
  }
};

// Sections that read as duplicates of each other on one page.
const CLASH: Record<string, string> = { pathways: "ministries", ministries: "pathways", sermon: "heroVideo", countdown: "heroTimes" };

const PAGE_TYPES: Record<string, string> = {
  home: "The site home page: orient a newcomer and route them onward",
  visit: "Plan-a-visit / I'm new page: logistics and reassurance for a first visit",
  about: "About us: who the church is, its story, beliefs and leaders",
  ministries: "A ministries or programs page (kids, students, groups, recovery, outreach)",
  give: "A giving or stewardship page",
  contact: "A contact and location page",
  event: "A page promoting ONE specific event (a potluck, VBS, concert, Easter service, retreat): what it is, when, where, how to take part",
  topic: "A page about ONE specific topic, program, campaign or announcement rather than the church as a whole",
  other: "Something else"
};

// When a request is short, the dialog offers the user a few of these (only the ones the request leaves unanswered).
const QUESTION_BANK: Record<string, Record<string, string>> = {
  event: {
    time: "What time does it start and end?",
    place: "Where exactly is it held (room, building or address)?",
    bring: "What should people bring or prepare?",
    signup: "How do people sign up or RSVP, and by when?",
    cost: "Is there a cost?",
    audience: "Who is it for (everyone, families, certain ages)?",
    kids: "Is there childcare or something for kids?",
    contact: "Who can people contact with questions?"
  },
  general: {
    services: "When are your regular services or gatherings?",
    style: "What is worship like (music, teaching style, length)?",
    leader: "Who is the pastor or leader, and how long have they served?",
    kids: "What do you offer for kids and students?",
    distinct: "What would people say is special about your church?",
    reach: "Who are you most hoping to reach?",
    community: "How does your church serve the community?"
  },
  topic: {
    what: "What are the key details people need to know?",
    audience: "Who is this for?",
    next: "What is the next step you want people to take, and how?",
    contact: "Who can people contact with questions?"
  }
};
const MAX_QUESTIONS = 4;
const ASK_QUESTIONS_BELOW = 500;

// On a page about one event or topic, sections about the church in general are filler, so they are not even offered.
const FOCUSED_TYPES = new Set(["event", "topic"]);
const GENERAL_ONLY = new Set(["heroVideo", "pastor", "sermon", "ministries", "groups", "serve", "countdown"]);
const FOCUSED_ONLY = new Set(["details", "eventCountdown"]);

const sch = (desc: string, heading: string, body: string, light: string, lightAccent: string, accent: string, darkAccent: string, dark: string) => ({ desc, fonts: { heading, body }, palette: { light, lightAccent, accent, darkAccent, dark } });
export const SCHEMES: Record<string, ReturnType<typeof sch>> = {
  warmTraditional: sch("Cream background, deep burgundy accents, serif headings. Traditional, reverent, established.", "Playfair Display", "Source Sans 3", "#FAF6EF", "#EFE6D6", "#7A1F2B", "#5A1620", "#2B2118"),
  navyClassic: sch("White with navy and soft blue, serif headings. Trustworthy, calm, denominational.", "Lora", "Inter", "#FFFFFF", "#EEF3F9", "#1F3A63", "#16294A", "#1B2535"),
  modernMono: sch("Near-black and white with one electric coral accent, bold sans headings. Urban, young, design-forward.", "Archivo", "Inter", "#FFFFFF", "#F3F3F1", "#E8451F", "#111111", "#111111"),
  freshFamily: sch("Bright white with teal, rounded friendly sans. Energetic, family-oriented, suburban.", "Poppins", "Nunito Sans", "#FFFFFF", "#EAF7F6", "#0E8A8F", "#0A6569", "#16323A"),
  earthOrganic: sch("Warm off-white with forest green, soft serif. Grounded, rural, welcoming.", "Fraunces", "Work Sans", "#F7F5EF", "#E9ECDF", "#3F5D3A", "#2E4529", "#25301F"),
  stoneLiturgical: sch("Stone grey and ivory with deep green, elegant serif. Historic, liturgical, sacramental.", "Cormorant Garamond", "Source Sans 3", "#F8F7F3", "#E8E6DF", "#2F4A3E", "#223A30", "#23262A"),
  duskModern: sch("Deep indigo with soft lavender bands, clean sans. Contemporary, moody, music-driven.", "Manrope", "Manrope", "#FBFAFF", "#ECEBF7", "#4A3FB0", "#2D2766", "#1D1A33")
};

export const TONES: Record<string, string> = {
  plainWarm: "Plain-spoken and warm, like a neighbor talking over a fence. Short sentences.",
  candid: "Candid and unpolished, comfortable with doubt, no church jargon at all.",
  upbeat: "Upbeat, practical and family-friendly, focused on making logistics easy.",
  reverent: "Reverent and gracious, comfortable with traditional and sacramental vocabulary."
};

// Photos are Pexels search terms; B1Admin resolves each "pexels:<term>" through ContentApi /stock/search.
// Deliberately no portraits: a stock stranger must never stand in for a real pastor or member.
const PHOTOS: Record<string, string> = {
  "church exterior": "Outside of a traditional church building",
  "small country church": "Small rural or country church in a landscape",
  "modern church building": "Contemporary church or auditorium building exterior",
  "cathedral interior": "Historic, liturgical sanctuary interior with arches or stained glass",
  "stained glass window": "Stained glass, reverent and traditional",
  "church pews": "Quiet traditional sanctuary with pews",
  "worship concert crowd": "Modern worship service with band, lights and raised hands",
  "congregation singing": "People singing together in a service",
  "choir singing": "A choir in robes or a vocal ensemble",
  "hymnal piano": "Hymn book or piano, traditional music",
  "acoustic guitar worship": "Simple acoustic worship music",
  "open bible": "An open Bible, study and teaching",
  "bible study group": "Small group of adults talking around a table or living room",
  "friends talking coffee": "Friends in conversation over coffee, relaxed and candid",
  "community dinner table": "People sharing a meal at a long table, fellowship dinner",
  "food pantry volunteers": "Volunteers sorting or handing out food",
  "volunteers serving community": "Volunteers serving neighbors, outreach",
  "children playing classroom": "Kids in a bright classroom or play space",
  "family walking together": "A young family together outdoors",
  "teenagers friends outdoors": "Group of teenagers or students together",
  "young adults city": "Young adults in an urban neighborhood",
  "seniors smiling together": "Older adults together, warm and friendly",
  "diverse group people smiling": "A diverse, multi-ethnic group of people together",
  "hands praying": "Hands folded in prayer, quiet and personal",
  "candles church": "Candles, contemplative and sacramental",
  "baptism water": "Water and baptism imagery",
  "communion bread wine": "Communion bread and cup",
  "wedding church": "A wedding in a church",
  "thanksgiving dinner table": "Thanksgiving or harvest meal on a table",
  "potluck buffet food": "A buffet of shared homemade dishes",
  "autumn leaves pumpkins": "Autumn, harvest season",
  "christmas candles lights": "Christmas, advent, candlelight",
  "easter lilies": "Easter, spring, resurrection",
  "outdoor picnic": "Picnic or cookout outdoors",
  "kids summer camp outdoors": "Children at camp or vacation Bible school",
  "concert stage lights": "A concert or special music night",
  "sunrise field": "Sunrise over a field, hopeful and open",
  "mountain landscape": "Wide mountain landscape, grandeur",
  "city skyline": "City skyline, urban setting",
  "small town main street": "Small town street, local and neighborly",
  "welcome handshake": "A handshake or greeting at a door",
  "laptop video call home": "Watching online from home"
};

const ICONS: Record<string, string> = {
  schedule: "time, schedule",
  music_note: "music, band, hymns, choir",
  menu_book: "Bible teaching, sermon",
  child_care: "kids, nursery, children",
  groups: "community, small groups, people",
  local_cafe: "coffee, hospitality",
  volunteer_activism: "serving, care, giving",
  restaurant: "meals, food, dinner",
  church: "building, Mass, liturgy, sacraments",
  translate: "languages, bilingual",
  school: "school, students, classes",
  favorite: "welcome, love, belonging",
  live_tv: "online, livestream",
  place: "location, where to go",
  event: "date, calendar, when",
  celebration: "party, holiday, celebration",
  sell: "cost, price, free, tickets",
  how_to_reg: "sign up, register, RSVP",
  shopping_basket: "what to bring",
  healing: "recovery, confession, restoration",
  question_answer: "questions, conversation, doubts"
};

const COPY_SYSTEM = `You write page copy for church websites. You are given a church brief and a list of sections with named text slots. Return ONLY a JSON object: { "<sectionKey>": { "<slot>": "text", ... }, ... }.

Rules:
- Every fact (names, times, programs, places) must come from the brief. Never invent staff, stats, history, or programs.
- If the brief does not mention it, it does not exist: no coffee, parking, dress code, pews, greeters, nursery, building details or history unless the brief states them. When a slot asks for something the brief doesn't cover, write about what the brief DOES cover that serves the same visitor need.
- The page request is the SUBJECT of the page. When it asks for a page about one event, program or topic, every section is about that subject; mention the wider church only where it directly helps the reader act (where it is, who to contact). Do not turn it into an "about our church" page.
- Never state a time, time of day, day of the week, date, price, room, deadline, age range or sign-up method that the request or records do not give, however natural it would be for such an event. If a slot needs one that is missing, write around it ("details to follow", or simply leave the detail out) rather than guessing. The same goes for negatives: do not say something is free, not required, not needed or provided unless the request says so.
- Write generously. Use most of each slot's length: body slots are several full sentences, card texts two full sentences. Fill the space with warmth, why this matters, what it will feel like, reassurance and invitation. None of that needs facts. What you may NOT add is specifics the request does not give (previous rule).
- Be specific to THIS church and this subject. A sentence that could appear on any church's site is a failed sentence.
- The hero headline must NOT be the church's name (it is already in the site header). It should say something true and particular about the page's subject in under ten words.
- Avoid stock church-website phrases such as "Welcome home", "come as you are", "a place to belong", "vibrant", "do life together", unless the brief itself uses them. No exclamation marks, no em dashes, no rhetorical questions in headlines.
- Headlines are short and concrete. Body copy is second person and talks to the person this page is for.
- Do not repeat the same fact or phrase in more than two sections. Each section must earn its place with new information.
- Stay within each slot's max characters. Plain text only, no markdown.
- Scripture, if used, must be quoted accurately with its reference.`;

const STOCK_PHRASES = [
  "welcome home", "come as you are", "place to belong", "faith journey", "your journey", "vibrant", "do life", "wherever you are"
];
const SCORE4 = ["Poor", "Fair", "Good", "Excellent"];

type Copy = Record<string, Record<string, string>>;

export class SiteGenHelper {
  // Plain HTTP against the Vercel AI Gateway: JEV's typed-evaluation endpoint and the OpenAI-compatible chat endpoint.
  private static async gateway(path: string, body: any, timeoutMs: number, headers: Record<string, string> = {}): Promise<any> {
    const key = Environment.aiGatewayApiKey || process.env.AI_GATEWAY_API_KEY;
    if (!key) throw new Error("Missing aiGatewayApiKey; page generation is not configured.");
    const r = await fetch(`https://ai-gateway.vercel.sh${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, ...headers },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (!r.ok) throw new Error(`AI gateway ${path} returned ${r.status}`);
    return r.json();
  }

  private static async ask(usage: SiteGenUsage, state: any, questions: Record<string, any>): Promise<Record<string, any>> {
    usage.jevCalls++;
    const headers = { "ai-gateway-protocol-version": "0.0.1", "ai-gateway-auth-method": "api-key", "ai-evaluation-model-specification-version": "4", "ai-model-id": JEV };
    const call = () => this.gateway("/v4/ai/evaluation-model", { state, questions, providerOptions: { gateway: { zeroDataRetention: true } } }, JEV_TIMEOUT_MS, headers);
    // The gateway occasionally hangs or 5xxs. A duplicate fires after JEV_HEDGE_MS (or acts as the retry when the
    // first call fails fast) and the first success wins.
    const first = call();
    const backup = new Promise<any>((resolve, reject) => {
      const timer = setTimeout(() => call().then(resolve, reject), JEV_HEDGE_MS);
      first.then(() => clearTimeout(timer), () => { /* let the backup run */ });
    });
    const r = await Promise.any([first, backup]);
    usage.jevIn += r.usage?.inputTokens ?? 0;
    return r.answers as Record<string, any>;
  }

  static sample(probs: Record<string, number>, temp: number, rand: () => number = Math.random): string {
    const entries = Object.entries(probs);
    if (!temp) return entries.sort((a, b) => b[1] - a[1])[0][0];
    // the floor keeps variety alive when JEV returns a one-hot distribution
    const weights = entries.map(([k, p]) => [k, Math.pow(Math.max(p, 0.02), 1 / temp)] as [string, number]);
    let x = rand() * weights.reduce((t, [, w]) => t + w, 0);
    for (const [k, w] of weights) if ((x -= w) <= 0) return k;
    return weights[0][0];
  }

  /** Everything the models may treat as true: what the user typed plus facts from the church's own records. */
  static fullBrief(church: SiteGenChurch) {
    return church.facts ? `${church.brief}\n\nFrom the church's own records (also true; background, use only where it serves the page request): ${church.facts}` : church.brief;
  }

  private static criteria(keys: string[]) { return Object.fromEntries(keys.map((k) => [k, SECTIONS[k].desc])); }

  static available(role: string, church: SiteGenChurch, pageType = "home") {
    const focused = FOCUSED_TYPES.has(pageType);
    // on a focused page the weekly times are only worth a section when they are live data, never typed filler
    const needs: Record<string, boolean> = { contact: !!church.address, groups: !!church.hasGroups, countdown: !!church.nextService, eventCountdown: pageType === "event", times: !focused || !!church.hasServiceTimes, gallery: !!church.resolvesPhotos };
    return Object.keys(SECTIONS).filter((k) => SECTIONS[k].role === role && needs[k] !== false && !(focused ? GENERAL_ONLY : FOCUSED_ONLY).has(k));
  }

  // Pages should feel complete. A short request still gets a full page: warmth, explanation and invitation need no
  // facts, and the writer is forbidden from guessing specifics, so length is no longer bought with invention.
  static countOptions(church: SiteGenChurch, pageType: string): Record<string, string> {
    if (!FOCUSED_TYPES.has(pageType)) return { 4: "Four: a compact page", 5: "Five: typical", 6: "Six: large church with many programs or audiences" };
    const all: Record<string, string> = { 3: "Three: a simple event or announcement", 4: "Four: typical", 5: "Five: a big event with lots to explain" };
    return church.brief.length < 250 ? { 3: all[3], 4: all[4] } : all;
  }

  private static goal(pageType: string) {
    return FOCUSED_TYPES.has(pageType)
      ? "Design the page described in page_request. It is about ONE subject. Every section must serve that subject and help the reader decide to take part; general information about the church is filler here."
      : "Design the web page described in page_request. The reader is a first-time visitor deciding whether to come.";
  }

  // Candidates that share the same sections so far would ask JEV the identical question, so rounds are memoized by prefix.
  private static async buildLayout(usage: SiteGenUsage, church: SiteGenChurch, temp: number, memo: Map<string, Promise<Record<string, any>>>, pageType: string): Promise<string[]> {
    const chosen: string[] = [];
    const round = async (questions: Record<string, any>) => {
      const key = `${chosen.join(">")}|${Object.keys(questions).join(",")}`;
      if (!memo.has(key)) {
        memo.set(key, this.ask(usage, {
          page_request: church.brief,
          church_records: church.facts || "",
          page_type: PAGE_TYPES[pageType] || PAGE_TYPES.home,
          goal: this.goal(pageType),
          sections_so_far: chosen.map((k, i) => `${i + 1}. ${k}: ${SECTIONS[k].desc}`)
        }, questions));
      }
      return memo.get(key);
    };
    // hero and section count don't depend on each other, so they share one round trip
    const opening = await round({
      hero: { type: "choice", instructions: "Which hero section should open this page?", criteria: this.criteria(this.available("hero", church, pageType)) },
      count: { type: "choice", instructions: "How many sections should sit between the hero and the closing section? The page should feel complete and generous, not like a stub.", criteria: this.countOptions(church, pageType) }
    });
    chosen.push(this.sample(opening.hero.probabilities, temp));
    const count = Number(this.sample(opening.count.probabilities, temp));
    for (let i = 0; i < count; i++) {
      const left = this.available("mid", church, pageType).filter((k) => !chosen.includes(k) && !chosen.includes(CLASH[k]) && !chosen.some((c) => CLASH[c] === k));
      const a = await round({ next: { type: "choice", instructions: `Which section should come next (position ${chosen.length + 1})? Pick what the reader of THIS page most needs next to act on the page_request, and keep a natural flow from the sections so far.`, criteria: this.criteria(left) } });
      chosen.push(this.sample(a.next.probabilities, temp));
    }
    const closing = await round({ close: { type: "choice", instructions: "Which closing section should end the page?", criteria: this.criteria(this.available("close", church, pageType)) } });
    chosen.push(this.sample(closing.close.probabilities, temp));
    return chosen;
  }

  private static async judgeLayout(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], pageType: string): Promise<number> {
    const a = await this.ask(usage, { page_request: church.brief, church_records: church.facts || "", page_type: PAGE_TYPES[pageType], page: layout.map((k, i) => `${i + 1}. ${k}: ${SECTIONS[k].desc}`) }, {
      fit: { type: "score", instructions: "How well do these sections deliver the page that page_request asks for, for the people it is trying to reach?", criteria: SCORE4 },
      flow: { type: "score", instructions: "How natural is the order for the reader: orient, reassure, inform, then invite?", criteria: SCORE4 },
      onTopic: { type: "score", instructions: "Does every section serve page_request, with no generic about-the-church filler it did not ask for and no section the request gives no material for?", criteria: ["Mostly off-topic filler", "Some filler or gaps", "Minor filler", "Every section serves the request"] }
    });
    return a.fit.score + a.flow.score + a.onTopic.score;
  }

  private static async pickStyle(usage: SiteGenUsage, church: SiteGenChurch) {
    const a = await this.ask(usage, { church: this.fullBrief(church) }, {
      scheme: { type: "choice", instructions: "Which color and type scheme best fits this church's identity and the people it wants to reach?", criteria: Object.fromEntries(Object.entries(SCHEMES).map(([k, v]) => [k, v.desc])) },
      tone: { type: "choice", instructions: "Which writing voice fits this church?", criteria: TONES },
      pageType: { type: "choice", instructions: "What kind of page is the church asking for?", criteria: PAGE_TYPES }
    });
    return { scheme: a.scheme.choice as string, tone: a.tone.choice as string, pageType: a.pageType.choice as string };
  }

  /** For a short request: which few details would most improve the page? Unanswered questions only, in the bank's priority order. */
  private static async pickQuestions(usage: SiteGenUsage, church: SiteGenChurch, pageType: string): Promise<{ key: string; question: string }[]> {
    if (church.askedQuestions || church.brief.length >= ASK_QUESTIONS_BELOW) return [];
    const bank = { ...(QUESTION_BANK[pageType] || (FOCUSED_TYPES.has(pageType) ? QUESTION_BANK.topic : QUESTION_BANK.general)) };
    if (church.hasServiceTimes) delete bank.services;
    const a = await this.ask(usage, { page_request: church.brief, church_records: church.facts || "" }, Object.fromEntries(Object.entries(bank).map(([key, question]) => [
      key,
      { type: "boolean", instructions: `Does page_request or church_records already answer this: "${question}"`, criteria: { true: "Yes, the answer is already stated", false: "No, it is not stated" } }
    ])));
    return Object.keys(bank).filter((key) => a[key]?.probability < 0.5).slice(0, MAX_QUESTIONS).map((key) => ({ key, question: bank[key] }));
  }

  /** Phase 1: sample candidate layouts, judge them, and pick a voice. Returns the best few for phase 2. */
  static async planPage(church: SiteGenChurch) {
    const usage = this.newUsage();
    const style = await this.pickStyle(usage, church).catch(() => ({ scheme: "navyClassic", tone: "plainWarm", pageType: "home" }));
    const memo = new Map<string, Promise<Record<string, any>>>();
    const questionsPromise = this.pickQuestions(usage, church, style.pageType).catch((): { key: string; question: string }[] => []);
    const built = await Promise.allSettled(Array.from({ length: CANDIDATES }, (_, i) => this.buildLayout(usage, church, i ? SAMPLE_TEMP : 0, memo, style.pageType)));
    const layouts = built.filter((r): r is PromiseFulfilledResult<string[]> => r.status === "fulfilled").map((r) => r.value);
    if (!layouts.length) throw new Error("Could not plan a page layout. Please try again.");
    const unique = [...new Map(layouts.map((l) => [l.join(">"), l])).values()];
    // a failed judge call scores 0 rather than sinking the whole plan
    const scored = await Promise.all(unique.map(async (layout) => ({ layout, score: await this.judgeLayout(usage, church, layout, style.pageType).catch(() => 0) })));
    scored.sort((a, b) => b.score - a.score);
    // A weak best layout usually means the template library lacks something this church needed; the log is the template backlog.
    if (scored[0].score < 6) console.log(JSON.stringify({ siteGen: "lowLayoutScore", score: scored[0].score, pageType: style.pageType, layout: scored[0].layout, brief: church.brief.substring(0, 500) }));
    return { candidates: scored.slice(0, TOP), questions: await questionsPromise, tone: style.tone, pageType: style.pageType, suggestedStyle: { key: style.scheme, fonts: SCHEMES[style.scheme].fonts, palette: SCHEMES[style.scheme].palette }, usage };
  }

  private static async writeJson(usage: SiteGenUsage, prompt: string, maxOutputTokens: number, temperature: number): Promise<any> {
    const r = await this.gateway("/v1/chat/completions", { model: COPY_MODEL, max_tokens: maxOutputTokens, temperature, messages: [{ role: "system", content: COPY_SYSTEM }, { role: "user", content: prompt }] }, COPY_TIMEOUT_MS);
    usage.copyCalls++;
    usage.copyIn += r.usage?.prompt_tokens ?? 0;
    usage.copyOut += r.usage?.completion_tokens ?? 0;
    const out: string = r.choices?.[0]?.message?.content || "";
    return JSON.parse(out.slice(out.indexOf("{"), out.lastIndexOf("}") + 1));
  }

  private static slotSpec(k: string) {
    return Object.fromEntries(Object.entries(SECTIONS[k].slots).map(([n, v]) => [n, `${v.guide} (max ${v.max} chars)`]));
  }

  private static validSection(k: string, slots: Record<string, string>) {
    // the templates reflow, so a slot that runs a little long is fine; only reject gross overruns
    return Object.entries(SECTIONS[k].slots).every(([n, v]) => typeof slots?.[n] === "string" && !!slots[n].trim() && slots[n].length <= v.max * 1.6);
  }

  private static churchHeader(church: SiteGenChurch, tone: string) {
    return `Today's date: ${new Date().toISOString().slice(0, 10)}\nChurch: ${church.name}\nAddress: ${church.address || "(not given)"}\nPage type: ${PAGE_TYPES[church.pageType || "home"] || PAGE_TYPES.home}\nPage request and brief (the subject of this page): ${this.fullBrief(church)}\nVoice: ${TONES[tone] || TONES.plainWarm}`;
  }

  // Sections are written a couple at a time, in parallel: much faster than one long completion, while keeping the
  // number of times the brief and rules are resent (the main cost) low. Each call is told what the other sections
  // cover so it stays in its lane.
  private static async writeSections(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], keys: string[], tone: string, notes: Record<string, string> = {}): Promise<Copy> {
    const spec = keys.map((k) => ({ section: k, purpose: SECTIONS[k].desc, slots: this.slotSpec(k), ...(notes[k] ? { reviewer_note: notes[k] } : {}) }));
    const others = layout.filter((o) => !keys.includes(o)).map((o) => `- ${o}: ${SECTIONS[o].desc}`).join("\n");
    const extra = keys.some((k) => SECTIONS[k].role === "hero") ? `\nInside the hero section also return "headlines": an array of ${HEADLINE_OPTIONS} different headline options (different angles, not rewordings), each max 60 chars.` : "";
    const prompt = `${this.churchHeader(church, tone)}\n\nWrite ONLY these sections, keyed by section name:\n${JSON.stringify(spec, null, 1)}${extra}\n\nOther sections on the same page cover their own ground, so do not do their job or repeat their facts:\n${others}`;
    const repairing = Object.keys(notes).length > 0;
    for (let attempt = 1; ; attempt++) {
      try {
        const out = await this.writeJson(usage, prompt, 600 * keys.length + 300, repairing ? 0.4 : 0.8);
        // a lone section sometimes comes back bare or wrapped as { section: slots } instead of { <key>: slots }
        const found = keys.map((k) => [k, [out[k], ...(keys.length === 1 ? [out, ...Object.values(out)] : [])].find((o: any) => o && typeof o === "object" && !Array.isArray(o) && this.validSection(k, o))]);
        if (found.every(([, slots]) => slots)) return Object.fromEntries(found);
        console.log(JSON.stringify({ siteGen: "invalidSection", sections: keys, out: JSON.stringify(out).substring(0, 400) }));
      } catch (e) {
        if (attempt >= 2) throw e;
      }
      if (attempt >= 2) throw new Error("Could not write page copy. Please try again.");
    }
  }

  static chunk<T>(items: T[], size: number): T[][] {
    return items.reduce((groups: T[][], item, i) => (i % size ? groups[groups.length - 1].push(item) : groups.push([item]), groups), []);
  }

  private static async pickHeadline(usage: SiteGenUsage, church: SiteGenChurch, options: string[]): Promise<string | null> {
    const clean = [...new Set(options.filter((h) => typeof h === "string" && h.trim() && h.length <= 75 && !h.toLowerCase().includes(church.name.toLowerCase().slice(0, 12))))];
    if (clean.length < 2) return clean[0] || null;
    const a = await this.ask(usage, { church: this.fullBrief(church) }, { headline: { type: "choice", instructions: "Which hero headline is most specific to this one church and would make a first-time visitor keep reading? Penalize generic lines any church could use.", criteria: Object.fromEntries(clean.map((h, i) => [`h${i}`, h])) } });
    return clean[Number(String(a.headline.choice).slice(1))] ?? null;
  }

  private static factCheck(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], copy: Copy) {
    return this.ask(usage, { church_brief: this.fullBrief(church), church_name: church.name, address: church.address }, Object.fromEntries(layout.map((k) => [
      k,
      {
        type: "boolean",
        instructions: `Does this website section state any concrete fact (a thing, amenity, time, person, number, program, or practice) that is NOT stated in church_brief? Section text: ${JSON.stringify(copy[k])}`,
        criteria: { true: "At least one concrete detail is not in the brief (invented or assumed)", false: "Everything concrete is supported by the brief" }
      }
    ])));
  }

  static stockPhrases(church: SiteGenChurch) {
    // a phrase the church itself used is theirs to keep
    const brief = church.brief.toLowerCase();
    return STOCK_PHRASES.filter((p) => !brief.includes(p));
  }

  /** Sections whose body text re-tells an earlier section (shared 4-word runs). Recap sections are expected to repeat times and address. */
  static findRepeats(layout: string[], copy: Copy): Record<string, string> {
    const RECAP = new Set(["times", "contact", "visitCta", "countdown"]);
    const shingles = (k: string) => {
      const words = Object.values(copy[k] || {}).filter((v) => typeof v === "string" && v.length > 40).join(" ").toLowerCase().replace(/[^a-z0-9: ]/g, " ").split(/\s+/).filter(Boolean);
      return new Set(words.slice(0, -3).map((_, i) => words.slice(i, i + 4).join(" ")));
    };
    const seen: [string, Set<string>][] = [];
    const repeats: Record<string, string> = {};
    for (const k of layout) {
      const mine = shingles(k);
      if (!RECAP.has(k) && SECTIONS[k].role !== "hero") {
        const clash = seen.find(([, theirs]) => [...mine].filter((g) => theirs.has(g)).length >= 3);
        if (clash) repeats[k] = clash[0];
      }
      seen.push([k, mine]);
    }
    return repeats;
  }

  // Flagged sections are rewritten a couple at a time, in parallel, each told exactly what was wrong with it.
  private static async repairCopy(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], copy: Copy, tone: string, checks: Record<string, any>) {
    const phrases = this.stockPhrases(church);
    const repeats = this.findRepeats(layout, copy);
    const reasons: Record<string, string[]> = {};
    for (const k of layout) {
      const textOf = JSON.stringify(copy[k]).toLowerCase();
      const why: string[] = [];
      if (checks[k]?.probability > 0.5) why.push("it states details that are not in the brief; remove every detail the brief does not state");
      if (SECTIONS[k].role === "hero" && copy[k].headline.toLowerCase().includes(church.name.toLowerCase().slice(0, 12))) why.push("the headline uses the church name");
      if (/[!—]/.test(textOf) || phrases.some((p) => textOf.includes(p))) why.push("it uses a stock church phrase, exclamation mark or em dash");
      const thin = Object.entries(SECTIONS[k].slots).some(([n, slot]) => slot.max >= 200 && typeof copy[k][n] === "string" && copy[k][n].length < slot.max * 0.4);
      if (thin) why.push("it is too thin; expand it to use most of each slot's length with warmth, explanation and invitation, without adding any new facts");
      if (repeats[k]) why.push(`it repeats what the "${repeats[k]}" section already says (${JSON.stringify(copy[repeats[k]])}); say something that section does not`);
      if (why.length) reasons[k] = why;
    }
    const bad = Object.keys(reasons);
    await Promise.all(this.chunk(bad, SECTIONS_PER_CALL).map(async (keys) => {
      const notes = Object.fromEntries(keys.map((k) => [k, `A reviewer rejected your previous version because ${reasons[k].join("; and ")}. Previous version: ${JSON.stringify(copy[k])}. Keep what was good and fix that.`]));
      try {
        const fixed = await this.writeSections(usage, church, layout, keys, tone, notes);
        for (const k of keys) {
          // the hero headline was already chosen from several options; only replace it when it was the problem
          const keepHeadline = SECTIONS[k].role === "hero" && !reasons[k].some((r) => r.includes("church name"));
          copy[k] = keepHeadline ? { ...fixed[k], headline: copy[k].headline } : fixed[k];
        }
      } catch { /* keep the original */ }
    }));
    return bad;
  }

  /** Last line of defense: the writer sometimes keeps a stock phrase through a rewrite, so drop the offending sentence in code. */
  static scrub(copy: Copy, phrases: string[]): Copy {
    for (const sec of Object.values(copy)) {
      for (const [n, v] of Object.entries(sec)) {
        if (typeof v !== "string") continue;
        const kept = v.split(/(?<=[.?!])\s+/).filter((sentence) => !phrases.some((p) => sentence.toLowerCase().includes(p))).join(" ");
        // when the whole slot was one such sentence, cut just the phrase rather than leave the slot empty
        const trimmed = kept || phrases.reduce((s, ph) => s.replace(new RegExp(`${ph}(,| to)?\\s*`, "ig"), ""), v).replace(/^[a-z]/, (c) => c.toUpperCase());
        sec[n] = (trimmed || v).replace(/\s*—\s*/g, ", ").replace(/!/g, ".");
      }
    }
    return copy;
  }

  private static async pickVisuals(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], copy: Copy): Promise<Record<string, string>> {
    const q: Record<string, any> = {
      heroPhoto: { type: "choice", instructions: "Which photo subject best fits the hero of this church's page? Match the church's real setting, size and style.", criteria: PHOTOS },
      heroDivider: { type: "choice", instructions: "Which shape should the bottom edge of the hero have?", criteria: { none: "Straight edge: traditional, formal, liturgical", curve: "Soft curve: warm and welcoming", wave: "Wave: relaxed, family-friendly, contemporary", slant: "Slant: modern, urban, energetic" } }
    };
    if (layout.includes("welcome")) q.welcomePhoto = { type: "choice", instructions: "Which photo subject best fits the 'who we are' section? It should show people or place, and differ from the hero.", criteria: PHOTOS };
    const mood = "It should suit this page's subject and differ from the other photos on the page.";
    if (layout.includes("invite")) q.invitePhoto = { type: "choice", instructions: `Which photo subject best fits a section inviting people to bring a friend? ${mood}`, criteria: PHOTOS };
    if (layout.includes("visitCta")) q.ctaPhoto = { type: "choice", instructions: `Which photo subject best fits the closing call-to-action band (it sits behind text)? ${mood}`, criteria: PHOTOS };
    for (const i of [1, 2, 3]) {
      if (layout.includes("gallery")) q[`galleryPhoto${i}`] = { type: "choice", instructions: `Photo ${i} of a three-photo strip for this page. ${mood}`, criteria: PHOTOS };
      if (layout.includes("pathways")) q[`pathwaysPhoto${i}`] = { type: "choice", instructions: `Which photo subject best matches this card? "${copy.pathways[`c${i}t`]}: ${copy.pathways[`c${i}`]}"`, criteria: PHOTOS };
      for (const cards of ["expect", "details"]) if (layout.includes(cards)) q[`${cards}Icon${i}`] = { type: "choice", instructions: `Which icon best matches this card? "${copy[cards][`c${i}t`]}: ${copy[cards][`c${i}`]}"`, criteria: ICONS };
      if (layout.includes("ministries")) q[`ministryPhoto${i}`] = { type: "choice", instructions: `Which photo subject best matches this ministry card? "${copy.ministries[`c${i}t`]}: ${copy.ministries[`c${i}`]}"`, criteria: PHOTOS };
    }
    const picks: Record<string, string> = {};
    const used = new Set<string>();
    try {
      const a = await this.ask(usage, { church: this.fullBrief(church) }, q);
      for (const [k, v] of Object.entries(a)) {
        // no repeats on one page: fall back to the next most probable unused option
        const ranked = Object.entries(v.probabilities as Record<string, number>).sort((x, y) => y[1] - x[1]).map(([o]) => o);
        picks[k] = (k.startsWith("hero") ? v.choice : ranked.find((o) => !used.has(o))) ?? v.choice;
        if (k !== "heroDivider") used.add(picks[k]);
      }
    } catch { /* fall through to defaults */ }
    const photoKeys = Object.keys(PHOTOS);
    const iconKeys = Object.keys(ICONS);
    Object.keys(q).forEach((k, i) => { if (!picks[k]) picks[k] = k === "heroDivider" ? "none" : k.includes("Icon") ? iconKeys[i % iconKeys.length] : photoKeys[i % photoKeys.length]; });
    return picks;
  }

  /** Phase 2: write, fact-check, repair and score the copy for one layout, then assemble the builder tree. */
  static async writePage(church: SiteGenChurch, layout: string[], tone: string, pageType = "home") {
    if (!Array.isArray(layout) || !layout.length || layout.length > 8 || layout.some((k) => !SECTIONS[k])) throw new Error("Invalid layout.");
    const started = Date.now();
    const usage = this.newUsage();
    church = { ...church, pageType };
    const written = await Promise.all(this.chunk(layout, SECTIONS_PER_CALL).map((keys) => this.writeSections(usage, church, layout, keys, tone)));
    let copy: Copy = Object.assign({}, ...written);

    const heroKey = layout.find((k) => SECTIONS[k].role === "hero");
    const [checks, headline] = await Promise.all([
      this.factCheck(usage, church, layout, copy).catch((): Record<string, any> => ({})),
      heroKey ? this.pickHeadline(usage, church, [copy[heroKey].headline, ...((copy[heroKey] as any).headlines || [])]).catch((): string | null => null) : null
    ]);
    if (heroKey) {
      if (headline) copy[heroKey].headline = headline;
      delete (copy[heroKey] as any).headlines;
    }

    let repaired: string[] = [];
    if (Date.now() - started < REPAIR_DEADLINE_MS) repaired = await this.repairCopy(usage, church, layout, copy, tone, checks);
    for (const k of layout) delete (copy[k] as any).headlines;
    copy = this.scrub(copy, this.stockPhrases(church));

    const [visuals, judged] = await Promise.all([
      this.pickVisuals(usage, church, layout, copy),
      this.ask(usage, { church: this.fullBrief(church), page_copy: layout.map((k) => ({ section: k, ...copy[k] })) }, {
        specific: { type: "score", instructions: "How specific is this copy to this one church, using real details from the brief, versus generic lines any church could use?", criteria: ["Generic boilerplate", "Mostly generic", "Mostly specific", "Unmistakably this church"] },
        visitor: { type: "score", instructions: "Would the person this page is for feel understood and know exactly what to do next?", criteria: SCORE4 },
        onTopic: { type: "score", instructions: "Does the copy stay on the subject the brief asks for, rather than drifting into a general page about the church?", criteria: ["Mostly a generic church page", "Drifts often", "Mostly on the subject", "Entirely about the requested subject"] }
      }).catch((): Record<string, any> | null => null)
    ]);
    // A rewritten section is not re-checked (that second pass only fed this score), so it earns half credit.
    const factClean = layout.reduce((t, k) => t + (repaired.includes(k) ? 0.5 : checks[k]?.probability > 0.5 ? 0 : 1), 0) / layout.length;
    const score = +((judged?.specific?.score ?? 0) + (judged?.visitor?.score ?? 0) + (judged?.onTopic?.score ?? 0) + factClean * 3).toFixed(2);
    return { sections: this.buildTree(church, layout, copy, visuals), score, factClean: +factClean.toFixed(2), repaired, ms: Date.now() - started, usage };
  }

  private static newUsage(): SiteGenUsage { return { jevIn: 0, jevCalls: 0, copyIn: 0, copyOut: 0, copyCalls: 0 }; }

  // ---- builder tree assembly (pure) ----

  static buildTree(church: SiteGenChurch, layout: string[], copy: Copy, v: Record<string, string>) {
    const accent = church.palette?.accent || "#2A6F97";
    const dark = church.palette?.dark || "#0B2434";
    const light = church.palette?.light || "#FFFFFF";
    const photo = (term: string) => (!term ? "" : church.resolvesPhotos ? `pexels:${term}` : "/tempLibrary/backgrounds/worship.jpg");
    const FADE = { onShow: "fadeIn", onShowSpeed: "normal" };
    const esc = (t = "") => String(t).replace(/[&<>]/g, (c): string => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as Record<string, string>)[c]).replace(/'/g, "&rsquo;");
    const el = (elementType: string, answers: any, elements?: any[], animations?: any) => ({ elementType, answers, elements, animations });
    const text = (html: string, align = "left") => el("text", { text: html, textAlignment: align });
    const row = (columns: string, cols: any[][]) => el("row", { columns, mobileSizes: columns.split(",").map(() => 12).join(",") }, columns.split(",").map((size, i) => el("column", { size: Number(size), mobileSize: 12 }, cols[i] || [])));
    const narrow = (...els: any[]) => row("2,8,2", [[], els, []]);
    const btn = (label: string, cls = "btn-accent", href = "#") => `<p><a class='btn ${cls} btn-large' href='${href}'>${esc(label)}</a></p>`;
    const three = (make: (i: number) => any) => row("4,4,4", [1, 2, 3].map((i) => [make(i)]));
    const DARK = { background: "var(--darkAccent)", textColor: "light", headingColor: "var(--light)" };
    const hero = (html: string) => ({
      background: photo(v.heroPhoto) || "var(--dark)",
      textColor: "light",
      headingColor: "var(--light)",
      // the divider is drawn in the color of the section below the hero, which is always the first plain (light) band
      answers: { overlayColor: dark, backgroundOpacity: "0.6", focalPoint: "center", ...(v.heroDivider && v.heroDivider !== "none" ? { dividerBottom: { shape: v.heroDivider, color: light, height: 60, flip: false } } : {}) },
      styles: { all: { "padding-top": "130px", "padding-bottom": "130px" } },
      elements: [text(html, "center")]
    });
    const lead = (x: any) => `<h1>${esc(x.headline)}</h1><p style='font-size:1.3em'>${esc(x.sub)}</p>`;
    const paras = (body: string) => String(body || "").split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join("");
    const cardsHead = (x: any) => text(`<h2>${esc(x.heading)}</h2>${x.intro ? `<p>${esc(x.intro)}</p>` : ""}`, "center");
    const sermons = () => el("sermons", { layout: "featuredLatest" });

    const build: Record<string, (x: any) => any> = {
      heroPhoto: (x) => hero(`${lead(x)}${btn(x.button, "btn-light")}`),
      heroTimes: (x) => hero(`${lead(x)}<p><strong>${esc(x.times)}</strong></p>${btn(x.button, "btn-light")}`),
      heroVideo: (x) => ({
        ...DARK,
        background: "var(--dark)",
        styles: { all: { "padding-top": "70px", "padding-bottom": "70px" } },
        elements: [row("6,6", [[text(`${lead(x)}${btn(x.button, "btn-light")}`)], [sermons(), text(`<p>${esc(x.videoCaption)}</p>`, "center")]])]
      }),
      heroSplit: (x) => ({
        background: "var(--lightAccent)",
        styles: { all: { "padding-top": "70px", "padding-bottom": "70px" } },
        elements: [row("6,6", [[text(`${lead(x)}${btn(x.button)}`)], [el("image", { photo: photo(v.heroPhoto), photoAlt: PHOTOS[v.heroPhoto] || "", imageAlign: "center" })]])]
      }),
      welcome: (x) => ({ elements: [el("textWithPhoto", { photo: photo(v.welcomePhoto), photoAlt: PHOTOS[v.welcomePhoto] || "", photoPosition: "left", text: `<h2>${esc(x.heading)}</h2>${paras(x.body)}` })] }),
      expect: (x) => ({
        elements: [
          cardsHead(x),
          three((i) => el("iconFeature", { icon: v[`expectIcon${i}`], title: x[`c${i}t`], description: `<p>${esc(x[`c${i}`])}</p>`, iconColor: accent, iconSize: "medium", textAlignment: "center" }, undefined, FADE))
        ]
      }),
      times: (x) => ({
        elements: [
          // live data beats typed copy: when the church keeps service times in B1, show those (the element draws its own heading)
          church.hasServiceTimes
            ? narrow(el("serviceTimes", { title: x.heading, showCampus: "true" }), text(`<p>${esc(x.note)}</p>`, "center"))
            : narrow(
              text(`<h2>${esc(x.heading)}</h2>`, "center"),
              el("table", { contents: String(x.rows).split(/\n/).filter(Boolean).map((r) => r.split("|").map((c) => c.trim())), head: false, markdown: false, size: "medium" }),
              text(`<p>${esc(x.note)}</p>`, "center")
            )
        ]
      }),
      pathways: (x) => ({
        elements: [
          cardsHead(x),
          three((i) => el("card", { photo: photo(v[`pathwaysPhoto${i}`]) || undefined, photoAlt: x[`c${i}t`], title: x[`c${i}t`], titleAlignment: "left", text: `<p>${esc(x[`c${i}`])}</p>`, textAlignment: "left" }, undefined, FADE))
        ]
      }),
      ministries: (x) => ({
        elements: [
          cardsHead(x),
          three((i) => el("card", { photo: photo(v[`ministryPhoto${i}`]), photoAlt: x[`c${i}t`], title: x[`c${i}t`], titleAlignment: "center", text: `<p>${esc(x[`c${i}`])}</p>`, textAlignment: "center" }, undefined, FADE))
        ]
      }),
      // no photo on purpose: a stock stranger must never stand in for the real pastor
      pastor: (x) => ({ elements: [narrow(text(`<h2>${esc(x.heading)}</h2><div style='font-size:1.1em;font-style:italic'>${paras(x.body)}</div><p><strong>${esc(x.sign)}</strong></p>`, "center"))] }),
      sermon: (x) => ({ elements: [row("5,7", [[text(`<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>${btn(x.button, "btn-accent", "/sermons")}`)], [sermons()]])] }),
      quote: (x) => ({ ...DARK, background: "var(--accent)", elements: [narrow(el("testimonial", { quotes: [{ text: x.quote, author: x.cite }], displayMode: "single" }))] }),
      faq: (x) => ({ elements: [narrow(text(`<h2>${esc(x.heading)}</h2>`, "center"), ...[1, 2, 3, 4, 5].filter((i) => x[`q${i}`]).map((i) => el("faq", { headingType: "h6", title: x[`q${i}`], description: `<p>${esc(x[`a${i}`])}</p>`, iconColor: accent })))] }),
      serve: (x) => ({
        elements: [
          row("7,5", [
            [text(`<h2>${esc(x.heading)}</h2>${paras(x.body)}`)],
            [el("box", { background: "var(--accent)", textColor: "var(--light)", headingColor: "var(--light)", rounded: "true" }, [text(`<h3>${esc(x.highlight)}</h3>`, "center")])]
          ])
        ]
      }),
      details: (x) => ({
        elements: [
          cardsHead(x),
          three((i) => el("iconFeature", { icon: v[`detailsIcon${i}`], title: x[`c${i}t`], description: `<p>${esc(x[`c${i}`])}</p>`, iconColor: accent, iconSize: "medium", textAlignment: "center" }, undefined, FADE))
        ]
      }),
      eventCountdown: (x) => {
        // the writer supplies the date; only a real, future date becomes a live countdown
        const when = new Date(String(x.date));
        const valid = !isNaN(when.getTime()) && when.getTime() > Date.now();
        return {
          ...DARK,
          background: "var(--accent)",
          elements: [valid ? el("countdown", { mode: "date", targetDate: String(x.date), title: x.title, completedText: "Happening now", showDays: "true", showHours: "true" }) : text(`<h2>${esc(x.title)}</h2>`, "center")]
        };
      },
      gallery: (x) => ({
        elements: [
          cardsHead(x),
          el("gallery", { photos: [1, 2, 3].map((i) => ({ url: photo(v[`galleryPhoto${i}`]), alt: PHOTOS[v[`galleryPhoto${i}`]] || "" })).filter((p) => p.url), layout: "wide", columns: 3, spacing: "medium" })
        ]
      }),
      invite: (x) => ({ elements: [el("textWithPhoto", { photo: photo(v.invitePhoto), photoAlt: PHOTOS[v.invitePhoto] || "", photoPosition: "right", text: `<h2>${esc(x.heading)}</h2>${paras(x.body)}${btn(x.button)}` })] }),
      groups: (x) => ({ elements: [text(`<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>`, "center"), el("groups", { showSearch: "false", showCategory: "true" })] }),
      countdown: (x) => ({
        ...DARK,
        background: "var(--accent)",
        elements: [el("countdown", { mode: "weekly", dayOfWeek: church.nextService?.dayOfWeek ?? 0, time: church.nextService?.time || "10:00", title: x.title, completedText: "Starting now", showDays: "true", showHours: "true" })]
      }),
      visitCta: (x) => ({
        ...DARK,
        // a photo behind the closing band when the client can resolve one; the flat band otherwise
        ...(church.resolvesPhotos && v.ctaPhoto ? { background: photo(v.ctaPhoto), answers: { overlayColor: dark, backgroundOpacity: "0.7", focalPoint: "center" } } : {}),
        styles: { all: { "padding-top": "90px", "padding-bottom": "90px" } },
        elements: [text(`<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>${btn(x.button, "btn-light")}`, "center")]
      }),
      contact: (x) => ({
        elements: [
          row("6,6", [
            [el("map", { mapAddress: church.address, mapLabel: church.name, mapZoom: 15 })],
            [text(`<h2>${esc(x.heading)}</h2><p><strong>${esc(church.address)}</strong></p><p>${esc(x.times)}</p>${btn(x.button)}`)]
          ])
        ]
      })
    };

    const finish = (els: any[]): any[] => els.map((e, i) => ({
      elementType: e.elementType,
      sort: i + 1,
      answersJSON: JSON.stringify(e.answers),
      animationsJSON: e.animations ? JSON.stringify(e.animations) : undefined,
      elements: e.elements ? finish(e.elements) : undefined
    }));
    let plain = 0;
    return layout.map((k, i) => {
      const sec = build[k](copy[k]);
      return {
        zone: "main",
        sort: i + 1,
        // plain sections alternate light / lightAccent so consecutive bands never merge
        background: sec.background ?? (plain++ % 2 ? "var(--lightAccent)" : "var(--light)"),
        textColor: sec.textColor ?? "dark",
        headingColor: sec.headingColor ?? "var(--accent)",
        answersJSON: sec.answers ? JSON.stringify(sec.answers) : undefined,
        stylesJSON: sec.styles ? JSON.stringify(sec.styles) : undefined,
        elements: finish(sec.elements)
      };
    });
  }
}
