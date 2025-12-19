-- Create rate_limits table for tracking API usage per IP
CREATE TABLE public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  function_name TEXT NOT NULL DEFAULT 'generate-implant-visualization',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for efficient lookups by IP and time
CREATE INDEX idx_rate_limits_ip_created ON public.rate_limits(ip_address, created_at);

-- Enable RLS (only service role can access)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create cleanup function that deletes records older than 24 hours
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.rate_limits 
  WHERE created_at < NOW() - INTERVAL '24 hours';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to run cleanup after each insert
CREATE TRIGGER trigger_cleanup_rate_limits
  AFTER INSERT ON public.rate_limits
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.cleanup_old_rate_limits();