/**
 * Purpose: Prove the dummy farewell module's one behaviour.
 * Learning objectives: See the smallest product test the station's trusted validation and the product CI both run, and how a second test file joins the suite with no wiring beyond its name.
 * Responsibilities: Assert the exact farewell text, including for the boundary input the empty string, and that repeated calls stay identical.
 * Key concepts: node:test with strict assertions; no fixtures and no I/O. A pure function has no failure mode to test, so the normal case, the empty-name boundary and replay stability are what there is to assert.
 * Algorithms: Equality assertions over a pure function.
 * Assumptions: Runs under Node.js 22 or newer. The package test script globs packages/product/test/*.test.mjs, so this file is picked up by its name alone.
 * Inputs and outputs: No inputs; reports pass or fail through node:test.
 * Error handling: A mismatch fails the test with node's assertion diff.
 * Complexity: O(1).
 * Usage: `npm test` from the product root.
 * Related files: ../farewell.mjs, ./greeting.test.mjs, ../../../package.json, ../../../.github/workflows/ci.yml.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { farewell } from "../farewell.mjs";

test("farewell names the person", () => {
  assert.equal(farewell("team"), "Goodbye, team!");
});

test("farewell still formats when the name is empty", () => {
  // The boundary input: the module validates nothing, so an empty name must
  // simply interpolate to nothing rather than change the surrounding text.
  assert.equal(farewell(""), "Goodbye, !");
});

test("farewell returns the same string every call", () => {
  // The function is pure, so calling it twice is the replay case: no state
  // accumulates between calls and the second result matches the first.
  assert.equal(farewell("team"), farewell("team"));
});
