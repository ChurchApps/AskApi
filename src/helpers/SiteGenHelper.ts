import { Environment } from "./Environment.js";

// Low-cost page generation. JEV (typed decisions, no text) picks the structure, judges layouts, fact-checks copy and
// picks visuals; Haiku only fills named text slots. No model ever emits builder JSON: every template below is a fixed
// section + element tree from the ElementTypes catalog, so output can never be structurally invalid.

export interface SiteGenChurch {
  name: string;
  brief: string;
  address?: string;
  palette?: { accent?: string; dark?: string };
}

export interface SiteGenUsage { jevIn: number; jevCalls: number; haikuIn: number; haikuOut: number; haikuCalls: number }

const JEV = "typesafe-ai/jev";
const HAIKU = "anthropic/claude-haiku-4.5";
const CANDIDATES = 10;
const TOP = 3;
const SAMPLE_TEMP = 1.5;
const JEV_TIMEOUT_MS = 6000;
const HAIKU_TIMEOUT_MS = 20000;
// API Gateway cuts requests at 29s; skip the optional repair pass once a writePage call has used this much.
const REPAIR_DEADLINE_MS = 13000;

type Slot = { guide: string; max: number };
const s = (guide: string, max: number): Slot => ({ guide, max });
const threeCards = (first: string) => ({
  heading: s("Section heading", 50),
  c1t: s(first, 30),
  c1: s("Card 1 text, brief facts only", 150),
  c2t: s("Card 2 title", 30),
  c2: s("Card 2 text", 150),
  c3t: s("Card 3 title", 30),
  c3: s("Card 3 text", 150)
});

export const SECTIONS: Record<string, { role: "hero" | "mid" | "close"; desc: string; slots: Record<string, Slot> }> = {
  heroPhoto: {
    role: "hero",
    desc: "Full-width photo hero with big headline, one sentence, and one button. Classic, warm, works for any church.",
    slots: { headline: s("Main headline, concrete and specific to this church", 60), sub: s("One supporting sentence", 140), button: s("Button label", 22) }
  },
  heroTimes: {
    role: "hero",
    desc: "Hero with headline plus service times shown right in the hero. Best when the visitor's main question is when and where.",
    slots: { headline: s("Main headline", 60), sub: s("One supporting sentence", 120), times: s("Service times, compact, separated by ' · '", 110), button: s("Button label", 22) }
  },
  heroVideo: {
    role: "hero",
    desc: "Hero with headline beside the latest sermon video. Best for churches that stream and whose visitors watch online before attending.",
    slots: { headline: s("Main headline", 60), sub: s("One supporting sentence", 140), button: s("Button label", 22), videoCaption: s("Caption under the video", 60) }
  },
  welcome: {
    role: "mid",
    desc: "Two-column welcome: photo on one side, short paragraph about who the church is on the other.",
    slots: { heading: s("Section heading", 50), body: s("2-3 sentence paragraph about who this church is, using real details", 380) }
  },
  expect: {
    role: "mid",
    desc: "What to expect on a first visit: three short icon cards about what the gathering is actually like. Lowers anxiety for first-time visitors.",
    slots: threeCards("Card 1 title: an aspect of a visit the brief gives facts about")
  },
  pathways: {
    role: "mid",
    desc: "Three quick-link cards for the specific things people come to this site looking for (e.g. baptism, first communion, marriage prep, a recovery group, a service in another language, the school). Essential when the brief names things people need to find.",
    slots: threeCards("Card 1: a thing the brief says people look for")
  },
  times: {
    role: "mid",
    desc: "Service times block: a clean table of every gathering with day and time. Essential when there are many services or Mass times.",
    slots: { heading: s("Section heading", 50), rows: s("Every gathering, one per line as 'Name | day and time'", 420), note: s("Short note under the list", 120) }
  },
  ministries: {
    role: "mid",
    desc: "Three ministry photo cards (e.g. kids, students, groups, recovery, outreach). Best when the church has distinct programs people search for.",
    slots: threeCards("Ministry 1 name")
  },
  pastor: {
    role: "mid",
    desc: "Personal note from the pastor with portrait, a short first-person message and signature. Builds trust for small or relational churches.",
    slots: { heading: s("Section heading", 50), body: s("First-person note from the pastor, 2-3 sentences, sounds like a real person", 360), sign: s("Signature line: name and role", 60) }
  },
  sermon: {
    role: "mid",
    desc: "Latest sermon / watch online band with the newest sermon video and a link to the archive.",
    slots: { heading: s("Section heading", 50), body: s("One or two sentences on what the teaching is like", 200), button: s("Button label", 22) }
  },
  quote: {
    role: "mid",
    desc: "Large pull quote: a scripture verse or a line about the church's heart, centered on a colored band. A breather between dense sections.",
    slots: { quote: s("A scripture verse (quoted accurately) or one line about the church", 200), cite: s("Reference or attribution", 50) }
  },
  faq: {
    role: "mid",
    desc: "FAQ with four questions a nervous or skeptical first-time visitor would actually ask.",
    slots: {
      heading: s("Section heading", 50),
      q1: s("Question 1: only ask questions the brief can answer", 70),
      a1: s("Answer 1, brief facts only, no promises the brief does not make", 200),
      q2: s("Question 2", 70),
      a2: s("Answer 2", 200),
      q3: s("Question 3", 70),
      a3: s("Answer 3", 200),
      q4: s("Question 4", 70),
      a4: s("Answer 4", 200)
    }
  },
  serve: {
    role: "mid",
    desc: "Community impact band: what this church does for its neighbors (food pantry, recovery, school), with one short highlight box.",
    slots: { heading: s("Section heading", 50), body: s("2 sentences about real community work from the brief", 260), highlight: s("Short highlight, e.g. 'Open every Thursday'", 40) }
  },
  visitCta: {
    role: "close",
    desc: "Closing call-to-action band inviting people to plan a visit, with one button.",
    slots: { heading: s("Invitation headline", 60), body: s("One sentence", 140), button: s("Button label", 22) }
  },
  contact: {
    role: "close",
    desc: "Closing section with map, address, service times recap and a contact button. Best for local, walk-in, or older audiences.",
    slots: { heading: s("Section heading", 50), times: s("Service times recap, compact", 140), button: s("Button label", 22) }
  }
};

