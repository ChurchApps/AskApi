import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  groupNameOf,
  isExcludeCall,
  lookupIdFilter,
  mergeLookupFilters,
  personIdsOf,
  resolveGroupCall
} from "../PeopleSearchLookups.js";

describe("personIdsOf", () => {
  it("collects each personId once and drops blanks", () => {
    const rows = [{ personId: "a" }, { personId: "b" }, { personId: "a" }, { personId: null }, { personId: "" }, { id: "x" }];
    assert.deepEqual(personIdsOf(rows), ["a", "b"]);
  });
});

describe("lookupIdFilter", () => {
  it("narrows to the people a lookup found with one `in` condition", () => {
    assert.deepEqual(lookupIdFilter(["a", "b"], false), { field: "id", operator: "in", value: "a,b" });
  });

  it("matches nobody when an inclusive lookup found no one", () => {
    assert.deepEqual(lookupIdFilter([], false), { field: "id", operator: "in", value: "" });
  });

  it("matches nobody when the lookup itself failed, whichever way the question went", () => {
    assert.deepEqual(lookupIdFilter(null, false), { field: "id", operator: "in", value: "" });
    assert.deepEqual(lookupIdFilter(null, true), { field: "id", operator: "in", value: "" });
  });

  it("excludes the people a negative lookup found with one `notIn` condition", () => {
    assert.deepEqual(lookupIdFilter(["a", "b"], true), { field: "id", operator: "notIn", value: "a,b" });
  });

  it("excludes nobody when a negative lookup found no one", () => {
    assert.equal(lookupIdFilter([], true), null);
  });
});

describe("mergeLookupFilters", () => {
  it("keeps the model's filters and adds one id condition per lookup so lookups AND together", () => {
    const merged = mergeLookupFilters(
      [{ field: "gender", operator: "equals", value: "Female" }],
      [
        { exclude: false, personIds: ["a", "b", "c"] },
        { exclude: true, personIds: ["c"] },
        { exclude: true, personIds: [] }
      ]
    );
    assert.deepEqual(merged, [
      { field: "gender", operator: "equals", value: "Female" },
      { field: "id", operator: "in", value: "a,b,c" },
      { field: "id", operator: "notIn", value: "c" }
    ]);
  });
});

describe("isExcludeCall", () => {
  it("reads the exclude flag the prompt asks for", () => {
    assert.equal(isExcludeCall({ exclude: true }), true);
    assert.equal(isExcludeCall({ exclude: "true" }), true);
    assert.equal(isExcludeCall({ exclude: false }), false);
    assert.equal(isExcludeCall({}), false);
  });
});

describe("groupNameOf", () => {
  it("reads the group name off a /groupmembers call that has no groupId yet", () => {
    assert.equal(groupNameOf({ path: "/groupmembers?groupName=Test%20Ministry" }), "Test Ministry");
    assert.equal(groupNameOf({ path: "/groupmembers", groupName: "Test Ministry" }), "Test Ministry");
  });

  it("leaves resolved and unrelated calls alone", () => {
    assert.equal(groupNameOf({ path: "/groupmembers?groupId=abc" }), null);
    assert.equal(groupNameOf({ path: "/funddonations/basic?startDate=2026-01-01&endDate=2026-02-01" }), null);
    assert.equal(groupNameOf({ path: "/groupmembers" }), null);
  });
});

describe("resolveGroupCall", () => {
  const groups = [{ id: "g1", name: "Test Ministry" }, { id: "g2", name: "Youth" }, { id: "g3", name: "Youth Leaders" }];

  it("rewrites the call to the matching group's id, ignoring case", () => {
    const call = { apiName: "MembershipApi", method: "GET", path: "/groupmembers?groupName=test%20ministry", exclude: false };
    assert.deepEqual(resolveGroupCall(call, groups), { apiName: "MembershipApi", method: "GET", path: "/groupmembers?groupId=g1", exclude: false });
  });

  it("prefers an exact name over a partial one", () => {
    assert.equal(resolveGroupCall({ path: "/groupmembers", groupName: "youth" }, groups)?.path, "/groupmembers?groupId=g2");
  });

  it("falls back to the only group whose name contains the words", () => {
    assert.equal(resolveGroupCall({ path: "/groupmembers", groupName: "leaders" }, groups)?.path, "/groupmembers?groupId=g3");
  });

  it("gives up when no group matches or several partial ones do", () => {
    assert.equal(resolveGroupCall({ path: "/groupmembers", groupName: "Choir" }, groups), null);
    assert.equal(resolveGroupCall({ path: "/groupmembers", groupName: "you" }, groups), null);
  });
});
