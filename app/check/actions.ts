'use server';

import { ScanResult } from '@/lib/types';
import {
	calculateVisibilityScore,
	generateCrawlerStatuses,
} from '@/lib/visibility-score';
import { parseHtmlContent, checkRobotsRules } from '@/lib/html-parser';
import { fetchRenderedHtml } from '@/lib/puppeteer-html';

export async function scanWebsite(
	url: string,
	company: string,
): Promise<ScanResult> {
	// --- Step 1: Validate URL ---
	let finalUrl = url.trim();
	if (!finalUrl) {
		return {
			company,
			url: '',
			score: {
				overall: 0,
				jsonLd: 0,
				semantic: 0,
				robots: 0,
				breakdown: [],
			},
			crawlers: [
				{
					name: 'ChatGPT-5',
					visible: false,
					score: 0,
					recommendations: [
						'No URL provided. Please enter a valid website URL.',
					],
				},
				{
					name: 'Google Gemini',
					visible: false,
					score: 0,
					recommendations: [
						'No URL provided. Please enter a valid website URL.',
					],
				},
				{
					name: 'Claude',
					visible: false,
					score: 0,
					recommendations: [
						'No URL provided. Please enter a valid website URL.',
					],
				},
			],
			scanDate: new Date().toISOString(),
			hasJsonLd: false,
			hasOpenGraph: false,
			hasMetaTags: false,
			robotsRules: {
				allowsGPT: false,
				allowsGoogle: false,
				allowsClaude: false,
			},
		};
	}
	// Add protocol if missing
	if (!/^https?:\/\//i.test(finalUrl)) {
		finalUrl = `https://${finalUrl}`;
	}
	// Basic URL validation
	try {
		new URL(finalUrl);
	} catch {
		return {
			company,
			url: finalUrl,
			score: {
				overall: 0,
				jsonLd: 0,
				semantic: 0,
				robots: 0,
				breakdown: [],
			},
			crawlers: [
				{
					name: 'ChatGPT-5',
					visible: false,
					score: 0,
					recommendations: [
						'Invalid URL format. Please check your input.',
					],
				},
				{
					name: 'Google Gemini',
					visible: false,
					score: 0,
					recommendations: [
						'Invalid URL format. Please check your input.',
					],
				},
				{
					name: 'Claude',
					visible: false,
					score: 0,
					recommendations: [
						'Invalid URL format. Please check your input.',
					],
				},
			],
			scanDate: new Date().toISOString(),
			hasJsonLd: false,
			hasOpenGraph: false,
			hasMetaTags: false,
			robotsRules: {
				allowsGPT: false,
				allowsGoogle: false,
				allowsClaude: false,
			},
		};
	}

	// --- Step 2: Fetch and Parse ---
	try {
		// Use AbortController for timeout
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 10000);
		let response;
		try {
			response = await fetch(finalUrl, {
				method: 'GET',
				headers: {
					'User-Agent':
						'Mozilla/5.0 (compatible; ChatGPT/5.0; +https://openai.com/bot)',
					Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					'Accept-Language': 'en-US,en;q=0.5',
				},
				signal: controller.signal,
			});
		} catch (fetchErr: any) {
			clearTimeout(timeout);
			let reason = 'Unable to fetch the website.';
			if (fetchErr.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
				reason =
					'SSL certificate error. The domain may not exist or has an invalid certificate.';
			} else if (fetchErr.name === 'AbortError') {
				reason =
					'Request timed out. The website took too long to respond.';
			}
			return {
				company,
				url: finalUrl,
				score: {
					overall: 0,
					jsonLd: 0,
					semantic: 0,
					robots: 0,
					breakdown: [],
				},
				crawlers: [
					{
						name: 'ChatGPT-5',
						visible: false,
						score: 0,
						recommendations: [reason],
					},
					{
						name: 'Google Gemini',
						visible: false,
						score: 0,
						recommendations: [reason],
					},
					{
						name: 'Claude',
						visible: false,
						score: 0,
						recommendations: [reason],
					},
				],
				scanDate: new Date().toISOString(),
				hasJsonLd: false,
				hasOpenGraph: false,
				hasMetaTags: false,
				robotsRules: {
					allowsGPT: false,
					allowsGoogle: false,
					allowsClaude: false,
				},
			};
		}
		clearTimeout(timeout);

		if (!response.ok) {
			return {
				company,
				url: finalUrl,
				score: {
					overall: 0,
					jsonLd: 0,
					semantic: 0,
					robots: 0,
					breakdown: [],
				},
				crawlers: [
					{
						name: 'ChatGPT-5',
						visible: false,
						score: 0,
						recommendations: [
							`Failed to fetch: ${response.status}`,
						],
					},
					{
						name: 'Google Gemini',
						visible: false,
						score: 0,
						recommendations: [
							`Failed to fetch: ${response.status}`,
						],
					},
					{
						name: 'Claude',
						visible: false,
						score: 0,
						recommendations: [
							`Failed to fetch: ${response.status}`,
						],
					},
				],
				scanDate: new Date().toISOString(),
				hasJsonLd: false,
				hasOpenGraph: false,
				hasMetaTags: false,
				robotsRules: {
					allowsGPT: false,
					allowsGoogle: false,
					allowsClaude: false,
				},
			};
		}

		let html = await response.text();
		console.log('[scanWebsite] Fetched HTML:', html.slice(0, 500));

		// Parse HTML content
		let parsed = parseHtmlContent(html);
		console.log('[scanWebsite] Parsed content:', parsed);
		let robotsRules = checkRobotsRules(html);

		// If no structured/meta data found, try Puppeteer fallback
		if (!parsed.hasJsonLd && !parsed.hasOpenGraph && !parsed.hasMetaTags) {
			try {
				html = await fetchRenderedHtml(finalUrl);
				parsed = parseHtmlContent(html);
				robotsRules = checkRobotsRules(html);
				console.log('[scanWebsite] Puppeteer fallback parsed:', parsed);
			} catch (puppeteerErr) {
				console.warn(
					'[scanWebsite] Puppeteer fallback failed:',
					puppeteerErr,
				);
			}
		}

		// Calculate visibility score
		const score = calculateVisibilityScore(html);

		// Generate crawler statuses
		const crawlers = generateCrawlerStatuses(score);

		// Build result
		const result: ScanResult = {
			company,
			url: finalUrl,
			score,
			crawlers,
			scanDate: new Date().toISOString(),
			hasJsonLd: parsed.hasJsonLd,
			hasOpenGraph: parsed.hasOpenGraph,
			hasMetaTags: parsed.hasMetaTags,
			robotsRules,
		};

		return result;
	} catch (error: any) {
		console.error('Error scanning website:', error);
		let reason = 'Unknown error occurred.';
		if (error.code === 'ERR_TLS_CERT_ALTNAME_INVALID') {
			reason =
				'SSL certificate error. The domain may not exist or has an invalid certificate.';
		} else if (error.name === 'AbortError') {
			reason = 'Request timed out. The website took too long to respond.';
		} else if (error.message) {
			reason = error.message;
		}
		return {
			company,
			url: finalUrl,
			score: {
				overall: 0,
				jsonLd: 0,
				semantic: 0,
				robots: 0,
				breakdown: [],
			},
			crawlers: [
				{
					name: 'ChatGPT-5',
					visible: false,
					score: 0,
					recommendations: [reason],
				},
				{
					name: 'Google Gemini',
					visible: false,
					score: 0,
					recommendations: [reason],
				},
				{
					name: 'Claude',
					visible: false,
					score: 0,
					recommendations: [reason],
				},
			],
			scanDate: new Date().toISOString(),
			hasJsonLd: false,
			hasOpenGraph: false,
			hasMetaTags: false,
			robotsRules: {
				allowsGPT: false,
				allowsGoogle: false,
				allowsClaude: false,
			},
		};
	}
}
