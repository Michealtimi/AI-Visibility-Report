import puppeteer from 'puppeteer';

/**
 * Fetches the fully rendered HTML of a page using Puppeteer (headless Chrome).
 * @param url The URL to fetch.
 * @returns The rendered HTML as a string.
 */
export async function fetchRenderedHtml(url: string): Promise<string> {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	try {
		const page = await browser.newPage();
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		);
		await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
		const html = await page.content();
		return html;
	} finally {
		await browser.close();
	}
}
