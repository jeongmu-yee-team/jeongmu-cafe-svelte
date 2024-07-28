import { createClient } from '@supabase/supabase-js';

export type SupabaseReturnType = { data: { id: string; path: string; fullPath: string }; publicUrl: string };

export type FileBody =
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | Buffer
  | File
  | FormData
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | URLSearchParams
  | string;

export async function supabaseStorageUpsert(fileBody: FileBody, filePath: string): Promise<SupabaseReturnType | null> {
  const projectURL = process.env.SUPABASE_PROJECT_URL;
  const apiKey = process.env.SUPABASE_API_KEY;
  const bucketName = process.env.SUPABASE_BUCKET_NAME;

  if (!projectURL || !apiKey || !bucketName) {
    return null;
  }

  const supabase = createClient(projectURL, apiKey);

  const { data, error } = await supabase.storage.from(bucketName).upload(filePath, fileBody, {
    upsert: true,
    contentType: 'image/*',
  });
  if (error) {
    return null;
  }

  const imageUrl = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return { data, publicUrl: imageUrl.data.publicUrl };
}
