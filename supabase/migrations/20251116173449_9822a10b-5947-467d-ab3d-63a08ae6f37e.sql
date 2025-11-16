-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  image TEXT,
  video_url TEXT,
  description TEXT,
  full_description TEXT,
  goal DECIMAL(10,2) DEFAULT 0,
  raised DECIMAL(10,2) DEFAULT 0,
  donors INTEGER DEFAULT 0,
  days_left INTEGER,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published events
CREATE POLICY "Anyone can view published events"
ON public.events
FOR SELECT
USING (status = 'published' OR auth.uid() = created_by);

-- Allow authenticated users to create events
CREATE POLICY "Authenticated users can create events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Allow users to update their own events
CREATE POLICY "Users can update their own events"
ON public.events
FOR UPDATE
USING (auth.uid() = created_by);

-- Allow users to delete their own events
CREATE POLICY "Users can delete their own events"
ON public.events
FOR DELETE
USING (auth.uid() = created_by);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON public.events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();