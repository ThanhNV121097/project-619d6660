# Service Design

Base path: `/v1`. Do not include `/api`; deployment proxy strips it before backend.

## Error envelope

All non-2xx API responses use:

```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

Rules:

- `code` is stable machine-readable snake case.
- `message` is safe for guests and contains no internals.
- Backend logs detailed internal errors.

## Endpoints

### `GET /healthz`

Readiness probe for runtime and compose.

Request: none.

Response `200 text/plain`:

```text
ok
```

Failure: non-200 if migrations failed or `SELECT 1` fails.

### `GET /v1/greeting`

Returns stored greeting.

Request: none.

Response `200 application/json`:

```json
{
  "greeting_text": "Hello Word"
}
```

Errors:

| Status | Code | When |
|---|---|---|
| 500 | `internal_error` | Database query fails |
| 404 | `greeting_not_found` | Required row is missing |

## Decisions

| Decision | Reason | Rejected alternative |
|---|---|---|
| Public read-only endpoint | SRS has guest-only static read | Auth rejected as out of scope |
| `/v1/greeting` singular | Product exposes one stored value | `/v1/greetings` rejected because no list/create/update exists |
| Shared error envelope | Keeps backend review and tests consistent | Per-endpoint error shapes rejected as avoidable drift |
