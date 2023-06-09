/**
 * Class representing a cache.
 * @class
 */
export default class Cache {
  /**
   * Create a cache.
   * @constructor
   * @param {number} maxSize - The maximum size of the cache.
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.map = new Map();
  }

  /**
   * Get a value from the cache by key.
   * @param {any} key - The key to retrieve the value.
   * @param {Function} defaultValue - The default value to return if the key is not found.
   * @returns {any} The value associated with the key, or the default value if the key is not found.
   */
  get(key, defaultValue) {
    return this.map.has(key) ? this.map.get(key) : defaultValue();
  }

  /**
   * Put a key-value pair into the cache.
   * @param {any} key - The key to store the value.
   * @param {any} value - The value to store.
   */
  put(key, value) {
    if (this.map.size >= this.maxSize) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}
