-- Create the enquiries table
create table if not exists public.enquiries (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null,
    phone text,
    project_type text,
    message text not null,
    source text default 'website',
    created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.enquiries enable row level security;

-- Create an insert-only policy for anon users
-- This allows anyone to submit an enquiry, but they cannot read, update, or delete existing enquiries.
create policy "Allow public to insert enquiries"
    on public.enquiries
    for insert
    to anon
    with check (true);
