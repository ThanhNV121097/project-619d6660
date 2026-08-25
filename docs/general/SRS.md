# SRS — general

Module: `general`
Last updated: 2026-02-14
Design: [View the approved design](http://localhost:8080/design/619d6660-81be-4dc7-a2f1-8ff1766d8803)
Design system: `design/design-system.md`

## 1. Purpose

This module serves the single public page for hello-word-19. It shows the stored greeting centered on a plain white screen, proving the backend, API, and PostgreSQL path work end to end. If it does not exist, the product is just a blank shell with no visible proof that the pipeline works.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Guest | Any visitor without a signed-in session | Open the page and read the greeting |

## 3. Scope

**In scope** — the functions specified below, by their plan titles:

- Render centered hello word

**Out of scope** —

- Any admin, edit, delete, or login flow — not part of hello-word-19.
- Any second screen, navigation, animation, palette, or content variation — deliberately not built because brief forbids it.

## 4. Functional requirements

### 4.1 Render centered hello word

**Requirement GENERAL-001 — Show stored greeting**

*As a* Guest, *I want to* see the greeting stored in PostgreSQL through the backend API, *so that* the page proves data flows from database to screen.

Behaviour:

1. Guest opens the page.
2. Backend reads the single stored greeting value.
3. Page displays that value centered horizontally and vertically on white background with black text.
4. Page does not add any extra copy, controls, animation, or decoration.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/general/test-cases/render-centered-hello-word.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | Stored greeting value is `Hello Word` | Guest opens page | Page shows `Hello Word` centered on screen |
| AC-2 | Stored greeting value is any other text | Guest opens page | Page shows that exact stored text, not a hardcoded fallback |
| AC-3 | Page loads successfully | Guest views page | Background is white and text is black |
| AC-4 | Page loads successfully | Guest views page | No animation or extra content appears |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| Permission | Guest has no signed-in session | Not applicable: this module is public and has no permission rule beyond open access |
| Boundary | Stored greeting is empty or missing | Not applicable: brief defines one stored row with one displayed greeting; empty-state UI is not part of approved design |
| Upstream failure | API or database is unavailable | Not applicable in approved design: no error or loading state is shown; contract failure handling belongs in service design |

**Data touched**

| Field | Type | Required | Rule |
|---|---|---|---|
| greeting_text | text | yes | Single stored value shown verbatim on the page |

## 5. Screens

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Main page | Main | GENERAL-001 | default |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Accessibility | Greeting text contrast is 21:1 against white background |
| Responsive | Centered layout works at 320px width and up with no horizontal scroll |
| Performance | Initial page render completes within 2 seconds |

## 7. Dependencies and assumptions

- **Depends on:** backend API, for reading the stored greeting.
- **Depends on:** PostgreSQL, for storing the single greeting row.
- **Assumption:** one greeting row exists at runtime; if not, the product has no approved empty state.

| Open question | Proposed default | Who decides |
|---|---|---|
| What exact empty-state or error behavior should exist if DB/API fails? | None; keep approved one-state design and let service contract define failure handling | Stakeholder / TL |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Render centered hello word | GENERAL-001 | `test-cases/render-centered-hello-word.md` |
