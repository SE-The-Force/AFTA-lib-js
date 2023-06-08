"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Cache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.map = new Map();
  }
  get(key, defaultValue) {
    return this.map.has(key) ? this.map.get(key) : defaultValue();
  }
  put(key, value) {
    if (this.map.size >= this.maxSize) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}
exports.default = Cache;