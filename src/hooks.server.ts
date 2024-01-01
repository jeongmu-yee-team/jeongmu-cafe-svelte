export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/admin')) {
		return new Response('관리자 페이지', { status: 404 });
	}
	const response = await resolve(event);
	return response;
}

export async function handleError({ error, event, status, message }) {
	return {
		message: `msg: ${message}`,
	};
}
