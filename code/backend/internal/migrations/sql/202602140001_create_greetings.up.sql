create table greetings (
  id smallint primary key,
  greeting_text text not null check (length(greeting_text) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint greetings_single_row check (id = 1)
);

insert into greetings (id, greeting_text)
values (1, 'Hello Word')
on conflict (id) do nothing;
