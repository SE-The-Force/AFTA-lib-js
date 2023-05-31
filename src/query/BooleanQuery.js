import Query from "./Query";
import Hits from "../hits/Hits";

export default class BooleanQuery extends Query {
  constructor(queries, operator) {
    super();
    this.queries = queries;
    this.operator = operator;
  }

  async search(indexer) {
    const hitsList = await Promise.all(this.queries.map((query) => query.search(indexer)));
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
