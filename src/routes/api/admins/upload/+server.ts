import { checkSessionResponse } from '$lib/server/response';
import { supabaseStorageUpsert } from '$lib/server/utils/supabase-client';
import { dataURLtoFile } from '$lib/shared/utils';

type RequestBodyType = {
  file: string;
  fileName: string;
};


export async function POST({ cookies, request }) {
  const checkSession = checkSessionResponse(cookies.get('usersession'));
  if (checkSession) {
    return Response.json({ ok: checkSession.ok, message: checkSession.message }, { status: checkSession.status });
  }

  const bodyData: RequestBodyType = await request.json();
  if (!bodyData || !bodyData.file || !bodyData.fileName) {
    return Response.json({ ok: false, message: 'No file.' }, { status: 400 });
  }

  const file = dataURLtoFile(bodyData.file, bodyData.fileName);

  const result = await supabaseStorageUpsert(file, file.name);
  if (!result) {
    return Response.json({ ok: false, message: 'Invalid Cotent.' }, { status: 400 });
  }

  return Response.json({ ok: true, result }, { status: 200 });
}
