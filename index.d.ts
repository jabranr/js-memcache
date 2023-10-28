export default JSMemcache;
declare class JSMemcache {
  /**
   * Set limit value
   */
  setLimit(limit: number): Window & typeof globalThis;

  /**
   * Set separator value
   */
  setSeparator(separator: string): Window & typeof globalThis;

  /**
   * Get limit value
   */
  getLimit(): number;

  /**
   * Get separator value
   */
  getSeparator(): string;

  /**
   * Get cache size
   */
  getSize(): number;

  /**
   * Set data to cache
   */
  add(key: string | string[], val: unknown): void;

  /**
   * Get data from cache
   */
  get(key: string | string[]): unknown | boolean;

  /**
   * Update data in cache
   */
  update(
    key: string | string[],
    newValue: unknown
  ): (Window & typeof globalThis) | ReferenceError;

  /**
   * Remove data in cache
   */
  remove(key: string | string[]): (Window & typeof globalThis) | ReferenceError;

  /**
   * Get all data in cache
   */
  all(): Record<string, unknown>;

  /**
   * Get all keys in cache
   */
  keys(): string[];

  /**
   * Clear all data in cache
   */
  clear(): void;

  /**
   * Add methods aliases
   */
  set: (key: string, val: unknown) => void;
  replace: (
    key: string,
    newValue: unknown
  ) => (Window & typeof globalThis) | ReferenceError;
}
