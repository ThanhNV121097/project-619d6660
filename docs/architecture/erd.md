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

## Indexes

No secondary indexes. `GET /v1/greeting` reads by primary key `id = 1`, served by `greetings_pkey`.

## Story extension — Render centered hello word

No new entities or columns required. Existing `greetings` table supplies reviewed UI mock shape:

```ts
export type GreetingResponse = {
  greeting_text: string;
};
```

`greeting_text` is non-null and non-empty, so frontend receives required `string` without fallback.

## Migration plan

Forward:

1. Create `greetings` table with `id smallint primary key`, `check (id = 1)`, `greeting_text text not null check (length(greeting_text) > 0)`, `created_at timestamptz not null default now()`, and `updated_at timestamptz not null default now()`.
2. Insert seed row `(1, 'Hello Word')`.

Backward:

1. Drop `greetings` table.

Safety on populated tables:

- Forward migration is safe on empty deployment DB.
- Forward migration is not rerunnable on populated DB because table creation and seed insert would conflict; migration runner must apply it once.
- Backward migration deletes the stored greeting and audit timestamps; acceptable only for rollback before production traffic because this product has one required row and no user-generated data.

## Decisions

| Decision | Reason | Rejected alternative |
|---|---|---|
| One-row `greetings` table with `id = 1` check | SRS requires one stored value only | Key-value table rejected as extra abstraction |
| Store text in DB migration seed | Empty runtime DB must boot with required content | Manual seed rejected; deployment has no manual DB step |
| `text` type for greeting | Exact copy, no meaningful max length from SRS | `varchar(255)` rejected as arbitrary limit |
| No secondary index | Only query is primary-key lookup by `id = 1` | Extra index on `greeting_text` rejected because no search/filter exists |
