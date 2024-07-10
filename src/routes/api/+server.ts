import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

export async function GET({ locals }) {
  const plain = { message: 'ok', user: 'good', key: 'ddd' };
  const a = sign(plain, '1234', { algorithm: 'HS512' });

  const plainb = { message: 'ok', user: 'good', key: 'ddd' };
  const b = sign(plain, '1234', { algorithm: 'HS512' });

  let status = false;
  try {
    const aa = verify(b, '1234', { algorithms: ['HS512'] });

    status = true;
  } catch (error) {
    status = false;
  }
  return new Response(JSON.stringify({ status: 200, message: 'ok' }), { status: 200 });
}
