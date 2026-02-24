// Simple in-memory cache for scan results (per server instance)
// For production, use Redis or another distributed cache
const scanCache = new Map();

export function getCachedScan(key: string) {
	return scanCache.get(key);
}

export function setCachedScan(key: string, value: any) {
	scanCache.set(key, value);
}
