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
    const sections = SiteGenHelper.buildTree(church, layout, fillCopy(layout), { heroPhoto: "church exterior", welcomePhoto: "open bible", heroDivider: "wave" });
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
    const legacy = SiteGenHelper.buildTree({ ...church, resolvesPhotos: false }, layout, fillCopy(layout), { heroPhoto: "church exterior" });
    assert.ok(!JSON.stringify(legacy).includes("pexels:"), "clients that cannot resolve photos must never see a placeholder");
    assert.equal(JSON.parse(sections[0].answersJSON).dividerBottom.shape, "wave");
    const all = JSON.stringify(sections);
    assert.ok(!all.includes("tempLibrary/pastor"), "no stock portrait may stand in for the pastor");
    assert.ok(!all.includes("<headline>"), "copy must be HTML-escaped");
    assert.ok(all.includes("It&rsquo;s &lt;headline&gt;"));
  });

  it("alternates plain section backgrounds", () => {
    const layout = ["heroPhoto", "welcome", "expect", "faq"];
    const sections = SiteGenHelper.buildTree({ name: "T", brief: "b" }, layout, fillCopy(layout), {});
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
    const types = (church: any) => JSON.stringify(SiteGenHelper.buildTree(church, layout, fillCopy(layout), {}));
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
    const build = (date: string) => JSON.stringify(SiteGenHelper.buildTree({ name: "T", brief: "b" }, ["eventCountdown"], { eventCountdown: { title: "Potluck", date } }, {}));
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

  it("adds photos beyond the hero, but only offers the gallery to clients that can resolve photos", () => {
    const church = { name: "T", brief: "b", resolvesPhotos: true };
    assert.ok(SiteGenHelper.available("mid", church).includes("gallery"));
    assert.ok(!SiteGenHelper.available("mid", { name: "T", brief: "b" }).includes("gallery"));
    const layout = ["heroPhoto", "gallery", "invite", "visitCta"];
    const visuals = { heroPhoto: "church exterior", galleryPhoto1: "open bible", galleryPhoto2: "choir singing", galleryPhoto3: "hands praying", invitePhoto: "friends talking coffee", ctaPhoto: "sunrise field" };
    const sections = SiteGenHelper.buildTree(church, layout, fillCopy(layout), visuals);
    assert.equal(JSON.parse(sections[1].elements[1].answersJSON).photos.length, 3);
    assert.equal(sections[3].background, "pexels:sunrise field");
    assert.equal(new Set(JSON.stringify(sections).match(/pexels:[a-z ]+/g)).size, 6);
  });
});
