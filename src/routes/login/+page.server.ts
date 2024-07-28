import { checkSessionResponse } from '$lib/server/response';

export function load({ cookies }) {
  const session = checkSessionResponse(cookies.get('usersession'));
  return { session };
}
