import { verifyUserSession } from '$lib/server/utils/session';

export interface IResponse {
  ok: boolean;
  message?: string;
}

interface ICheckResponse {
  ok: boolean;
  message: string;
  status: number;
}

export function checkSessionResponse(session: string | undefined): ICheckResponse | undefined {
  if (!session) {
    return { ok: false, message: 'Unauthorized', status: 401 };
  }
  if (!verifyUserSession(session)) {
    return { ok: false, message: 'Forbidden', status: 403 };
  }
}
