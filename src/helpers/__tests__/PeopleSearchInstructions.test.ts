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
