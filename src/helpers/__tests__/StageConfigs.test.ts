import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

// The Lambda talks to the other ChurchApps APIs with the hosts in config/<stage>.json. Demo used to fall
// back to dev.json, whose hosts are localhost, so every people-search lookup (groups, attendance,
// donations) failed in demo and matched nobody. The legacy per-module hostnames redirect across hosts,
// which drops the Authorization header, so prod has to name the api.churchapps.org/<module> form too.
const modules = ["membership", "attendance", "content", "doing", "giving", "messaging", "reporting"];
const stages: { [file: string]: string } = {
  "demo.json": "https://api.demo.churchapps.org",
  "staging.json": "https://api.staging.churchapps.org",
  "prod.json": "https://api.churchapps.org"
};

describe("stage configs", () => {
  for (const [file, base] of Object.entries(stages)) {
    it(`${file} points every module host at ${base}/<module>`, () => {
      const config = JSON.parse(fs.readFileSync(path.resolve("config", file), "utf8"));
      for (const m of modules) {
        assert.equal(config[`${m}Api`], `${base}/${m}`, `${file} ${m}Api`);
      }
    });
  }
});
