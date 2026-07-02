import { WebsiteHelper } from "../src/helpers/WebsiteHelper.js";
import { OpenAiHelper } from "../src/helpers/OpenAiHelper.js";

let failures = 0;
const assert = (cond: boolean, msg: string) => {
  if (cond) console.log("  PASS:", msg);
  else {
    console.error("  FAIL:", msg);
    failures++;
  }
};

const sampleSection = {
  zone: "main",
  background: "#2c5aa0",
  answersJSON: "{}",
  elements: [
    { id: "AAAAAAAAAAA", elementType: "text", sort: 0, answersJSON: JSON.stringify({ text: "<h1>Welcome</h1>" }) },
    {
      id: "BBBBBBBBBBB",
      elementType: "row",
      sort: 1,
      answersJSON: JSON.stringify({ columns: "6,6" }),
      elements: [
        { id: "CCCCCCCCCCC", elementType: "card", sort: 0, answersJSON: JSON.stringify({ title: "Old", text: "<p>Old copy</p>" }) },
        { id: "DDDDDDDDDDD", elementType: "map", sort: 1, answersJSON: JSON.stringify({ mapAddress: "123 Main" }) }
      ]
    }
  ]
};

const clone = (o: any) => JSON.parse(JSON.stringify(o));

async function run() {
  // --- rewriteSection: structure preserved ---
  console.log("rewriteSection: preserved structure");
  OpenAiHelper.executeWebsiteGeneration = (async () => {
    const good = clone(sampleSection);
    good.elements[0].answersJSON = JSON.stringify({ text: "<h1>Welcome home</h1>" });
    good.elements[1].elements[0].answersJSON = JSON.stringify({ title: "New warm title", text: "<p>New warm copy</p>" });
    return JSON.stringify(good);
  }) as any;
  let r = await WebsiteHelper.rewriteSection(clone(sampleSection), "warmer");
  assert(!r.fallback && !r.error, "no fallback on preserved structure");
  assert(r.section.elements[1].elements[0].answersJSON.includes("New warm title"), "rewritten copy present");
  assert(r.section.elements[1].elements[1].answersJSON.includes("123 Main"), "structural map answer unchanged");

  // --- rewriteSection: broken structure (dropped element) -> fallback to original ---
  console.log("rewriteSection: broken structure");
  OpenAiHelper.executeWebsiteGeneration = (async () => {
    const bad = clone(sampleSection);
    bad.elements[1].elements.pop(); // drop the map -> structure mismatch
    return JSON.stringify(bad);
  }) as any;
  r = await WebsiteHelper.rewriteSection(clone(sampleSection), "shorter");
  assert(r.fallback === true && !!r.error, "fallback flagged when element dropped");
  assert(r.section.elements[1].elements.length === 2, "original section returned intact on fallback");

  // --- rewriteSection: type change -> fallback ---
  console.log("rewriteSection: type change");
  OpenAiHelper.executeWebsiteGeneration = (async () => {
    const bad = clone(sampleSection);
    bad.elements[0].elementType = "textWithPhoto";
    return JSON.stringify(bad);
  }) as any;
  r = await WebsiteHelper.rewriteSection(clone(sampleSection));
  assert(r.fallback === true, "fallback flagged when elementType changed");

  // --- rewriteSection: non-JSON model output -> fallback ---
  console.log("rewriteSection: unparseable output");
  OpenAiHelper.executeWebsiteGeneration = (async () => "Sorry, I cannot do that.") as any;
  r = await WebsiteHelper.rewriteSection(clone(sampleSection));
  assert(r.fallback === true && !!r.error, "fallback flagged on parse failure");

  // --- generateAltText ---
  console.log("generateAltText");
  const urls = ["https://x/1.jpg", "https://x/2.jpg", "https://x/3.jpg"];
  OpenAiHelper.executeVision = (async () =>
    JSON.stringify([
      { url: urls[0], altText: "Photo of children laughing during kids ministry" },
      { url: urls[1], altText: "x".repeat(200) }
      // 3rd omitted on purpose
    ])) as any;
  const alts = await WebsiteHelper.generateAltText(urls, "Home page");
  assert(alts.length === 3, "one alt per input url");
  assert(!/^photo of/i.test(alts[0].altText), "strips 'Photo of' prefix");
  assert(alts[1].altText.length <= 125, "caps alt text at 125 chars");
  assert(alts[2].url === urls[2] && alts[2].altText === "", "missing entry yields empty alt but keeps url");

  // --- generateAltText caps at 20 urls ---
  const many = Array.from({ length: 25 }, (_v, i) => `https://x/${i}.jpg`);
  OpenAiHelper.executeVision = (async (_s: string, _t: string, passed: string[]) => {
    assert(passed.length === 20, "vision call receives at most 20 urls");
    return "[]";
  }) as any;
  const capped = await WebsiteHelper.generateAltText(many);
  assert(capped.length === 20, "returns at most 20 alt entries");

  // --- generateMetaDescription ---
  console.log("generateMetaDescription");
  OpenAiHelper.executeWebsiteGeneration = (async () =>
    JSON.stringify({ metaDescription: '"' + "Long description ".repeat(20) + '"' })) as any;
  const meta = await WebsiteHelper.generateMetaDescription("Home", "Some content", "Grace");
  assert(meta.metaDescription.length <= 155, "meta description capped at 155");
  assert(!/^["']|["']$/.test(meta.metaDescription), "meta description quotes stripped");

  // --- generateMetaDescription truncates long input (no throw) ---
  const longContent = "word ".repeat(5000);
  OpenAiHelper.executeWebsiteGeneration = (async (systemRole: string) => {
    assert(systemRole.length < 20000, "long page content truncated in prompt");
    return JSON.stringify({ metaDescription: "Ok" });
  }) as any;
  await WebsiteHelper.generateMetaDescription("Home", longContent, "Grace");

  // --- generateSite: outline call then per-section calls ---
  console.log("generateSite");
  const outline = {
    pages: [
      {
        title: "Home",
        url: "/",
        layout: "headerFooter",
        sections: [
          { id: "home-0", purpose: "hero", suggestedElements: ["text"] },
          { id: "home-1", purpose: "cta", suggestedElements: ["buttonLink"] }
        ]
      },
      {
        title: "About",
        url: "/about",
        layout: "headerFooter",
        sections: [{ id: "about-0", purpose: "identity", suggestedElements: ["text"] }]
      }
    ]
  };
  const sectionOut = {
    zone: "main",
    background: "#fff",
    answersJSON: "{}",
    elements: [{ elementType: "text", sort: 0, answersJSON: JSON.stringify({ text: "<h2>Hi</h2>" }) }]
  };
  OpenAiHelper.executeWebsiteGeneration = (async (systemRole: string) => {
    if (systemRole.includes("Site Plan Generation")) return JSON.stringify(outline);
    return JSON.stringify(sectionOut);
  }) as any;
  const pages = await WebsiteHelper.generateSite(
    { churchName: "Grace", description: "A friendly church for families" },
    ["text", "buttonLink", "row", "card"]
  );
  assert(pages.length === 2, "generateSite returns all planned pages");
  assert(pages[0].sections.length === 2 && pages[1].sections.length === 1, "each page filled with its sections");
  assert(Array.isArray(pages[0].sections[0].elements), "sections carry generated elements");
  assert(pages[0].url === "/" && pages[0].title === "Home", "page metadata passed through");

  // --- generateSite planOnly: outline stubs, zero section-generation calls ---
  console.log("generateSite planOnly");
  let sectionCalls = 0;
  OpenAiHelper.executeWebsiteGeneration = (async (systemRole: string) => {
    if (systemRole.includes("Site Plan Generation")) return JSON.stringify(outline);
    sectionCalls++;
    return JSON.stringify(sectionOut);
  }) as any;
  const plan = await WebsiteHelper.generateSite(
    { churchName: "Grace", description: "A friendly church for families" },
    ["text", "buttonLink"],
    true
  );
  assert(sectionCalls === 0, "planOnly makes zero section-generation calls");
  assert(plan.length === 2 && plan[0].title === "Home" && plan[0].url === "/", "planOnly returns all planned pages with metadata");
  assert(plan[0].sections.length === 2 && plan[1].sections.length === 1, "planOnly keeps per-page section counts");
  const stub = plan[0].sections[0];
  assert(stub.id === "home-0" && stub.purpose === "hero" && Array.isArray(stub.suggestedElements), "planOnly sections are outline stubs (id/purpose/suggestedElements)");
  assert(stub.elements === undefined && stub.answersJSON === undefined, "planOnly stubs carry no generated content");

  // --- generateSite: invalid outline throws ---
  OpenAiHelper.executeWebsiteGeneration = (async () => JSON.stringify({ pages: [] })) as any;
  let threw = false;
  try {
    await WebsiteHelper.generateSite({ description: "x".repeat(20) }, ["text"]);
  } catch {
    threw = true;
  }
  assert(threw, "generateSite rejects empty pages outline");

  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

run();
