import { createClient } from '@supabase/supabase-js';

const key =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_SUPABASE_TOKEN
    : process.env.REACT_APP_SUPABASE_DEV_TOKEN;

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_SUPABASE_OFFICIAL_URL
    : process.env.REACT_APP_SUPABASE_DEV_URL;
const supabase = createClient(url, key);

export { supabase };
