-- Fix for RLS Chicken-and-Egg issue during Signup
-- This allows the user who is creating the organization to read it immediately upon insert,
-- resolving the PostgREST RETURNING constraint before the user_profile link is established.

ALTER TABLE public.organizations ADD COLUMN IF NOT EXISTS created_by UUID DEFAULT auth.uid() REFERENCES auth.users(id);

CREATE POLICY "Users can read organizations they created" ON public.organizations
  FOR SELECT USING (auth.uid() = created_by);
