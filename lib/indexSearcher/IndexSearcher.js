"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Cache = _interopRequireDefault(require("../cache/Cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class IndexSearcher {
  constructor(indexer) {
    this.indexer = indexer;
    this.searchCache = new _Cache.default(1000);
  }
  async search(query) {
    return this.searchCache.get(query, async () => await query.search(this.indexer));
  }
}
exports.default = IndexSearcher;