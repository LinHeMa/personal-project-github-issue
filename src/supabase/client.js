import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://dleytiekgsgorradcnjr.supabase.co',
  process.env.REACT_APP_SUPABASE_TOKEN
);

export { supabase };
