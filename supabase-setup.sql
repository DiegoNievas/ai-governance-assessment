-- Create a table for Assessment Submissions
create table
  public.assessments (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    customer_name text not null,
    industry text null,
    consultant_name text null,
    overall_score numeric null,
    full_data jsonb not null,
    constraint assessments_pkey primary key (id)
  ) tablespace pg_default;

-- Enable Row Level Security (RLS)
alter table public.assessments enable row level security;

-- Allow anonymous inserts (Since we are keeping it frictionless for now)
create policy "Allow anonymous inserts"
  on public.assessments
  for insert
  to public
  with check (true);

-- Allow anonymous selects (so the app can potentially read data if needed, or you can remove this to keep data blind)
create policy "Allow anonymous selects"
  on public.assessments
  for select
  to public
  using (true);
