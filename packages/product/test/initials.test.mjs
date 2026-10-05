/**
 * Purpose: Prove the dummy initials module's behaviour on a normal name, on the whitespace-only boundary, and on the optional separator added by BC-LG3-M1-004.
 * Learning objectives: See how a second product test is added beside the first and picked up by the same `npm test` glob, and how an optional parameter is tested — its default, its effect, and the boundaries where it cannot show up at all.
 * Responsibilities: Assert the exact initials string for a normal name, for boundary names that hold no words, for each form of the separator option, and for a repeated call.
 * Key concepts: node:test with strict assertions; no fixtures and no I/O; an optional-argument default proven by keeping the pre-existing assertions untouched.
 * Algorithms: Equality assertions over a pure function.
 * Assumptions: Runs under Node.js 22 or newer.
 * Inputs and outputs: No inputs; reports pass or fail through node:test.
 * Error handling: A mismatch fails the test with node's assertion diff.
 * Complexity: O(1).
 * Usage: `npm test` from the product root.
 * Related files: ../initials.mjs, ../../../package.json, ../../../.github/workflows/ci.yml.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { initials } from "../initials.mjs";

test("initials takes one uppercase letter per word", () => {
  assert.equal(initials("ada lovelace"), "AL");
});

test("initials of a name with no words is empty", () => {
  // The whitespace-only case named by the acceptance criterion, plus the empty
  // string, which reaches the same filter by a different route.
  assert.equal(initials("   "), "");
  assert.equal(initials(""), "");
});

test("initials ignores leading, trailing and repeated whitespace", () => {
  assert.equal(initials("  grace   brewster   hopper  "), "GBH");
});

test("initials is pure, so repeated calls return the same string", () => {
  // The function holds no state, so calling it twice on one input must agree:
  // a cheap guard against a future edit introducing a cache or a mutation.
  const name = "ada lovelace";
  assert.equal(initials(name), initials(name));
  assert.equal(name, "ada lovelace");
});

test("initials joins the letters with the requested separator", () => {
  // The criterion this task exists for: a separator lands between the initials.
  assert.equal(initials("ada lovelace", { separator: "." }), "A.L");
  assert.equal(initials("  grace   brewster   hopper  ", { separator: "." }), "G.B.H");
  // A separator need not be one character, and need not be punctuation.
  assert.equal(initials("ada lovelace", { separator: " - " }), "A - L");
});

test("initials falls back to no separator when none is requested", () => {
  // The three ways a caller can decline the option all have to agree with the
  // original one-argument contract, or an existing caller would break.
  assert.equal(initials("ada lovelace"), "AL");
  assert.equal(initials("ada lovelace", {}), "AL");
  assert.equal(initials("ada lovelace", { separator: undefined }), "AL");
  assert.equal(initials("ada lovelace", { separator: "" }), "AL");
});

test("a separator cannot appear when there is nothing to separate", () => {
  // join() only fills the gaps BETWEEN initials, so a single word has no gap
  // and a name with no words has no initials — the boundary where the option
  // is accepted but can have no visible effect.
  assert.equal(initials("ada", { separator: "." }), "A");
  assert.equal(initials("   ", { separator: "." }), "");
  assert.equal(initials("", { separator: "." }), "");
});

test("initials leaves the options object it was handed untouched", () => {
  // Replaying the same call with the same object must give the same answer and
  // leave the caller's object exactly as it was: the function reads the option,
  // it never writes to it, so a caller may reuse one options object forever.
  const options = { separator: "." };
  assert.equal(initials("ada lovelace", options), "A.L");
  assert.equal(initials("ada lovelace", options), "A.L");
  assert.deepEqual(options, { separator: "." });
});
