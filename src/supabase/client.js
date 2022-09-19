import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dleytiekgsgorradcnjr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZXl0aWVrZ3Nnb3JyYWRjbmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1NzkwODEsImV4cCI6MTk3OTE1NTA4MX0.pgLsr0LZlMfQ7dC_iyK-mFjsCC4UxTibN2Vvu2OlV8U'
);

export { supabase };
