import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import {
  executionToken,
  MAX_API_CALLS,
  selectApiCalls,
  sessionToken,
  validateApiCall
} from "./ApiCallGuard.js";

mock.module("@churchapps/apihelper", {
  namedExports: {
    AwsHelper: { readParameter: async () => "" },
    EnvironmentBase: class EnvironmentBase {
      static appEnv = "";
      static async initBase() { return {}; }
    }
  }
});

const { DataHelper } = await import("./DataHelper.js");
const { Environment } = await import("./Environment.js");

const baseUrls = { membershipapi: "https://example.invalid" };

const applyExampleHosts = () => {
  Environment.membershipApi = "https://example.invalid";
  Environment.attendanceApi = "https://example.invalid";
  Environment.contentApi = "https://example.invalid";
  Environment.doingApi = "https://example.invalid";
  Environment.givingApi = "https://example.invalid";
  Environment.messagingApi = "https://example.invalid";
  Environment.reportingApi = "https://example.invalid";
};

describe("ApiCallGuard", () => {
  it("rejects POST", () => {
    const check = validateApiCall({ apiName: "membershipapi", method: "POST", path: "/people" });
    assert.equal(check.ok, false);
    assert.match(check.error, /Method not allowed/i);
  });

  it("rejects an unknown path", () => {
    const check = validateApiCall({ apiName: "membershipapi", method: "GET", path: "/users/login" });
    assert.equal(check.ok, false);
    assert.match(check.error, /Path not allowed/i);
  });

  it("ignores body jwts and uses au.jwt only", () => {
    assert.equal(sessionToken({ jwt: "au-jwt" }, { jwts: { membershipapi: "stolen-jwt" } }), "au-jwt");
    assert.equal(executionToken({ membershipapi: "stolen-jwt", givingapi: "stolen-jwt" }), "");
  });

  it("allows GET people-search donation paths", () => {
    const check = validateApiCall({ apiName: "GivingApi", method: "GET", path: "/funddonations/basic?fundName=missions" });
    assert.equal(check.ok, true);
  });

  it("rejects path traversal and absolute URLs", () => {
    assert.equal(validateApiCall({ apiName: "membershipapi", method: "GET", path: "/people/../users/login" }).ok, false);
    assert.equal(validateApiCall({ apiName: "membershipapi", method: "GET", path: "https://evil.example/people" }).ok, false);
    assert.equal(validateApiCall({ apiName: "membershipapi", method: "GET", path: "/people%2f%2e%2e%2fusers" }).ok, false);
  });

  it("caps call count and drops writes", () => {
    const calls = [
      { apiName: "membershipapi", method: "POST", path: "/people" },
      ...Array.from({ length: MAX_API_CALLS + 3 }, () => ({ apiName: "membershipapi", method: "GET", path: "/people" }))
    ];
    assert.equal(selectApiCalls(calls).length, MAX_API_CALLS);
  });
});

describe("DataHelper execution guard", () => {
  it("does not execute POST", async () => {
    const result = await DataHelper.executeSingleApiCall({ apiName: "membershipapi", method: "POST", path: "/people" }, "session-jwt", baseUrls);
    assert.equal(result.success, false);
    assert.match(result.error, /Method not allowed/i);
  });

  it("does not execute an unknown path", async () => {
    const result = await DataHelper.executeSingleApiCall({ apiName: "membershipapi", method: "GET", path: "/users/login" }, "session-jwt", baseUrls);
    assert.equal(result.success, false);
    assert.match(result.error, /Path not allowed/i);
  });

  it("does not use a client jwts object as the bearer token", async () => {
    const result = await DataHelper.executeSingleApiCall({ apiName: "membershipapi", method: "GET", path: "/people" }, { membershipapi: "stolen-jwt" }, baseUrls);
    assert.equal(result.success, false);
    assert.match(result.error, /No token/i);
  });

  it("skips POST calls in a batch", async () => {
    applyExampleHosts();
    const results = await DataHelper.executeApiCalls([{ apiName: "membershipapi", method: "POST", path: "/people" }], "session-jwt", "json");
    assert.deepEqual(results, []);
  });
});
