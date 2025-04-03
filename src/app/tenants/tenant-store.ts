type Bucket = {
  tokens: number;
  lastRefill: number;
};

const BUCKET_LIMIT = 10;
const REFILL_INTERVAL_MS = 1000 * 60 * 60; // 1 hora

class TenantStore {
  private buckets: Map<string, Bucket> = new Map();

  private refill(bucket: Bucket) {
    const now = Date.now();
    const elapsed = now - bucket.lastRefill;
    const refillCount = Math.floor(elapsed / REFILL_INTERVAL_MS);

    if (refillCount > 0) {
      bucket.tokens = Math.min(BUCKET_LIMIT, bucket.tokens + refillCount);
      bucket.lastRefill = now;
    }

    return bucket;
  }

  getOrCreateBucket(userId: string): Bucket {
    if (!this.buckets.has(userId)) {
      this.buckets.set(userId, {
        tokens: BUCKET_LIMIT,
        lastRefill: Date.now(),
      });
    }

    const bucket = this.buckets.get(userId)!;
    return this.refill(bucket);
  }

  consumeToken(userId: string, success: boolean) {
    const bucket = this.getOrCreateBucket(userId);

    if (bucket.tokens <= 0) {
      return {
        success: false,
        message: "Limite de requisições foi atingido",
      };
    }

    if (!success) {
      bucket.tokens -= 1;
    }

    return {
      success,
      message: success
        ? "Chave Pix consultada com sucesso"
        : "Erro ao consultar chave Pix",
    };
  }

  getTokens(userId: string): number {
    const bucket = this.getOrCreateBucket(userId);
    return bucket.tokens;
  }

  reset() {
    this.buckets.clear();
  }
}

export const tenantStore = new TenantStore();