// Sections that read as duplicates of each other on one page.
const CLASH: Record<string, string> = { pathways: "ministries", ministries: "pathways", sermon: "heroVideo" };

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

const PHOTOS: Record<string, string> = {
  "/tempLibrary/backgrounds/worship.jpg": "Congregation in a modern worship service with stage lighting",
  "/tempLibrary/backgrounds/crowd.jpg": "A crowd of people gathered together",
  "/tempLibrary/backgrounds/kids.jpg": "Children in a kids ministry setting",
  "/tempLibrary/building.jpg": "Exterior of a traditional church building",
  "/tempLibrary/praise.jpg": "People with hands raised in praise",
  "/tempLibrary/bible.jpg": "An open Bible, quiet and studious",
  "/tempLibrary/teen-praying.jpg": "A teenager praying, student ministry"
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
  healing: "recovery, confession, restoration",
  question_answer: "questions, conversation, doubts"
};

const COPY_SYSTEM = `You write page copy for church websites. You are given a church brief and a list of sections with named text slots. Return ONLY a JSON object: { "<sectionKey>": { "<slot>": "text", ... }, ... }.

Rules:
- Every fact (names, times, programs, places) must come from the brief. Never invent staff, stats, history, or programs.
- If the brief does not mention it, it does not exist: no coffee, parking, dress code, pews, greeters, nursery, building details or history unless the brief states them. When a slot asks for something the brief doesn't cover, write about what the brief DOES cover that serves the same visitor need.
- Be specific to THIS church. A sentence that could appear on any church's site is a failed sentence.
- The hero headline must NOT be the church's name (it is already in the site header). It should say something true and particular about this church in under ten words.
- Avoid stock church-website phrases such as "Welcome home", "come as you are", "a place to belong", "vibrant", "do life together", unless the brief itself uses them. No exclamation marks, no em dashes, no rhetorical questions in headlines.
- Headlines are short and concrete. Body copy is second person and talks to a first-time visitor.
- Do not repeat the same fact or phrase in more than two sections. Each section must earn its place with new information.
- Respect each slot's max characters strictly. Plain text only, no markdown.
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
    for (let attempt = 1; ; attempt++) {
      try {
        // the gateway occasionally hangs, so each attempt gets its own short timeout
        const r = await this.gateway("/v4/ai/evaluation-model", { state, questions, providerOptions: { gateway: { zeroDataRetention: true } } }, JEV_TIMEOUT_MS, headers);
        usage.jevIn += r.usage?.inputTokens ?? 0;
        return r.answers as Record<string, any>;
      } catch (e) {
        if (attempt >= 2) throw e;
      }
    }
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

  private static criteria(keys: string[]) { return Object.fromEntries(keys.map((k) => [k, SECTIONS[k].desc])); }
  private static byRole(role: string, church: SiteGenChurch) {
    return Object.keys(SECTIONS).filter((k) => SECTIONS[k].role === role && (k !== "contact" || !!church.address));
  }

  private static async buildLayout(usage: SiteGenUsage, church: SiteGenChurch, temp: number): Promise<string[]> {
    const chosen: string[] = [];
    const round = async (id: string, instructions: string, criteria: Record<string, string>) => {
      const state = {
        church: church.brief,
        goal: "Design the web page this church asked for. The reader is a first-time visitor deciding whether to come.",
        sections_so_far: chosen.map((k, i) => `${i + 1}. ${k}: ${SECTIONS[k].desc}`)
      };
      const a = (await this.ask(usage, state, { [id]: { type: "choice", instructions, criteria } }))[id];
      return this.sample(a.probabilities, temp);
    };
    chosen.push(await round("hero", "Which hero section should open this page?", this.criteria(this.byRole("hero", church))));
    const count = Number(await round("count", "How many sections should sit between the hero and the closing section?", { 3: "Three: small church or simple message", 4: "Four: typical", 5: "Five: large church with many programs or audiences" }));
    for (let i = 0; i < count; i++) {
      const left = this.byRole("mid", church).filter((k) => !chosen.includes(k) && !chosen.includes(CLASH[k]));
      chosen.push(await round(`s${i}`, `Which section should come next (position ${chosen.length + 1})? Pick what a first-time visitor to THIS church most needs next, and keep a natural flow from the sections so far.`, this.criteria(left)));
    }
    chosen.push(await round("close", "Which closing section should end the page?", this.criteria(this.byRole("close", church))));
    return chosen;
  }

  private static async judgeLayout(usage: SiteGenUsage, church: SiteGenChurch, layout: string[]): Promise<number> {
    const a = await this.ask(usage, { church: church.brief, page: layout.map((k, i) => `${i + 1}. ${k}: ${SECTIONS[k].desc}`) }, {
      fit: { type: "score", instructions: "How well do these sections match what this specific church has to offer and who it is trying to reach?", criteria: SCORE4 },
      flow: { type: "score", instructions: "How natural is the order for a first-time visitor: orient, reassure, inform, then invite?", criteria: SCORE4 },
      gaps: { type: "score", instructions: "Does the page cover the things this church's brief emphasizes, without filler sections that the brief gives no material for?", criteria: ["Major gaps or filler", "Some gaps or filler", "Minor issues", "Covers everything, no filler"] }
    });
    return a.fit.score + a.flow.score + a.gaps.score;
  }

  private static async pickStyle(usage: SiteGenUsage, church: SiteGenChurch) {
    const a = await this.ask(usage, { church: church.brief }, {
      scheme: { type: "choice", instructions: "Which color and type scheme best fits this church's identity and the people it wants to reach?", criteria: Object.fromEntries(Object.entries(SCHEMES).map(([k, v]) => [k, v.desc])) },
      tone: { type: "choice", instructions: "Which writing voice fits this church?", criteria: TONES }
    });
    return { scheme: a.scheme.choice as string, tone: a.tone.choice as string };
  }

  /** Phase 1: sample candidate layouts, judge them, and pick a voice. Returns the best few for phase 2. */
  static async planPage(church: SiteGenChurch) {
    const usage = this.newUsage();
    const stylePromise = this.pickStyle(usage, church).catch(() => ({ scheme: "navyClassic", tone: "plainWarm" }));
    const built = await Promise.allSettled(Array.from({ length: CANDIDATES }, (_, i) => this.buildLayout(usage, church, i ? SAMPLE_TEMP : 0)));
    const layouts = built.filter((r): r is PromiseFulfilledResult<string[]> => r.status === "fulfilled").map((r) => r.value);
    if (!layouts.length) throw new Error("Could not plan a page layout. Please try again.");
    const unique = [...new Map(layouts.map((l) => [l.join(">"), l])).values()];
    // a failed judge call scores 0 rather than sinking the whole plan
    const scored = await Promise.all(unique.map(async (layout) => ({ layout, score: await this.judgeLayout(usage, church, layout).catch(() => 0) })));
    scored.sort((a, b) => b.score - a.score);
    const style = await stylePromise;
    return { candidates: scored.slice(0, TOP), tone: style.tone, suggestedStyle: { key: style.scheme, fonts: SCHEMES[style.scheme].fonts, palette: SCHEMES[style.scheme].palette }, usage };
  }

  private static async haiku(usage: SiteGenUsage, prompt: string, maxOutputTokens: number, temperature: number): Promise<any> {
    const r = await this.gateway("/v1/chat/completions", { model: HAIKU, max_tokens: maxOutputTokens, temperature, messages: [{ role: "system", content: COPY_SYSTEM }, { role: "user", content: prompt }] }, HAIKU_TIMEOUT_MS);
    usage.haikuCalls++;
    usage.haikuIn += r.usage?.prompt_tokens ?? 0;
    usage.haikuOut += r.usage?.completion_tokens ?? 0;
    const out: string = r.choices?.[0]?.message?.content || "";
    return JSON.parse(out.slice(out.indexOf("{"), out.lastIndexOf("}") + 1));
  }

  private static slotSpec(k: string, withGuide: boolean) {
    return Object.fromEntries(Object.entries(SECTIONS[k].slots).map(([n, v]) => [n, withGuide ? `${v.guide} (max ${v.max} chars)` : `max ${v.max}`]));
  }

  private static validCopy(layout: string[], copy: Copy) {
    for (const k of layout) {
      for (const [n, v] of Object.entries(SECTIONS[k].slots)) {
        const t = copy?.[k]?.[n];
        if (typeof t !== "string" || !t.trim() || t.length > v.max * 1.25) return false;
      }
    }
    return true;
  }

  private static async writeCopy(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], tone: string): Promise<Copy> {
    const spec = layout.map((k) => ({ section: k, purpose: SECTIONS[k].desc, slots: this.slotSpec(k, true) }));
    const prompt = `Church: ${church.name}\nAddress: ${church.address || "(not given)"}\nBrief: ${church.brief}\nVoice: ${TONES[tone] || TONES.plainWarm}\n\nSections, in page order:\n${JSON.stringify(spec, null, 1)}`;
    for (let attempt = 1; ; attempt++) {
      try {
        const copy = await this.haiku(usage, prompt, 3000, 0.8);
        if (this.validCopy(layout, copy)) return copy;
      } catch (e) {
        if (attempt >= 2) throw e;
      }
      if (attempt >= 2) throw new Error("Could not write page copy. Please try again.");
    }
  }

  private static factCheck(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], copy: Copy) {
    return this.ask(usage, { church_brief: church.brief, church_name: church.name, address: church.address }, Object.fromEntries(layout.map((k) => [
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

  private static async repairCopy(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], copy: Copy, tone: string, checks: Record<string, any>) {
    const phrases = this.stockPhrases(church);
    const bad = layout.filter((k) => {
      const textOf = JSON.stringify(copy[k]).toLowerCase();
      const nameAsHeadline = k.startsWith("hero") && copy[k].headline.toLowerCase().includes(church.name.toLowerCase().slice(0, 12));
      return checks[k]?.probability > 0.5 || nameAsHeadline || /[!—]/.test(textOf) || phrases.some((p) => textOf.includes(p));
    });
    if (!bad.length) return { copy, repaired: bad };
    const flagged = Object.fromEntries(bad.map((k) => [k, { slots: this.slotSpec(k, false), current: copy[k] }]));
    const prompt = `Church: ${church.name}\nBrief: ${church.brief}\nVoice: ${TONES[tone] || TONES.plainWarm}\n\nA fact-checker flagged these sections for stating details that are not in the brief, using a stock phrase, exclamation mark or em dash, or using the church name as the hero headline. Rewrite ONLY these sections, same slots and max lengths, keeping what was good. Remove every detail the brief does not state.\n${JSON.stringify(flagged, null, 1)}`;
    try {
      const fix = await this.haiku(usage, prompt, 2000, 0.4);
      for (const k of bad) if (this.validCopy([k], fix)) copy = { ...copy, [k]: fix[k] };
    } catch { /* keep the original copy */ }
    return { copy, repaired: bad };
  }

  /** Last line of defense: Haiku sometimes keeps a stock phrase through a rewrite, so drop the offending sentence in code. */
  static scrub(copy: Copy, phrases: string[]): Copy {
    for (const sec of Object.values(copy)) {
      for (const [n, v] of Object.entries(sec)) {
        if (typeof v !== "string") continue;
        const kept = v.split(/(?<=[.?!])\s+/).filter((sentence) => !phrases.some((p) => sentence.toLowerCase().includes(p))).join(" ");
        sec[n] = (kept || v).replace(/\s*—\s*/g, ", ").replace(/!/g, ".");
      }
    }
    return copy;
  }

  private static async pickVisuals(usage: SiteGenUsage, church: SiteGenChurch, layout: string[], copy: Copy): Promise<Record<string, string>> {
    const q: Record<string, any> = { heroPhoto: { type: "choice", instructions: "Which stock photo best fits the hero of this church's page?", criteria: PHOTOS } };
    if (layout.includes("welcome")) q.welcomePhoto = { type: "choice", instructions: "Which stock photo best fits the 'who we are' section? It should differ in feel from a worship-stage hero.", criteria: PHOTOS };
    for (const i of [1, 2, 3]) {
      if (layout.includes("expect")) q[`expectIcon${i}`] = { type: "choice", instructions: `Which icon best matches this card? "${copy.expect[`c${i}t`]}: ${copy.expect[`c${i}`]}"`, criteria: ICONS };
      if (layout.includes("ministries")) q[`ministryPhoto${i}`] = { type: "choice", instructions: `Which stock photo best matches this ministry card? "${copy.ministries[`c${i}t`]}: ${copy.ministries[`c${i}`]}"`, criteria: PHOTOS };
    }
    const picks: Record<string, string> = {};
    const used = new Set<string>();
    try {
      const a = await this.ask(usage, { church: church.brief }, q);
      for (const [k, v] of Object.entries(a)) {
        // no repeats on one page: fall back to the next most probable unused option
        const ranked = Object.entries(v.probabilities as Record<string, number>).sort((x, y) => y[1] - x[1]).map(([o]) => o);
        picks[k] = (k === "heroPhoto" ? v.choice : ranked.find((o) => !used.has(o))) ?? v.choice;
        used.add(picks[k]);
      }
    } catch { /* fall through to defaults */ }
    const photoKeys = Object.keys(PHOTOS);
    const iconKeys = Object.keys(ICONS);
    Object.keys(q).forEach((k, i) => { if (!picks[k]) picks[k] = k.includes("Icon") ? iconKeys[i % iconKeys.length] : photoKeys[i % photoKeys.length]; });
    return picks;
  }

  /** Phase 2: write, fact-check, repair and score the copy for one layout, then assemble the builder tree. */
  static async writePage(church: SiteGenChurch, layout: string[], tone: string) {
    if (!Array.isArray(layout) || !layout.length || layout.length > 8 || layout.some((k) => !SECTIONS[k])) throw new Error("Invalid layout.");
    const started = Date.now();
    const usage = this.newUsage();
    let copy = await this.writeCopy(usage, church, layout, tone);
    let checks: Record<string, any> = await this.factCheck(usage, church, layout, copy).catch(() => ({}));
    let repaired: string[] = [];
    if (Date.now() - started < REPAIR_DEADLINE_MS) {
      ({ copy, repaired } = await this.repairCopy(usage, church, layout, copy, tone, checks));
      if (repaired.length) checks = await this.factCheck(usage, church, layout, copy).catch(() => checks);
    }
    copy = this.scrub(copy, this.stockPhrases(church));

    const [visuals, judged] = await Promise.all([
      this.pickVisuals(usage, church, layout, copy),
      this.ask(usage, { church: church.brief, page_copy: layout.map((k) => ({ section: k, ...copy[k] })) }, {
        specific: { type: "score", instructions: "How specific is this copy to this one church, using real details from the brief, versus generic lines any church could use?", criteria: ["Generic boilerplate", "Mostly generic", "Mostly specific", "Unmistakably this church"] },
        visitor: { type: "score", instructions: "Would a nervous first-time visitor from the audience this church wants to reach feel understood and know exactly what to do next?", criteria: SCORE4 }
      }).catch((): Record<string, any> | null => null)
    ]);
    const factClean = layout.filter((k) => !(checks[k]?.probability > 0.5)).length / layout.length;
    const score = +((judged?.specific?.score ?? 0) + (judged?.visitor?.score ?? 0) + factClean * 3).toFixed(2);
    return { sections: this.buildTree(church, layout, copy, visuals), score, factClean: +factClean.toFixed(2), repaired, usage };
  }

  private static newUsage(): SiteGenUsage { return { jevIn: 0, jevCalls: 0, haikuIn: 0, haikuOut: 0, haikuCalls: 0 }; }

  // ---- builder tree assembly (pure) ----

  static buildTree(church: SiteGenChurch, layout: string[], copy: Copy, v: Record<string, string>) {
    const accent = church.palette?.accent || "#2A6F97";
    const dark = church.palette?.dark || "#0B2434";
    const esc = (t = "") => String(t).replace(/[&<>]/g, (c): string => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as Record<string, string>)[c]).replace(/'/g, "&rsquo;");
    const el = (elementType: string, answers: any, elements?: any[]) => ({ elementType, answers, elements });
    const text = (html: string, align = "left") => el("text", { text: html, textAlignment: align });
    const row = (columns: string, cols: any[][]) => el("row", { columns, mobileSizes: columns.split(",").map(() => 12).join(",") }, columns.split(",").map((size, i) => el("column", { size: Number(size), mobileSize: 12 }, cols[i] || [])));
    const narrow = (...els: any[]) => row("2,8,2", [[], els, []]);
    const btn = (label: string, cls = "btn-accent", href = "#") => `<p><a class='btn ${cls} btn-large' href='${href}'>${esc(label)}</a></p>`;
    const three = (make: (i: number) => any) => row("4,4,4", [1, 2, 3].map((i) => [make(i)]));
    const DARK = { background: "var(--darkAccent)", textColor: "light", headingColor: "var(--light)" };
    const hero = (html: string) => ({
      background: v.heroPhoto || "var(--dark)",
      textColor: "light",
      headingColor: "var(--light)",
      answers: { overlayColor: dark, backgroundOpacity: "0.6", focalPoint: "center" },
      styles: { all: { "padding-top": "130px", "padding-bottom": "130px" } },
      elements: [text(html, "center")]
    });
    const lead = (x: any) => `<h1>${esc(x.headline)}</h1><p style='font-size:1.3em'>${esc(x.sub)}</p>`;
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
      welcome: (x) => ({ elements: [el("textWithPhoto", { photo: v.welcomePhoto, photoAlt: PHOTOS[v.welcomePhoto] || "", photoPosition: "left", text: `<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>` })] }),
      expect: (x) => ({
        elements: [
          text(`<h2>${esc(x.heading)}</h2>`, "center"),
          three((i) => el("iconFeature", { icon: v[`expectIcon${i}`], title: x[`c${i}t`], description: `<p>${esc(x[`c${i}`])}</p>`, iconColor: accent, iconSize: "medium", textAlignment: "center" }))
        ]
      }),
      times: (x) => ({
        elements: [
          narrow(
            text(`<h2>${esc(x.heading)}</h2>`, "center"),
            el("table", { contents: String(x.rows).split(/\n/).filter(Boolean).map((r) => r.split("|").map((c) => c.trim())), head: false, markdown: false, size: "medium" }),
            text(`<p>${esc(x.note)}</p>`, "center")
          )
        ]
      }),
      pathways: (x) => ({
        elements: [
          text(`<h2>${esc(x.heading)}</h2>`, "center"),
          three((i) => el("card", { title: x[`c${i}t`], titleAlignment: "left", text: `<p>${esc(x[`c${i}`])}</p>`, textAlignment: "left" }))
        ]
      }),
      ministries: (x) => ({
        elements: [
          text(`<h2>${esc(x.heading)}</h2>`, "center"),
          three((i) => el("card", { photo: v[`ministryPhoto${i}`], photoAlt: x[`c${i}t`], title: x[`c${i}t`], titleAlignment: "center", text: `<p>${esc(x[`c${i}`])}</p>`, textAlignment: "center" }))
        ]
      }),
      pastor: (x) => ({ elements: [el("textWithPhoto", { photo: "/tempLibrary/pastor.jpg", photoAlt: x.sign, photoPosition: "right", text: `<h2>${esc(x.heading)}</h2><p><em>${esc(x.body)}</em></p><p><strong>${esc(x.sign)}</strong></p>` })] }),
      sermon: (x) => ({ elements: [row("5,7", [[text(`<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>${btn(x.button, "btn-accent", "/sermons")}`)], [sermons()]])] }),
      quote: (x) => ({ ...DARK, background: "var(--accent)", elements: [narrow(el("testimonial", { quotes: [{ text: x.quote, author: x.cite }], displayMode: "single" }))] }),
      faq: (x) => ({ elements: [narrow(text(`<h2>${esc(x.heading)}</h2>`, "center"), ...[1, 2, 3, 4].map((i) => el("faq", { headingType: "h6", title: x[`q${i}`], description: `<p>${esc(x[`a${i}`])}</p>`, iconColor: accent })))] }),
      serve: (x) => ({
        elements: [
          row("7,5", [
            [text(`<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>`)],
            [el("box", { background: "var(--accent)", textColor: "var(--light)", headingColor: "var(--light)", rounded: "true" }, [text(`<h3>${esc(x.highlight)}</h3>`, "center")])]
          ])
        ]
      }),
      visitCta: (x) => ({ ...DARK, styles: { all: { "padding-top": "80px", "padding-bottom": "80px" } }, elements: [text(`<h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p>${btn(x.button, "btn-light")}`, "center")] }),
      contact: (x) => ({
        elements: [
          row("6,6", [
            [el("map", { mapAddress: church.address, mapLabel: church.name, mapZoom: 15 })],
            [text(`<h2>${esc(x.heading)}</h2><p><strong>${esc(church.address)}</strong></p><p>${esc(x.times)}</p>${btn(x.button)}`)]
          ])
        ]
      })
    };

    const finish = (els: any[]): any[] => els.map((e, i) => ({ elementType: e.elementType, sort: i + 1, answersJSON: JSON.stringify(e.answers), elements: e.elements ? finish(e.elements) : undefined }));
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
