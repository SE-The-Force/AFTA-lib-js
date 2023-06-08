"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Cache = _interopRequireDefault(require("../cache/Cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Indexer {
  constructor(analyzer, database) {
    this.analyzer = analyzer;
    this.database = database;
    this.documentCache = new _Cache.default(1000);
  }
  async addDocument(document) {
    this.documentCache.put(document.id, document);
    await this.index(document);
  }
  async getDocument(id) {
    if (id in this.documentCache) {}
    const res = await this.documentCache.get(id, async () => await this.database.getDocument(id));
    return res;
  }
  async getTotalDocuments() {
    return await this.database.getTotalDocuments();
  }
  async index(document) {
    for (const field of document.fields) {
      if (field.isIndexible) {
        const tokens = field.value.split(" ");
        // Count the frequency of each token
        let tokenFreq = {};
        for (const token of tokens) {
          if (!tokenFreq[token]) {
            tokenFreq[token] = 0;
          }
          tokenFreq[token]++;
        }
        // Store tokens and their frequencies to the database
        for (const [position, token] of tokens.entries()) {
          await this.database.insert(token, document.id, position, tokenFreq[token]);
        }
      }
    }
    await this.database.saveDocument(document);
  }
}
exports.default = Indexer;