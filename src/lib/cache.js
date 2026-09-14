/**
 * High-performance, lightweight in-memory TTL cache for server-side API routes.
 * Avoids repeated network roundtrips to MongoDB for high-frequency read queries.
 */

class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }

    return entry.value;
  }

  set(key, value, ttlSeconds = 180) {
    if (this.store.size > 1000) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }

    this.store.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  del(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

if (!global.__pharmaCache) {
  global.__pharmaCache = new MemoryCache();
}

const cache = global.__pharmaCache;
export default cache;
