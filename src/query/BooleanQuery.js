import Query from "./Query";
import Hits from "../hits/Hits";

export default class BooleanQuery extends Query {
  constructor(queries, operator) {
    super();
    this.queries = queries;
    this.operator = operator;
  }

  async search(indexer) {
    const documentLists = await Promise.all(
      this.queries.map(async (query) => (await query.search(indexer)).documents)
    );
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
    return new Hits(documents.length, documents);
  }
}
