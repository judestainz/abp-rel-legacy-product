/**
 * Purpose: Return a friendly farewell for a name — the parting counterpart to the dummy greeting module of the ABP team-collaboration demonstration.
 * Learning objectives: See how a second module is added beside an existing one without disturbing it, so a station can demonstrate incremental product growth.
 * Responsibilities: Format one farewell string; nothing else.
 * Key concepts: A pure function with no I/O, so its tests are deterministic; it mirrors greeting.mjs exactly so the two read as one family.
 * Algorithms: String interpolation.
 * Assumptions: The caller passes a string; this demo module does not validate or trim input.
 * Inputs and outputs: Takes a name string; returns "Goodbye, <name>!".
 * Error handling: None needed; any value is interpolated as JavaScript converts it to a string.
 * Complexity: O(n) in the length of the name.
 * Usage: `import { farewell } from "./farewell.mjs"; farewell("team")` returns `"Goodbye, team!"`.
 * Related files: ./test/farewell.test.mjs, ./greeting.mjs, ../../README.md.
 */

/**
 * Bid a person farewell by name.
 *
 * @param {string} name who to bid farewell
 * @returns {string} the farewell, "Goodbye, <name>!"
 */
export function farewell(name) {
  return `Goodbye, ${name}!`;
}
