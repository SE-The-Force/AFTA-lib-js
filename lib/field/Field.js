"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Field {
  constructor(key, value, analyzedValue = "", isAnalyzed = false, isIndexible = false, isStored = false) {
    this.key = key;
    this.value = value;
    this.analyzedValue = analyzedValue;
    this.isAnalyzed = isAnalyzed;
    this.isIndexible = isIndexible;
    this.isStored = isStored;
  }
  hashCode() {
    let result = this.key;
    result = 31 * result + this.value;
    result = 31 * result + this.analyzedValue;
    result = 31 * result + this.isAnalyzed;
    result = 31 * result + this.isIndexible;
    result = 31 * result + this.isStored;
    return result;
  }
}
exports.default = Field;