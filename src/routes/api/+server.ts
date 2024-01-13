export async function GET() {
  return new Response(JSON.stringify({ status: 200, version: 'v1' }), { status: 200 });
}
