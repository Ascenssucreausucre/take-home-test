type UrlEntry = {
  originalUrl: string;
  shortCode: string;
};

class UrlStore {
  private store = new Map<string, UrlEntry>();

  create(originalUrl: string, shortCode: string): UrlEntry {
    const entry: UrlEntry = { originalUrl, shortCode };
    this.store.set(shortCode, entry);
    return entry;
  }

  get(shortCode: string): UrlEntry | undefined {
    return this.store.get(shortCode);
  }

  has(shortCode: string): boolean {
    return this.store.has(shortCode);
  }

  clear(): void {
    this.store.clear();
  }

  getAll(): UrlEntry[] {
    return Array.from(this.store.values());
  }
}

export const urlStore = new UrlStore();
