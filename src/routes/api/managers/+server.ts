export async function GET() {
  return new Response(JSON.stringify({ ok: true, message: '관리자 API' }), { status: 200 });
}
