/**
 * Purpose: Reduce a person's full name to their uppercase initials, optionally joined by a caller-chosen separator — the second dummy product module of the ABP team-collaboration demonstration.
 * Learning objectives: See how a station adds a second pure function beside an existing one, with its own test, without touching the first; then see how an optional options argument extends that function without breaking a single existing caller.
 * Responsibilities: Derive the initials string from a name, joined by the requested separator; nothing else.
 * Key concepts: A pure function with no I/O, so its tests are deterministic; whitespace splitting that tolerates runs of spaces; a destructured options object with a default, which is how an optional parameter is added backwards-compatibly.
 * Algorithms: Split the name on runs of whitespace, drop empty parts, take each remaining part's first character, uppercase it, and join the characters with the separator.
 * Assumptions: The caller passes a string whose words are separated by whitespace; a name with no words yields the empty string rather than an error; when an options object is passed it is an object, and `separator` — when present — is a string.
 * Inputs and outputs: Takes a full-name string and an optional options object; returns the uppercase initials, for example "ada lovelace" returns "AL", "ada lovelace" with `{ separator: "." }` returns "A.L", and "   " returns "".
 * Error handling: None needed for whitespace-only or empty input — both return "" because no word survives the filter. Omitting the options argument, or passing one without `separator`, falls back to the empty separator, so the original one-argument contract is unchanged.
 * Complexity: O(n) in the length of the name.
 * Usage: `import { initials } from "./initials.mjs"; initials("ada lovelace")` returns `"AL"`, and `initials("ada lovelace", { separator: "." })` returns `"A.L"`.
 * Related files: ./test/initials.test.mjs, ./greeting.mjs, ../../README.md.
 */

/**
 * Derive a person's uppercase initials from their full name.
 *
 * Each whitespace-separated word contributes its first character, uppercased.
 * A name that contains no words — "" or whitespace only — yields "".
 *
 * The initials are joined by `options.separator`, which defaults to the empty
 * string. That default is what keeps every existing one-argument call — and
 * every assertion written against it — returning exactly what it did before:
 * `initials("ada lovelace")` is still `"AL"`.
 *
 * @param {string} fullName the full name to reduce, words separated by whitespace
 * @param {{ separator?: string }} [options] optional settings; `separator` is placed between adjacent initials and defaults to `""`
 * @returns {string} the uppercase initials, one character per word, joined by the separator, or "" when the name holds no words
 */
export function initials(fullName, { separator = "" } = {}) {
  // Splitting on a run of whitespace, then dropping the empties, means leading,
  // trailing and repeated spaces all collapse away instead of becoming initials.
  return fullName
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase())
    // join() puts the separator only BETWEEN elements, so a one-word name and a
    // name with no words carry no separator at all, whatever was requested.
    .join(separator);
}
