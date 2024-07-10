import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

interface IUserSession {
  id: string | undefined;
  iat: number | undefined;
}

export function signUserSession(user_id: string): string {
  return sign({ id: user_id }, process.env.SECRECT_KEY || '', { algorithm: 'HS512' });
}

export function verifyUserSession(session: string): boolean {
  let userSession: string | jwt.JwtPayload | undefined = undefined;
  try {
    userSession = verify(session, process.env.SECRECT_KEY || '', { algorithms: ['HS512'] });
  } catch (error) {
    userSession = undefined;
  }

  if (userSession) {
    if (typeof userSession === 'string') {
      return false;
    }
    const sessionInfo = userSession as IUserSession;
    if (sessionInfo.id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
