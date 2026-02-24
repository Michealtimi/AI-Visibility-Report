import { z } from 'zod';

// Simple in-memory rate limiter (per process, not distributed)
const RATE_LIMIT = 10; // requests
const WINDOW_MS = 60 * 1000; // 1 minute
let requests: { [ip: string]: number[] } = {};

export async function rateLimit(ip = 'global') {
	const now = Date.now();
	if (!requests[ip]) requests[ip] = [];
	// Remove old timestamps
	requests[ip] = requests[ip].filter((ts) => now - ts < WINDOW_MS);
	if (requests[ip].length >= RATE_LIMIT) {
		throw new Error('Rate limit exceeded. Please try again later.');
	}
	requests[ip].push(now);
}

export const scanSchema = z.object({
	url: z.string().url(),
	company: z.string().min(1).max(100),
});
