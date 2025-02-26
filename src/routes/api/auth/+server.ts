import { PRIVATE_PASS_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { passkey } = data as { passkey: unknown };

		// Enkel validering för att se till att passkey är en sträng
		if (typeof passkey !== 'string') {
			return json({ success: false }, { status: 400 });
		}

		// Jämför med den lagrade nyckeln
		const isValid = passkey === PRIVATE_PASS_KEY;

		return json({
			success: isValid
		});
	} catch (error) {
		console.error('Auth error:', error);
		return json({ success: false }, { status: 500 });
	}
};
