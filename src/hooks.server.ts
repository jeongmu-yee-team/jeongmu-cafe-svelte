import { type Handle, type HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/admin')) {
    console.log('관리자 세션 로직 구현');
    return new Response('관리자 페이지', { status: 200 });
  }

  const response = await resolve(event);
  return response;
};

export const handleError: HandleServerError = async ({ event, status }) => {
  return {
    message: '페이지에 이상이 생겼습니다.',
    code: `${status} + ${event.url.pathname}`,
  };
};
