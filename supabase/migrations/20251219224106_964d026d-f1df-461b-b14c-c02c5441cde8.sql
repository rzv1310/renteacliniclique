-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can manage rate_limits" ON public.rate_limits;

-- Create a proper service-role-only policy
-- This ensures only the service role can read/write to the rate_limits table
CREATE POLICY "Service role only access"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);