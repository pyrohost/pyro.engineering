export function load({ request }) {
	const ua = request.headers.get("user-agent");
	return {
		ua,
	};
}
