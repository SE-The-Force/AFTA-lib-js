import Query from "./Query";
import Hits from "../hits/Hits";


/**
 * Class representing a Boolean Query.
 * @extends Query
 */
export default class BooleanQuery extends Query {
  /**
   * Create a Boolean Query.
   * @constructor
   * @param {Array<Query>} queries - The queries to combine.
   * @param {string} operator - The operator for combining the queries ('AND', 'OR', or 'NOT').
   */
  constructor(queries, operator) {
    super();
    this.queries = queries;
    this.operator = operator;
  }

  /**
   * Search the index using the Boolean query.
   * @param {Indexer} indexer - The indexer instance.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
  async search(indexer, analyzer) {
    const hitsList = await Promise.all(this.queries.map((query) => query.search(indexer, analyzer)));
    const documentLists = hitsList.map((hits) => hits.documents);
    let documents;

    switch (this.operator) {
      case "AND":
        documents = documentLists.reduce((acc, list) =>
          acc.filter((doc) => list.includes(doc))
        );
        break;
      case "OR":
        documents = [...new Set(documentLists.flat())];
        break;
      case "NOT":
        documents = documentLists[0].filter(
          (doc) => !documentLists.slice(1).flat().includes(doc)
        );
        break;
      default:
        throw new Error(`Invalid operator: ${this.operator}`);
    }

    let scores = this.combineScores(hitsList, documents, this.operator);
    return new Hits(documents.length, documents, scores);
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
          case "OR":
            if (hits.scores[docId]) {
              combinedScores[docId] = (combinedScores[docId] || 0) + hits.scores[docId];
            }
            break;
          case "NOT":
            if (hits === hitsList[0]) {
              if (hits.scores[docId]) {
                combinedScores[docId] = hits.scores[docId];
              }
            } else {
              if (hits.scores[docId]) {
                combinedScores[docId] -= hits.scores[docId];
              }
            }
            break;
        }
      }
    }

    return combinedScores;
  }
}
