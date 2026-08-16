import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { DataHelper } from "../DataHelper.js";
import { Environment } from "../Environment.js";

const prodHosts = {
  membershipApi: "https://membershipapi.churchapps.org",
  attendanceApi: "https://attendanceapi.churchapps.org",
  contentApi: "https://contentapi.churchapps.org",
  doingApi: "https://doingapi.churchapps.org",
  givingApi: "https://givingapi.churchapps.org",
  messagingApi: "https://messagingapi.churchapps.org",
  reportingApi: "https://reportingapi.churchapps.org"
};

const applyHosts = (hosts: Partial<typeof prodHosts>) => {
  Environment.membershipApi = hosts.membershipApi as string;
  Environment.attendanceApi = hosts.attendanceApi as string;
  Environment.contentApi = hosts.contentApi as string;
  Environment.doingApi = hosts.doingApi as string;
  Environment.givingApi = hosts.givingApi as string;
  Environment.messagingApi = hosts.messagingApi as string;
  Environment.reportingApi = hosts.reportingApi as string;
};

describe("executeApiCalls hosts", () => {
  beforeEach(() => {
    Environment.appEnv = "prod";
    applyHosts(prodHosts);
  });

  it("does not use staging hosts when env is prod", async () => {
    const seen: string[] = [];
    const original = DataHelper.executeSingleApiCall;
    DataHelper.executeSingleApiCall = async (_apiCall: any, _jwts: any, baseUrls: { [key: string]: string }) => {
      seen.push(...Object.values(baseUrls));
      return { success: true, data: [] };
    };
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
    process.env.CONNECTION_STRING = "mysql://x";
    process.env.ENCRYPTION_KEY = "x";
    process.env.JWT_SECRET = "x";
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
