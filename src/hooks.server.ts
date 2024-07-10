import type { Handle, HandleServerError } from '@sveltejs/kit';

import { verifyUserSession } from '$lib/server/utils/session';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/admins')) {
    const session = event.cookies.get('usersession');
    if (!session) {
      return new Response(null, { status: 303, headers: { location: '/login' } });
    }

    if (!verifyUserSession(session)) {
      return new Response(null, { status: 303, headers: { location: '/login' } });
    }

    return resolve(event);
  } else {
    return resolve(event);
  }
};

export const handleError: HandleServerError = async ({ event, status }) => {
  return {
    message: '페이지를 로드하는데 문제가 발생하였습니다.',
    code: `${status}@${event.url}@${event.getClientAddress()}`,
  };
};
