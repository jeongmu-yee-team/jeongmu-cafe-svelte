import client from '../utils/prisma-client';

export async function getIsExistUser(user_id: string) {
  return client.admins.findFirst({
    where: { id: user_id },
    select: { created_at: true },
  });
}

export async function getUserInfo({ user_id, password }: { user_id: string; password: string }) {
  return client.admins.findFirst({
    where: { id: user_id, password: password },
    select: { created_at: true },
  });
}
