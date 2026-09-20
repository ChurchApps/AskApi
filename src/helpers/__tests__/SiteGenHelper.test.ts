import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

mock.module("@churchapps/apihelper", { namedExports: { AwsHelper: { readParameter: async () => "" }, EnvironmentBase: class EnvironmentBase {} } });

const { SiteGenHelper, SECTIONS } = await import("../SiteGenHelper.js");

const BUILDER_TYPES = new Set([
  "text", "row", "column", "card", "faq", "iconFeature", "table", "testimonial", "textWithPhoto", "box", "map", "sermons", "image", "groups", "countdown", "serviceTimes", "gallery"
]);

const fillCopy = (layout: string[]) => Object.fromEntries(layout.map((k) => [k, Object.fromEntries(Object.keys(SECTIONS[k].slots).map((n) => [n, n === "rows" ? "Sunday | 9am\nWednesday | 6pm" : `It's <${n}>`]))]));

describe("SiteGenHelper", () => {
  it("builds a valid builder tree for every template", () => {
    const layout = Object.keys(SECTIONS);
    const church = { name: "Test Church", brief: "A church.", address: "1 Main St", resolvesPhotos: true };
    const open = SiteGenHelper.buildTree(church, layout, fillCopy(layout));
    const slots = SiteGenHelper.visualSlots(open);
    const subjects = [
      "church exterior", "open bible", "choir singing", "hands praying", "candles church", "sunrise field", "city skyline", "church pews", "hymnal piano", "welcome handshake", "outdoor picnic", "easter lilies", "baptism water", "wedding church", "mountain landscape", "stained glass window"
    ];
    let p = 0;
    const picks = Object.fromEntries(slots.map((slot) => [slot.id, slot.kind === "photo" ? subjects[p++ % subjects.length] : slot.kind === "icon" ? "schedule" : "wave"]));
    const sections = SiteGenHelper.applyVisuals(open, picks, true);
    assert.equal(sections.length, layout.length);

    const walk = (els: any[], parentType?: string) => els.forEach((e, i) => {
      assert.ok(BUILDER_TYPES.has(e.elementType), `unknown element type ${e.elementType}`);
      assert.equal(e.sort, i + 1);
      const answers = JSON.parse(e.answersJSON);
      if (e.elementType === "column") assert.equal(parentType, "row");
      if (e.elementType === "row") {
        const sizes = answers.columns.split(",").map(Number);
        assert.equal(sizes.reduce((a: number, b: number) => a + b, 0), 12);
        assert.deepEqual(e.elements.map((c: any) => c.elementType), sizes.map(() => "column"));
      }
      if (e.elements) walk(e.elements, e.elementType);
    });
    sections.forEach((sec, i) => {
      assert.equal(sec.sort, i + 1);
      if (sec.answersJSON) JSON.parse(sec.answersJSON);
      walk(sec.elements);
    });

    assert.equal(sections[0].background, "pexels:church exterior");
    assert.ok(!JSON.stringify(sections).includes("auto:"), "every open slot must be filled");
    const legacy = JSON.stringify(SiteGenHelper.applyVisuals(open, picks, false));
    assert.ok(!legacy.includes("pexels:") && !legacy.includes("auto:"), "clients that cannot resolve photos must never see a placeholder");
    assert.equal(JSON.parse(sections[0].answersJSON).dividerBottom.shape, "wave");
    const all = JSON.stringify(sections);
    assert.ok(!all.includes("tempLibrary/pastor"), "no stock portrait may stand in for the pastor");
    assert.ok(!all.includes("<headline>"), "copy must be HTML-escaped");
    assert.ok(all.includes("It&rsquo;s &lt;headline&gt;"));
  });

  it("alternates plain section backgrounds", () => {
    const layout = ["heroPhoto", "welcome", "expect", "faq"];
    const sections = SiteGenHelper.buildTree({ name: "T", brief: "b" }, layout, fillCopy(layout));
    assert.deepEqual(sections.slice(1).map((x) => x.background), ["var(--light)", "var(--lightAccent)", "var(--light)"]);
  });

  it("samples the top option at temperature 0 and still varies one-hot distributions otherwise", () => {
    assert.equal(SiteGenHelper.sample({ a: 0.2, b: 0.8 }, 0), "b");
    assert.equal(SiteGenHelper.sample({ a: 1, b: 0 }, 1.5, () => 0.999), "b");
    assert.equal(SiteGenHelper.sample({ a: 1, b: 0 }, 1.5, () => 0), "a");
  });

  it("scrubs stock phrases and punctuation, but keeps a phrase the church itself uses", () => {
    const copy = { pastor: { body: "We meet Sundays. Come as you are! Hymns — with piano." } };
    const phrases = SiteGenHelper.stockPhrases({ name: "T", brief: "Hymns with piano." });
    assert.equal(SiteGenHelper.scrub(copy, phrases).pastor.body, "We meet Sundays. Hymns, with piano.");
    assert.ok(!SiteGenHelper.stockPhrases({ name: "T", brief: "Our motto is Come As You Are." }).includes("come as you are"));
  });

  it("uses the live serviceTimes element only when the church keeps service times in B1", () => {
    const layout = ["heroPhoto", "times"];
    const types = (church: any) => JSON.stringify(SiteGenHelper.buildTree(church, layout, fillCopy(layout)));
    assert.ok(types({ name: "T", brief: "b", hasServiceTimes: true }).includes('"elementType":"serviceTimes"'));
    assert.ok(types({ name: "T", brief: "b" }).includes('"elementType":"table"'));
  });

  it("only offers templates the church has data for", () => {
    const bare = SiteGenHelper.available("mid", { name: "T", brief: "b" });
    assert.ok(!bare.includes("groups") && !bare.includes("countdown"));
    assert.ok(!SiteGenHelper.available("close", { name: "T", brief: "b" }).includes("contact"));
    const full = SiteGenHelper.available("mid", { name: "T", brief: "b", hasGroups: true, nextService: { dayOfWeek: 0, time: "10:00" } });
    assert.ok(full.includes("groups") && full.includes("countdown"));
  });

  it("flags a later section that re-tells an earlier one, but not recap sections", () => {
    const told = "Lakeside Kids runs during every Sunday service with secure check-in for birth through fifth grade.";
    const copy = {
      heroPhoto: { headline: "h", sub: "s", button: "b" },
      expect: { heading: "x", c1: told },
      ministries: { heading: "y", c1: `Our kids program: ${told}` },
      contact: { heading: "z", times: told }
    };
    assert.deepEqual(SiteGenHelper.findRepeats(["heroPhoto", "expect", "ministries", "contact"], copy), { ministries: "expect" });
  });

  it("treats facts from church records as part of the brief", () => {
    assert.ok(SiteGenHelper.fullBrief({ name: "T", brief: "We love hymns.", facts: "Sunday 9:00 AM" }).includes("Sunday 9:00 AM"));
    assert.equal(SiteGenHelper.fullBrief({ name: "T", brief: "We love hymns." }), "We love hymns.");
  });

  it("keeps a page about one event on topic by not offering general church sections", () => {
    const church = { name: "T", brief: "Promote our Thanksgiving potluck on Nov 12th", address: "1 Main St", hasGroups: true, nextService: { dayOfWeek: 0, time: "10:00" } };
    const event = SiteGenHelper.available("mid", church, "event");
    for (const generic of ["pastor", "sermon", "ministries", "groups", "serve", "countdown"]) assert.ok(!event.includes(generic), `${generic} is filler on an event page`);
    assert.ok(event.includes("details") && event.includes("eventCountdown") && event.includes("faq"));
    assert.ok(!SiteGenHelper.available("hero", church, "event").includes("heroVideo"));
    const home = SiteGenHelper.available("mid", church, "home");
    assert.ok(home.includes("pastor") && !home.includes("details") && !home.includes("eventCountdown"));
  });

  it("turns only a real future date into a live event countdown", () => {
    const build = (date: string) => JSON.stringify(SiteGenHelper.buildTree({ name: "T", brief: "b" }, ["eventCountdown"], { eventCountdown: { title: "Potluck", date } }));
    const future = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 16);
    assert.ok(build(future).includes('"elementType":"countdown"'));
    assert.ok(!build("sometime in November").includes('"elementType":"countdown"'));
    assert.ok(!build("2020-11-12T18:00").includes('"elementType":"countdown"'));
  });

  it("gives even a one-line event request a full page, and general pages more room", () => {
    const thin = { name: "T", brief: "I want a page to promote our Thanksgiving potluck on Nov 12th" };
    assert.deepEqual(Object.keys(SiteGenHelper.countOptions(thin, "event")), ["3", "4"]);
    assert.deepEqual(Object.keys(SiteGenHelper.countOptions({ name: "T", brief: "x".repeat(700) }, "event")), ["3", "4", "5"]);
    assert.deepEqual(Object.keys(SiteGenHelper.countOptions(thin, "home")), ["4", "5", "6"]);
  });

  it("offers live service times on an event page only when the church has them", () => {
    assert.ok(SiteGenHelper.available("mid", { name: "T", brief: "b", hasServiceTimes: true }, "event").includes("times"));
    assert.ok(!SiteGenHelper.available("mid", { name: "T", brief: "b" }, "event").includes("times"));
    assert.ok(SiteGenHelper.available("mid", { name: "T", brief: "b" }, "event").includes("invite"));
  });

  it("cuts a stock phrase out of a slot that is a single sentence", () => {
    const copy = { expect: { c1: "Come as you are to relax, eat, and enjoy the meal." } };
    assert.equal(SiteGenHelper.scrub(copy, ["come as you are"]).expect.c1, "Relax, eat, and enjoy the meal.");
  });

  it("finds every photo-capable element generically and picks from the text beside it", () => {
    const church = { name: "T", brief: "b", resolvesPhotos: true };
    assert.ok(SiteGenHelper.available("mid", church).includes("gallery"));
    assert.ok(!SiteGenHelper.available("mid", { name: "T", brief: "b" }).includes("gallery"));
    const layout = ["heroPhoto", "pathways", "gallery", "invite", "expect", "visitCta"];
    const open = SiteGenHelper.buildTree(church, layout, fillCopy(layout));
    const slots = SiteGenHelper.visualSlots(open);
    // hero background + divider, 3 cards, 3 gallery photos, invite photo, 3 icons, closing background
    assert.deepEqual(slots.map((x) => x.kind), [
      "photo", "divider", "photo", "photo", "photo", "photo", "photo", "photo", "photo", "icon", "icon", "icon", "photo"
    ]);
    assert.ok(slots[2].context.includes("c1t"), "a card's photo is chosen from that card's own text");
    assert.ok(slots[12].context.startsWith("Background photo"));
  });

  it("gives a template it has never heard of a photo, because any empty photo field is an open slot", () => {
    const custom = [{ background: "var(--light)", elements: [{ elementType: "textWithPhoto", sort: 1, answersJSON: JSON.stringify({ text: "<h2>Youth retreat</h2><p>A weekend away for students.</p>" }) }, { elementType: "text", sort: 2, answersJSON: JSON.stringify({ text: "plain" }) }] }];
    const slots = SiteGenHelper.visualSlots(custom);
    assert.equal(slots.length, 1);
    assert.ok(slots[0].context.includes("Youth retreat"));
    const filled = SiteGenHelper.applyVisuals(custom, { v0: "teenagers friends outdoors" }, true);
    assert.equal(JSON.parse(filled[0].elements[0].answersJSON).photo, "pexels:teenagers friends outdoors");
    assert.equal(JSON.parse(custom[0].elements[0].answersJSON).photo, undefined, "the input tree is not mutated");
  });

  it("degrades cleanly for clients that cannot resolve photos", () => {
    const layout = ["heroPhoto", "pathways", "visitCta"];
    const open = SiteGenHelper.buildTree({ name: "T", brief: "b" }, layout, fillCopy(layout));
    const picks = Object.fromEntries(SiteGenHelper.visualSlots(open).map((x) => [x.id, x.kind === "photo" ? "open bible" : "none"]));
    const sections = SiteGenHelper.applyVisuals(open, picks, false);
    assert.equal(sections[0].background, "/tempLibrary/backgrounds/worship.jpg");
    assert.equal(sections[2].background, "var(--darkAccent)");
    assert.equal(JSON.parse(sections[0].answersJSON).dividerBottom, undefined);
    assert.ok(!JSON.stringify(sections[1]).includes('"photo"'), "cards simply go without a photo");
  });

  it("gives every section the same decided details, but reports against what the church actually said", () => {
    const church = { name: "T", brief: "Promote our potluck on Nov 12th", assumedDetails: ["Starts at 5:30 PM in the fellowship hall"] };
    assert.ok(SiteGenHelper.fullBrief(church).includes("Starts at 5:30 PM"));
    assert.ok(SiteGenHelper.fullBrief(church).includes("never pick different ones"));
    assert.ok(!SiteGenHelper.knownBrief(church).includes("5:30"));
    assert.equal(SiteGenHelper.fullBrief({ name: "T", brief: "b" }), "b");
  });

  it("works out the weekday of dates in the request instead of letting the writer guess", () => {
    const now = new Date(Date.UTC(2026, 8, 19));
    assert.deepEqual(SiteGenHelper.dateFacts("Promote our Thanksgiving potluck on Nov 12th", now), ["Nov 12th is Thursday, November 12, 2026."]);
    assert.deepEqual(SiteGenHelper.dateFacts("Easter egg hunt April 4", now), ["April 4 is Sunday, April 4, 2027."], "a past date means its next occurrence");
    assert.deepEqual(SiteGenHelper.dateFacts("VBS is February 30", now), []);
    assert.deepEqual(SiteGenHelper.dateFacts("A home page for new visitors", now), []);
  });

  it("never lets an invented email, web address or phone number through, but keeps the church's own", () => {
    const known = "Call the office at (555) 123-4567 or write info@gracechurch.org";
    assert.ok(SiteGenHelper.hasInventedContact("Email office@gracecommunity.org to sign up", known));
    assert.ok(SiteGenHelper.hasInventedContact("Register at www.gracepotluck.com today", known));
    assert.ok(SiteGenHelper.hasInventedContact("Call 555-987-6543", known));
    assert.ok(!SiteGenHelper.hasInventedContact("Write info@gracechurch.org or call (555) 123-4567.", known));
    assert.ok(!SiteGenHelper.hasInventedContact("Doors open at 5:30 PM on November 12, 2026 for about 150 people.", known));
    const copy = { details: { c1: "Bring a dish to share. Sign up by emailing office@gracecommunity.org. Kids are welcome." } };
    assert.equal(SiteGenHelper.stripInventedContacts(copy, known).details.c1, "Bring a dish to share. Kids are welcome.");
  });
});
