import Query from "./Query";
import Hits from "../hits/Hits";

/**
 * Class representing a Builder Query.
 * @extends Query
 */
export default class BuilderQuery extends Query {
  /**
   * Create a Builder Query.
   * @constructor
   */
  constructor() {
    super();
    this.queries = [];
  }

  /**
   * Add a new query to the queue.
   * @param {Query} query - The query to be added.
   */
  build(query) {
    this.queries.push(query);
  }

  /**
   * Execute all queries sequentially and filter the result.
   * @param {Indexer} indexer - The indexer instance.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
  async execute(indexer, analyzer) {
    let result;

    for (const query of this.queries) {
      const hits = await query.search(indexer, analyzer);
      
      if (result) {
          result = this.filter(result, hits);
        } else {
            result = hits;
        }
    }
    
    console.log("hits: ", result);
    return result;
  }

  /**
   * Filters the previous result set with the new result set.
   * @param {Hits} prevHits - The previous Hits instance.
   * @param {Hits} newHits - The new Hits instance.
   * @returns {Hits} A Hits instance after filtering.
   */
  filter(prevHits, newHits) {
    const prevIds = new Set(prevHits.documents.map(doc => doc.id));
    const newIds = new Set(newHits.documents.map(doc => doc.id));

    const commonIds = new Set([...prevIds].filter(id => newIds.has(id)));
    const commonDocs = prevHits.documents.filter(doc => commonIds.has(doc.id));
    const scores = this.combineScores([prevHits, newHits], commonDocs, "AND");

    return new Hits(commonDocs.length, commonDocs, scores);
  }

  /**
   * Combine the scores from individual hits lists.
   * @param {Array<Hits>} hitsList - The list of hits from individual queries.
   * @param {Array<Document>} documents - The combined list of documents.
   * @param {string} operator - The operator for combining the queries ('AND', 'OR', or 'NOT').
   * @returns {Object} The combined scores for the documents.
   */
  combineScores(hitsList, documents, operator) {
    let combinedScores = {};

    for (let document of documents) {
      let docId = document.id;
      for (let hits of hitsList) {
        switch (operator) {
          case "AND":
            if (hits.scores[docId]) {
              combinedScores[docId] = (combinedScores[docId] || 0) + hits.scores[docId];
            }
        }
      }
    }

    return combinedScores;
  }
}
