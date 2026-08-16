import { describe, it, before, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

mock.module("@churchapps/apihelper", {
  namedExports: {
    AwsHelper: { readParameter: async () => "" },
    EnvironmentBase: class EnvironmentBase {
      static appEnv = "";
      static async initBase(environment: string) {
        const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "config", `${environment}.json`), "utf8"));
        EnvironmentBase.appEnv = data.appEnv;
        return data;
      }
    }
  }
});

const { DataHelper } = await import("../DataHelper.js");
const { Environment } = await import("../Environment.js");

const applyHosts = (hosts: Record<string, string>) => {
  Environment.membershipApi = hosts.membershipApi;
  Environment.attendanceApi = hosts.attendanceApi;
  Environment.contentApi = hosts.contentApi;
  Environment.doingApi = hosts.doingApi;
  Environment.givingApi = hosts.givingApi;
  Environment.messagingApi = hosts.messagingApi;
  Environment.reportingApi = hosts.reportingApi;
};

describe("executeApiCalls hosts", () => {
  let prodHosts: Record<string, string>;

  before(() => {
    prodHosts = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "config/prod.json"), "utf8"));
  });

  beforeEach(() => {
    Environment.appEnv = "prod";
    applyHosts(prodHosts);
  });

  it("does not use staging hosts when env is prod", async () => {
    const seen: string[] = [];
    const original = DataHelper.executeSingleApiCall;
    DataHelper.executeSingleApiCall = (async (_apiCall: any, _jwts: any, baseUrls: { [key: string]: string }) => {
      seen.push(...Object.values(baseUrls));
      return { success: true, data: [] };
    }) as typeof DataHelper.executeSingleApiCall;
    try {
      await DataHelper.executeApiCalls([{ apiName: "membershipapi", method: "GET", path: "/people" }], { membershipapi: "t" }, "json");
    } finally {
      DataHelper.executeSingleApiCall = original;
    }
    assert.ok(seen.length > 0);
    for (const url of seen) {
      assert.equal(url.includes(".staging.churchapps.org"), false);
      assert.match(url, /^https:\/\/[a-z]+api\.churchapps\.org$/);
    }
  });

  it("fails closed when a host is unset", async () => {
    Environment.attendanceApi = "";
    await assert.rejects(() => DataHelper.executeApiCalls([], {}, "json"), /API host not configured: attendanceapi/);
  });
});

describe("Environment hosts", () => {
  it("fails closed when APP_ENV is missing", async () => {
    await assert.rejects(() => Environment.init(""), /APP_ENV is required/);
  });

  it("prod init does not configure staging hosts", async () => {
    process.env.OPENAI_API_KEY = "x";
    process.env.OPENROUTER_API_KEY = "x";
    await Environment.init("prod");
    const hosts = Environment.apiHosts();
    for (const url of Object.values(hosts)) {
      assert.equal(url.includes(".staging.churchapps.org"), false);
      assert.match(url, /^https:\/\/[a-z]+api\.churchapps\.org$/);
    }
  });
});
