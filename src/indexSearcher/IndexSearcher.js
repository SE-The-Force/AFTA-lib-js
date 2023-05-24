import Cache from "../cache/Cache";
export default class IndexSearcher {
  constructor(indexer) {
    this.indexer = indexer;
    this.searchCache = new Cache(1000);
  }

  async search(query) {
    return this.searchCache.get(
      query,
      async () => await query.search(this.indexer)
    );
  }
}
