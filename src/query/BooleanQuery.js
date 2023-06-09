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
    if(hitsList.length === 0){
      return new Hits(0, []);
    }

    let documents = [];
    switch (this.operator) {
      case "AND":
          let commonIds = new Set(hitsList[0].documents.map(doc => doc.id));
          for(let i = 1; i < hitsList.length; i++) {
              let currentIds = new Set(hitsList[i].documents.map(doc => doc.id));
              commonIds = new Set([...commonIds].filter(id => currentIds.has(id)));
          }

          let commonDocuments = new Map();
          for(let hit of hitsList) {
              for(let doc of hit.documents) {
                  if(commonIds.has(doc.id)) {
                      commonDocuments.set(doc.id, doc);
                  }
              }
          }

          documents = Array.from(commonDocuments.values());
          break;
      case "OR":
          let allDocuments = new Map();
          for(let hit of hitsList) {
              for(let doc of hit.documents) {
                  allDocuments.set(doc.id, doc);
              }
          }

          documents = Array.from(allDocuments.values());
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
