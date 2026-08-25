# Story — Render centered hello word

## User story
As a Guest, I want to see the greeting stored in PostgreSQL through the backend API, so that the page proves data flows from database to screen.

## In scope
- Public main page for `hello-word-19`.
- Read single stored greeting value from backend API.
- Render that value centered horizontally and vertically on plain white background with black text.
- Use the approved design system and architecture constraints for the one-screen proof app.

## Out of scope
- Any admin, edit, delete, login, or permission flow.
- Any second screen, navigation, palette, animation, decoration, or extra copy.
- Any content beyond the single stored greeting.
- Any hardcoded frontend fallback greeting.

## UI scope
- Main page only.
- One static centered message state on desktop and mobile.
- No loading, empty, error, hover, focus, or interactive states beyond the plain static display.

## Acceptance criteria
1. Given stored greeting value is `Hello Word`, when Guest opens page, then page shows `Hello Word` centered on screen.
2. Given greeting value exists in PostgreSQL row used by this module, when Guest opens page, then page shows that exact stored value and no hardcoded fallback or alternate greeting.
3. Given page loads successfully, when Guest views page, then background is white and text is black.
4. Given page loads successfully, when Guest views page, then no animation or extra content appears.

## Dependencies
- Backend API for reading stored greeting.
- PostgreSQL row containing the single greeting value.
- Approved design and design system for the plain centered layout.

## Notes
- This story maps to `GENERAL-001` in `docs/general/SRS.md`.
