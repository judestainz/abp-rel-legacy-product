# abp-rel-legacy-product

## Purpose

A throwaway demonstration product for the Autonomous Build Platform release demonstration (BC-M9-085): the product of
the LEGACY demo station, built before the station is upgraded to the collaboration release. It contains dummy content
only and will be archived or deleted after the demonstration. Everything here is public.

Since 2026-10-05 this product is built by the demonstration station `abp-rel-legacy3`: a new legacy station at platform
pin 0f3949bf that is upgraded, live, to the frozen collaboration release R3 (`bb392029`).

## Learning objectives

See how a pre-collaboration ABP station implements, reviews and publishes small changes to a product, and how the same
product continues after its station is upgraded.

## Contents

- `packages/product/greeting.mjs` — the first dummy product module.
- `packages/product/test/greeting.test.mjs` — its test.
- `packages/product/initials.mjs` — the second dummy product module, the initials helper.
- `packages/product/test/initials.test.mjs` — its test.
- `package.json` — the `npm test` script, whose glob picks up every test file in `packages/product/test/`.
- `.github/workflows/ci.yml` — the CI job `test`, run on every push to `master` and on every pull request.

## Public API

- `greeting(name)` returns the string `"Hello, <name>!"`.
- `initials(fullName)` returns the uppercase initials of `fullName`, one letter per whitespace-separated word.
- `initials(fullName, { separator })` returns those same letters joined by `separator`.

## Greeting module

The greeting module is the whole of this product's behaviour. It lives at `packages/product/greeting.mjs` and exports
one named function, `greeting`.

### How to call it

`greeting` is a named export of an ES module, so import it by name — this product has no CommonJS build and no default
export:

```js
import { greeting } from "./packages/product/greeting.mjs";

greeting("team");
```

The path above is relative to the product root. From a file inside `packages/product/` the import is
`./greeting.mjs`; from its test directory it is `../greeting.mjs`, which is how
`packages/product/test/greeting.test.mjs` reaches it.

### Parameter

| Parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `name` | `string` | yes | who to greet; interpolated into the greeting verbatim |

`name` is expected to be a string, and the module deliberately does not validate, trim or escape it — this is dummy
demonstration content, so it keeps the smallest body a station can build and review. Because the value is interpolated
with a template literal, any non-string argument is converted by JavaScript's usual string coercion rather than
rejected: `greeting(7)` returns `"Hello, 7!"`, and `greeting()` returns `"Hello, undefined!"`. Callers that need a
guarantee about the text must check their own input before calling.

### What it returns

A new `string`, always of the shape `"Hello, "` + `name` + `"!"` — the comma, the single space and the trailing
exclamation mark are part of the contract that `packages/product/test/greeting.test.mjs` asserts.

| Call | Return value |
| --- | --- |
| `greeting("team")` | `"Hello, team!"` |
| `greeting("Ada")` | `"Hello, Ada!"` |
| `greeting("")` | `"Hello, !"` |

The function is pure: it performs no I/O, keeps no state and never throws, so the same argument always yields the same
string and repeated calls are safe in any order.

### How to run the tests

Run the product's test suite from this repository's root — the directory holding this README and `package.json`:

```sh
npm test
```

Inside an ABP station checkout, where this repository is vendored at `product/`, that same run is
`cd product && npm test`, which is the validation command the station executes.

`npm test` runs `node --test "packages/product/test/*.test.mjs"`, Node's own built-in test runner, so there is nothing
to install first: the product declares no dependencies and needs no `npm install`. A passing run reports `# pass 1`
and `# fail 0` in TAP output and exits `0`; a failure exits non-zero and prints Node's assertion diff naming the
expected and actual greeting text. The same command is the `test` check that `.github/workflows/ci.yml` runs on every
push to `master` and on every pull request, so a green local run is the same evidence CI reports.

## Data or control flow

A caller passes a name to `greeting`, which returns the formatted string. A caller passes a full name — and optionally
an options object — to `initials`, which returns the initials string. Both functions are pure: there is no state and no
I/O, so the same arguments always produce the same answer.

## Usage examples

```js
import { greeting } from "./packages/product/greeting.mjs";
console.log(greeting("team")); // Hello, team!
```

See [Initials helper](#initials-helper) below for that module's calling forms.

## Initials helper

`initials` reduces a person's full name to their uppercase initials. It takes one letter per whitespace-separated word,
so leading, trailing and repeated spaces collapse away rather than becoming initials, and a name that holds no words —
`""` or whitespace only — yields `""`.

It has two calling forms, one example of each:

**One argument — the initials run together.** This is the original contract, and the separator defaults to the empty
string:

```js
import { initials } from "./packages/product/initials.mjs";
console.log(initials("ada lovelace")); // AL
```

**Two arguments — an options object chooses what goes between the letters.** `separator` is placed between adjacent
initials, and need be neither a single character nor punctuation:

```js
import { initials } from "./packages/product/initials.mjs";
console.log(initials("ada lovelace", { separator: "." })); // A.L
```

Because the default is the empty string, every way of declining the option agrees with the one-argument form:
`initials("ada lovelace", {})` and `initials("ada lovelace", { separator: undefined })` both return `"AL"`. And a
separator only ever fills the gaps *between* initials, so it cannot show up when there is nothing to separate:
`initials("ada", { separator: "." })` returns `"A"`, and `initials("   ", { separator: "." })` returns `""`.

## Testing

Run `npm test` from this product's root. It runs every file matching `packages/product/test/*.test.mjs` under
`node --test`, which covers both modules. The same command runs in CI as the `test` check.

## Error handling

Neither module validates its input; a test fails with node's assertion diff if the text a function returns changes.
`initials` needs no error path for an empty or whitespace-only name: no word survives its filter, so it returns `""`.

## Assumptions

Node.js 22 or newer. Dummy content only: never add real code, credentials or customer data.

## Extension guide

Add new functions beside `greeting` and `initials` in `packages/product/`, with a test in `packages/product/test/`; the
`npm test` glob picks the new test file up with no change to `package.json`. To extend an existing function, add a
property to its options object with a default that preserves today's answers — that is how `initials` gained its
`separator` without breaking a single existing caller. The station that builds this product publishes it to `master` as
snapshot commits.

## Related files

`package.json`, `.github/workflows/ci.yml`, `packages/product/greeting.mjs`, `packages/product/test/greeting.test.mjs`,
`packages/product/initials.mjs`, `packages/product/test/initials.test.mjs`.
