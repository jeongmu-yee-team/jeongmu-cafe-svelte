import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { hash } from 'bcrypt';
import { handleSession } from 'svelte-kit-cookie-session';

const sessionHandler = handleSession({
  secret: 'Sasdf',
});
// async function poo({ event, resolve }) {
//   console.log('first pre-processing');
//   const result = await resolve(event, {
//     transformPageChunk: ({ html }) => {
//       // transforms are applied in reverse order
//       console.log('first transform');
//       return html;
//     },
//     preload: () => {
//       // this one wins as it's the first defined in the chain
//       console.log('first preload');
//     },
//   });
//   console.log('first post-processing');
//   return result;
// }
// export const handle = sequence(poo);
export const handle = sequence(sessionHandler, async ({ resolve, event }) => {
  console.log('3');
  if (event.url.pathname.startsWith('/admin')) {
    console.log('4');
    //console.log(event.locals.session.data.id);
    // const user = event.locals.session.data;
    if (!event.locals.session || !event.locals.session.data || !event.locals.session.data.id) {
      return new Response('', { status: 302, headers: { location: '/' } });
    }
    // if (!user) {
    //   return new Response('', { status: 302, headers: { location: '/' } });
    // }
    console.log('1');
    return resolve(event);
  } else {
    console.log('2');
    return resolve(event);
  }
});

const handleError: HandleServerError = async ({ event, status }) => {
  return {
    message: '페이지를 로드하는데 문제가 발생하였습니다.',
    code: `${status}@${event.url}@${event.getClientAddress()}`,
  };
};
