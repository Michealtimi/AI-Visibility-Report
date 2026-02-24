// /app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual, createHmac } from 'crypto';

const LEMON_WEBHOOK_SECRET = process.env.LEMON_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
	const signature = req.headers.get('X-Signature') || '';
	const body = await req.text();

	// Compute HMAC SHA256 using Node.js crypto
	const expected = createHmac('sha256', LEMON_WEBHOOK_SECRET)
		.update(body)
		.digest();
	const actual = Buffer.from(signature, 'hex');

	if (
		expected.length === actual.length &&
		timingSafeEqual(expected, actual)
	) {
		// Signature is valid, handle the event
		// Example: const event = JSON.parse(body);
		return NextResponse.json({ ok: true });
	} else {
		return NextResponse.json(
			{ error: 'Invalid signature' },
			{ status: 401 },
		);
	}
}
