type Bucket = {
  tokens: number;
  lastRefill: number;
};

const BUCKET_LIMIT = 10;
const REFILL_INTERVAL_MS = 1000 * 60 * 60;

const buckets: Record<string, Bucket> = {};

export function checkToken(userId: string, success: boolean): boolean {
  const now = Date.now();
  const bucket = (buckets[userId] ||= {
    tokens: BUCKET_LIMIT,
    lastRefill: now,
  });

  const elapsed = now - bucket.lastRefill;
  const refillCount = Math.floor(elapsed / REFILL_INTERVAL_MS);
  if (refillCount > 0) {
    bucket.tokens = Math.min(BUCKET_LIMIT, bucket.tokens + refillCount);
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) return false;

  if (!success) bucket.tokens -= 1;

  return true;
}
