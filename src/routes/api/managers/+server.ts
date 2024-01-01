export async function GET() {
	return new Response(JSON.stringify({ ok: true, api_version: 'v1' }), { status: 200 });
}
