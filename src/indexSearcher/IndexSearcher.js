import Cache from "../cache/Cache";

/**
 * Class representing an Index Searcher.
 * @class
 */
export default class IndexSearcher {
  /**
   * Create an Index Searcher.
   * @constructor
   * @param {Indexer} indexer - The Indexer instance.
   */
  constructor(indexer) {
    this.indexer = indexer;
    this.searchCache = new Cache(1000);
  }

  /**
   * Search the index for the specified query.
   * @param {Query} query - The query to search with.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
  async search(query) {
    return this.searchCache.get(
      query,
      async () => await query.search(this.indexer)
    );
  }
}
