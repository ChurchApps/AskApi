import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { InstructionsHelper } from "../InstructionsHelper.js";
import { normalizePeopleSearchFilters } from "../PeopleSearchFilters.js";

const prompts = [
  InstructionsHelper.getPeopleAdvancedSearchInstructions("Show me everyone without an email address"),
  InstructionsHelper.getPeopleAdvancedSearchWithApiCallsInstructions("Show me everyone without an email address")
];

describe("people search instructions", () => {
  it("tells the model that a missing email is an empty equals match", () => {
    for (const prompt of prompts) {
      assert.match(prompt, /\{"field":"email","value":"","operator":"equals"\}/);
      assert.match(prompt, /Show me everyone without an email address/);
      assert.doesNotMatch(prompt, /notEquals/);
      assert.match(prompt, /notEqual/);
    }
  });
});

describe("people search with api calls instructions", () => {
  const prompt = InstructionsHelper.getPeopleAdvancedSearchWithApiCallsInstructions("people in Test Ministry group");

  it("no longer offers person fields the search cannot evaluate", () => {
    for (const p of prompts) {
      assert.doesNotMatch(p, /\*\*groupMember\*\*/);
      assert.doesNotMatch(p, /\*\*memberAttendance\*\*/);
    }
  });

  it("teaches the attendance and group lookups", () => {
    assert.match(prompt, /\/attendancerecords\/search\?startDate=/);
    assert.match(prompt, /\/groupmembers\?groupName=/);
    assert.match(prompt, /"exclude": ?true/);
  });

  it("asks for either-status questions as one `in` condition", () => {
    assert.match(prompt, /\{"field":"membershipStatus","value":"Member,Regular Attendee","operator":"in"\}/);
  });
});

describe("normalizePeopleSearchFilters", () => {
  it("renames the old notEquals operator and leaves other filters alone", () => {
    const filters = normalizePeopleSearchFilters([
      { field: "email", value: "", operator: "equals" },
      { field: "membershipStatus", value: "Member", operator: "notEquals" }
    ]);
    assert.deepEqual(filters, [
      { field: "email", value: "", operator: "equals" },
      { field: "membershipStatus", value: "Member", operator: "notEqual" }
    ]);
  });
});
