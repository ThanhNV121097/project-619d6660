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

Auth: none.

Request: none.

Response `200 text/plain`:

```text
ok
```

Failure: non-200 if migrations failed or `SELECT 1` fails.

### `GET /v1/greeting`

Returns stored greeting.

Auth: none. Public endpoint for Guest.

Request: none.

Response `200 application/json`:

```json
{
  "greeting_text": "Hello Word"
}
```

Contract source: approved UI mock `code/frontend/lib/mock/render-centered-hello-word.ts`:

```ts
export type GreetingResponse = {
  greeting_text: string;
};
```

Errors:

| Status | Code | Message | When |
|---|---|---|---|
| 500 | `internal_error` | `Something went wrong.` | Database query fails |
| 404 | `greeting_not_found` | `Greeting not found.` | Required row is missing |

Notes:

- Response field name stays `greeting_text` to match reviewed frontend mock.
- No pagination envelope; endpoint returns one resource.
- No loading, empty, or error UI is in story scope; backend still returns shared error envelope for non-2xx responses.

## Migration plan

Forward:

1. Apply database migration that creates and seeds `greetings` row with `greeting_text = 'Hello Word'`.
2. Add backend route `GET /v1/greeting` reading `select greeting_text from greetings where id = 1`.
3. Return `200` with `{ "greeting_text": string }` when row exists.
4. Return shared error envelope for missing row or database failure.

Backward:

1. Remove `GET /v1/greeting` route.
2. Roll back database migration by dropping `greetings` table.

Safety on populated tables:

- Route addition is safe and read-only.
- Forward migration is safe on empty deployment DB and must run once.
- Backward route removal breaks frontend until frontend mock/API usage is rolled back.
- Backward table drop removes required stored greeting; acceptable only before real traffic because product stores no user-entered data.

## Decisions

| Decision | Reason | Rejected alternative |
|---|---|---|
| Public read-only endpoint | SRS has guest-only static read | Auth rejected as out of scope |
| `/v1/greeting` singular | Product exposes one stored value | `/v1/greetings` rejected because no list/create/update exists |
| Shared error envelope | Keeps backend review and tests consistent | Per-endpoint error shapes rejected as avoidable drift |
| Response uses `greeting_text` snake case | Matches approved UI mock and DB column | `greetingText` rejected because it causes frontend rework with no value |
