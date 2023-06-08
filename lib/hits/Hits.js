"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Hits {
  constructor(totalHits, documents, scores) {
    this.totalHits = totalHits;
    this.documents = documents;
    // The score is based on tf-idf
    this.scores = scores;
  }
}
exports.default = Hits;