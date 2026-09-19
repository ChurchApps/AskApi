import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

mock.module("@churchapps/apihelper", { namedExports: { AwsHelper: { readParameter: async () => "" }, EnvironmentBase: class EnvironmentBase {} } });

const { SiteGenHelper, SECTIONS } = await import("../SiteGenHelper.js");

const BUILDER_TYPES = new Set([
  "text", "row", "column", "card", "faq", "iconFeature", "table", "testimonial", "textWithPhoto", "box", "map", "sermons"
]);

const fillCopy = (layout: string[]) => Object.fromEntries(layout.map((k) => [k, Object.fromEntries(Object.keys(SECTIONS[k].slots).map((n) => [n, n === "rows" ? "Sunday | 9am\nWednesday | 6pm" : `It's <${n}>`]))]));

describe("SiteGenHelper", () => {
  it("builds a valid builder tree for every template", () => {
    const layout = Object.keys(SECTIONS);
    const church = { name: "Test Church", brief: "A church.", address: "1 Main St" };
    const sections = SiteGenHelper.buildTree(church, layout, fillCopy(layout), { heroPhoto: "/tempLibrary/building.jpg", welcomePhoto: "/tempLibrary/bible.jpg" });
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

    const all = JSON.stringify(sections);
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
});
