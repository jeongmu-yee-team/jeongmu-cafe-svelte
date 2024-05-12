import type { SessionData } from '$src/lib/server/auth-session';

export async function GET({ locals }) {
  const auth: SessionData = { id: 2, name: 'd' };
  await locals.session.set(auth);
  console.log(locals.session.data);
  // console.log(session);
  return new Response(JSON.stringify({ status: 200, version: 'v1' }), { status: 200 });
}

export async function POST({ request }) {}
