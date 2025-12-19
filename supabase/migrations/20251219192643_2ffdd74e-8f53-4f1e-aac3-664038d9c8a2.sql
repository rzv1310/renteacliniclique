-- Add RLS policy for service role to insert/delete rate limits
CREATE POLICY "Service role can manage rate_limits"
ON public.rate_limits
FOR ALL
USING (true)
WITH CHECK (true);