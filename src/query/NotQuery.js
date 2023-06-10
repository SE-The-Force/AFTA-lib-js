import Query from "./Query";
import Hits from "../hits/Hits";

/**
 * Class representing a Not Query.
 * @extends Query
 */
export default class NotQuery extends Query {
  /**
   * Create a Boolean Query.
   * @constructor
   * @param {String} query - The queries to combine.
   */
  constructor(query) {
    super();
    this.query = query;
  }

  /**
   * Search the index using the Boolean query.
   * @param {Indexer} indexer - The indexer instance.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
  async search(indexer, analyzer) {
    const tokens = await analyzer.analyze(this.query);
    const batches = await Promise.all(tokens.map((token) => indexer.getDocumentsWithoutToken(token)));
    if(batches.length === 0){
      return new Hits(0, []);
    }

    let commonIds = new Set(batches[0].map(doc => doc.id));
    for(let i = 1; i < batches.length; i++) {
        let currentIds = new Set(batches[i].map(doc => doc.id));
        commonIds = new Set([...commonIds].filter(id => currentIds.has(id)));
    }

    let commonDocuments = new Map();
    let scores = {}
    for(let batch of batches) {
        for(let doc of batch) {
            if(commonIds.has(doc.id)) {
                commonDocuments.set(doc.id, doc);
                scores[doc.id] = 0;
            }
        }
    }

    const result = Array.from(commonDocuments.values());
    return new Hits(result.length, result, scores);
  }
}
  