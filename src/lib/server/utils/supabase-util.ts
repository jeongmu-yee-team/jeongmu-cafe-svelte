import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(process.env.SUPABASE_PROJECT_URL || '', process.env.SUPABASE_API_KEY || '');

// Upload file using standard upload
async function uploadFile(file) {
  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file);
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
}
