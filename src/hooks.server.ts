import { type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/admin')) {
    console.log('관리자 세션 로직 구현');
    return new Response('관리자 페이지', { status: 200 });
  }

  return await resolve(event);
};

export const handleError: HandleServerError = async ({ event, status }) => {
  return {
    message: '페이지를 로드하는데 문제가 발생하였습니다.',
    code: `${status}@${event.url}@${event.getClientAddress()}`,
  };
};
