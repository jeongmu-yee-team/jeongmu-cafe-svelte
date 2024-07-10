import Ajv from 'ajv';

import type { IResponse } from '$lib/server/response';

import { PostAuthSchema } from '$lib/schemas/post-auth-schema';
import * as UserModules from '$lib/server/modules/auth';
import { comparePassword } from '$lib/server/utils/encryption';
import { signUserSession, verifyUserSession } from '$lib/server/utils/session';

export async function GET({ url, cookies }) {
  const action = url.searchParams.get('action');
  const session = cookies.get('usersession');

  if (action === 'signout') {
    cookies.delete('usersession', { path: '/' });
    return Response.json({ message: 'Y' }, { status: 200 });
  }

  if (!session) {
    return Response.json({ message: 'N' }, { status: 200 });
  }
  if (verifyUserSession(session)) {
    return Response.json({ message: 'Y' }, { status: 200 });
  }

  return Response.json({ message: 'N' }, { status: 200 });
}

export async function POST({ request, cookies }) {
  const bodyData: FormData = await request.json();
  if (!bodyData) {
    return Response.json({ message: '잘못된 요청' }, { status: 400 });
  }

  const validate = new Ajv().compile(PostAuthSchema);
  if (!validate(bodyData)) {
    return Response.json({ message: 'Invalid Form Data.' }, { status: 400 });
  }

  try {
    const user = await UserModules.readUserById(bodyData.user_id);
    if (!user) {
      return Response.json({ message: '아이디 또는 비밀번호가 일치하지 않음.' }, { status: 200 });
    }
    if (!(await comparePassword(bodyData.password, user.password))) {
      return Response.json({ message: '아이디 또는 비밀번호가 일치하지 않음.' }, { status: 200 });
    }

    const userToken = signUserSession(user.id);
    cookies.set('usersession', userToken, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
    return Response.json({ message: '인증 성공', success: 'ok' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}

export type IAuthGET = IResponse;
export type IAuthPOST = IResponse & {
  success: string;
};
