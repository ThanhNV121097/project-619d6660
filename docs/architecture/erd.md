# ERD

## Tables

### `greetings`

Stores the single visible message for `hello-word-19`.

| Column | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | `smallint` | primary key, `id = 1` | Enforces one-row table |
| `greeting_text` | `text` | not null, not empty | Text shown on page |
| `created_at` | `timestamptz` | not null, default `now()` | Audit creation time |
| `updated_at` | `timestamptz` | not null, default `now()` | Audit update time |

Seed row:

```sql
insert into greetings (id, greeting_text) values (1, 'Hello Word');
```

## Relationships

No relationships. Product has one table and one row.

## Decisions

| Decision | Reason | Rejected alternative |
|---|---|---|
| One-row `greetings` table with `id = 1` check | SRS requires one stored value only | Key-value table rejected as extra abstraction |
| Store text in DB migration seed | Empty runtime DB must boot with required content | Manual seed rejected; deployment has no manual DB step |
| `text` type for greeting | Exact copy, no meaningful max length from SRS | `varchar(255)` rejected as arbitrary limit |
