export async function GET() {
  return new Response(JSON.stringify({ status: 200, message: 'ok' }), { status: 200 });
}
