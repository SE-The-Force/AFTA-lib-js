"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Parser {
  constructor(location) {
    this.location = location;
  }
  isStored(header) {}
  isIndexable(header) {}
  isAnalyzed(header) {}
  async parse() {}
}
exports.default = Parser;