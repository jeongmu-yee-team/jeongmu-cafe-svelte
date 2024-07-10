import { verifyUserSession } from '$lib/server/utils/session';

export async function GET({ cookies }) {
  const session = cookies.get('usersession');
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!verifyUserSession(session)) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return Response.json({ message: 'admin API' }, { status: 200 });
}
