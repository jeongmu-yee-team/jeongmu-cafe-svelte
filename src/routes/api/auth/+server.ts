import Ajv from 'ajv';

import type { IResponse } from '$lib/server/response';

import { AuthSchema } from '$lib/schemas/auth-schema';
import * as UserModules from '$lib/server/modules/auth';
import { comparePassword } from '$lib/server/utils/encryption';
import { signUserSession, verifyUserSession } from '$lib/server/utils/session';

export async function GET({ url, cookies }) {
  const action = url.searchParams.get('action');
  const session = cookies.get('usersession');

  if (action === 'signout') {
    cookies.delete('usersession', { path: '/' });
    return Response.json({ ok: true, message: 'Y' }, { status: 200 });
  }

  if (!session) {
    return Response.json({ ok: false, message: 'N' }, { status: 200 });
  }
  if (verifyUserSession(session)) {
    return Response.json({ ok: true, message: 'Y' }, { status: 200 });
  }

  return Response.json({ ok: false, message: 'N' }, { status: 200 });
}

export async function POST({ request, cookies }) {
  const bodyData = await request.json();
  if (!bodyData) {
    return Response.json({ ok: false, message: '잘못된 요청' }, { status: 400 });
  }

  const validate = new Ajv().compile(AuthSchema);
  if (!validate(bodyData)) {
    return Response.json({ ok: false, message: 'Invalid Form Data.' }, { status: 400 });
  }

  try {
    const user = await UserModules.readUserById(bodyData.user_id);
    if (!user) {
      return Response.json({ ok: false, message: '아이디 또는 비밀번호가 일치하지 않음.' }, { status: 200 });
    }
    if (!(await comparePassword(bodyData.password, user.password))) {
      return Response.json({ ok: false, message: '아이디 또는 비밀번호가 일치하지 않음.' }, { status: 200 });
    }

    const userToken = signUserSession(user.id);
    cookies.set('usersession', userToken, { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
    return Response.json({ ok: true, message: '인증 성공' }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export type TAuthGET = IResponse;
export type TAuthPOST = IResponse;
