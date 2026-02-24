export interface ParsedContent {
	hasJsonLd: boolean;
	jsonLdData: Record<string, unknown>[];
	hasOpenGraph: boolean;
	ogTags: Record<string, string>;
	hasMetaTags: boolean;
	metaTags: Record<string, string>;
	h1Tags: string[];
	hasTitle: boolean;
	title: string;
	hasDescription: boolean;
	description: string;
	robotsContent: string;
}

import * as cheerio from 'cheerio';

export function parseHtmlContent(html: string): ParsedContent {
	const $ = cheerio.load(html);
	const result: ParsedContent = {
		hasJsonLd: false,
		jsonLdData: [],
		hasOpenGraph: false,
		ogTags: {},
		hasMetaTags: false,
		metaTags: {},
		h1Tags: [],
		hasTitle: false,
		title: '',
		hasDescription: false,
		description: '',
		robotsContent: '',
	};

	// JSON-LD detection
	$('script[type="application/ld+json"]').each((_, el) => {
		try {
			const json = $(el).html();
			if (json) {
				const data = JSON.parse(json);
				result.jsonLdData.push(data);
				result.hasJsonLd = true;
			}
		} catch (e) {
			// skip invalid JSON
		}
	});

	// Open Graph detection
	$('meta[property^="og:"]').each((_, el) => {
		const property = $(el).attr('property');
		const content = $(el).attr('content');
		if (property && content) {
			result.ogTags[property.replace('og:', '')] = content;
			result.hasOpenGraph = true;
		}
	});

	// Meta tags detection
	$('meta').each((_, el) => {
		const name = $(el).attr('name');
		const content = $(el).attr('content');
		if (name && content) {
			result.metaTags[name] = content;
			result.hasMetaTags = true;
			if (name.toLowerCase() === 'description') {
				result.description = content;
				result.hasDescription = true;
			}
			if (name.toLowerCase() === 'robots') {
				result.robotsContent = content;
			}
		}
	});

	// Title
	const title = $('title').first().text();
	if (title) {
		result.title = title.trim();
		result.hasTitle = true;
	}

	// H1 tags
	$('h1').each((_, el) => {
		const text = $(el).text().trim();
		if (text) {
			result.h1Tags.push(text);
		}
	});

	return result;
}

export function checkRobotsRules(html: string): {
	allowsGPT: boolean;
	allowsGoogle: boolean;
	allowsClaude: boolean;
} {
	const robotsMatch = html.match(
		/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i,
	);
	const robotsContent = robotsMatch ? robotsMatch[1].toLowerCase() : '';

	// If "noindex" or "none" is present, assume no access
	const isBlocked =
		robotsContent.includes('noindex') || robotsContent.includes('none');

	return {
		allowsGPT: !isBlocked,
		allowsGoogle: !isBlocked,
		allowsClaude: !isBlocked,
	};
}
