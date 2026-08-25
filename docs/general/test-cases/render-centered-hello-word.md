# Test Cases — Render centered hello word

Risk level: low. Single read-only screen, but it spans frontend, API, and DB, so cases cover exact display, contract shape, and failure responses.

## Cases

### Scenario: Show stored greeting centered on screen
**Given** PostgreSQL has the module row with `greeting_text = "Hello Word"`, backend API is reachable, and guest opens main page
**When** page loads
**Then** visible text is exactly `Hello Word`, centered horizontally and vertically on white background with black text, with no extra copy or controls
**Traceability**: GENERAL-001, AC-1, AC-3, AC-4
**Check**: `render_url` and `measure_styles`

### Scenario: Render exact stored greeting with no fallback text
**Given** PostgreSQL row used by this module stores a greeting value different from `Hello Word`, backend API is reachable, and guest opens main page
**When** page loads
**Then** page displays that exact stored value and does not display any hardcoded fallback or alternate greeting
**Traceability**: GENERAL-001, AC-2
**Check**: `render_url`

### Scenario: Paint white background and black text
**Given** backend API is reachable and guest opens main page
**When** page loads
**Then** browser-computed background color is white and browser-computed text color is black
**Traceability**: GENERAL-001, AC-3
**Check**: `measure_styles`

### Scenario: No animation or extra content on loaded page
**Given** backend API is reachable and guest opens main page
**When** page loads and remains on screen during observation
**Then** no animation starts and no extra content appears beyond single greeting text
**Traceability**: GENERAL-001, AC-4
**Check**: `measure_styles`

### Scenario: GET `/v1/greeting` returns stored greeting
**Given** backend has the module greeting row in PostgreSQL
**When** guest sends `GET /v1/greeting`
**Then** response is `200 application/json` with body `{ "greeting_text": "Hello Word" }` or the exact stored value in that row
**Traceability**: services.md GET `/v1/greeting` success shape, GENERAL-001
**Check**: `fetch_url`

### Scenario: GET `/v1/greeting` returns `404` when greeting row is missing
**Given** required greeting row is absent from PostgreSQL
**When** guest sends `GET /v1/greeting`
**Then** response is `404 application/json` with error envelope `{ "error": { "code": "greeting_not_found", "message": "..." } }`
**Traceability**: services.md GET `/v1/greeting` error contract
**Check**: `fetch_url`

### Scenario: GET `/v1/greeting` returns `500` when database query fails
**Given** database query for greeting fails
**When** guest sends `GET /v1/greeting`
**Then** response is `500 application/json` with error envelope `{ "error": { "code": "internal_error", "message": "..." } }`
**Traceability**: services.md GET `/v1/greeting` error contract
**Check**: `fetch_url`

### Scenario: GET `/healthz` returns ready text
**Given** app runtime is healthy and database probe passes
**When** guest sends `GET /healthz`
**Then** response is `200 text/plain` with body `ok`
**Traceability**: services.md GET `/healthz` success shape
**Check**: `fetch_url`

### Scenario: GET `/healthz` fails when migrations or `SELECT 1` fail
**Given** migrations failed or `SELECT 1` fails
**When** guest sends `GET /healthz`
**Then** response is non-200
**Traceability**: services.md GET `/healthz` failure behavior
**Check**: `fetch_url`

## Coverage count
- Acceptance criteria covered: 4 of 4
- Service contract cases covered: 5
- Manual-only cases: 0
