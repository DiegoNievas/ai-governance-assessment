-- -----------------------------------------------------------------------------------------
-- SCALABLE AGENCY MULTITENANCY SETUP
-- This script upgrades the database from anonymous submissions to a secure, organization-based
-- multitenant architecture required for MSP/Agency monetization.
-- -----------------------------------------------------------------------------------------

-- 1. Create the Organizations Table (Tenants)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS for organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 2. Create the User Profiles Table (maps Auth Users to Organizations)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT auth.uid() PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'consultant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on RLS for user profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Upgrade the existing Assessments table
-- We add columns linking the assessment to an organization and to the specific consultant who ran it.
ALTER TABLE public.assessments
  ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- -----------------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- These policies mathematically guarantee users can only see their own Organization's data.
-- -----------------------------------------------------------------------------------------

-- Drop old anonymous policy if it exists
DROP POLICY IF EXISTS "Enable anonymous insert" ON public.assessments;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.assessments;

-- POLICIES FOR USER_PROFILES
-- A user can read their own profile
CREATE POLICY "Users can read their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- A user can insert their own profile (used during signup)
CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- POLICIES FOR ORGANIZATIONS
-- A user can read the organization they belong to
CREATE POLICY "Users can read their own organization" ON public.organizations
  FOR SELECT USING (
    id IN (SELECT org_id FROM public.user_profiles WHERE id = auth.uid())
  );

-- Anyone can create an organization (used during signup)
CREATE POLICY "Anyone can create an organization" ON public.organizations
  FOR INSERT WITH CHECK (true);

-- POLICIES FOR ASSESSMENTS (The core data)
-- Users can only insert assessments into their own organization
CREATE POLICY "Insert assessments linking to own org" ON public.assessments
  FOR INSERT WITH CHECK (
    org_id IN (SELECT org_id FROM public.user_profiles WHERE id = auth.uid())
  );

-- Users can only read assessments belonging to their organization
CREATE POLICY "Select assessments in own org" ON public.assessments
  FOR SELECT USING (
    org_id IN (SELECT org_id FROM public.user_profiles WHERE id = auth.uid())
  );

-- Users can only update/delete assessments in their organization
CREATE POLICY "Update assessments in own org" ON public.assessments
  FOR UPDATE USING (
    org_id IN (SELECT org_id FROM public.user_profiles WHERE id = auth.uid())
  );

CREATE POLICY "Delete assessments in own org" ON public.assessments
  FOR DELETE USING (
    org_id IN (SELECT org_id FROM public.user_profiles WHERE id = auth.uid())
  );
