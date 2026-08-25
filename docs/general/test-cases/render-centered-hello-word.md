# Test Cases — Render centered hello word

Risk level: low. Single public page, one data flow, no auth, no writes.

## Scenario 1: Show stored greeting centered on screen
**Given** PostgreSQL has single row for module with greeting_text `Hello Word`, backend API is up, and guest opens page
**When** page loads
**Then** visible text is `Hello Word` and it sits centered horizontally and vertically on screen
**Check:** render_url
**Traceability:** GENERAL-001, AC-1

## Scenario 2: Display exact stored value, no fallback
**Given** PostgreSQL row for module stores greeting_text `Hello Word` and backend API returns that row
**When** guest opens page
**Then** page displays exactly `Hello Word` and does not display any alternate greeting or hardcoded fallback text
**Check:** render_url
**Traceability:** GENERAL-001, AC-2

## Scenario 3: White background, black text
**Given** page loads successfully
**When** guest views page
**Then** computed background color is `#FFFFFF` and computed text color is `#000000`
**Check:** measure_styles
**Traceability:** GENERAL-001, AC-3

## Scenario 4: No animation or extra content
**Given** page loads successfully
**When** guest views page
**Then** no animation runs and no extra copy, controls, or decoration appear
**Check:** measure_styles
**Traceability:** GENERAL-001, AC-4

## Scenario 5: Guest open access
**Given** guest has no signed-in session
**When** guest opens page
**Then** page loads and greeting is visible; no login prompt or denial appears
**Check:** render_url
**Traceability:** GENERAL-001, Actors
