import Query from "./Query";
import Hits from "../hits/Hits";
export default class TermQuery extends Query {
  constructor(term) {
    super();
    this.term = term;
  }

  async search(indexer) {
    const ids = await indexer.database.search(this.term.text);
    const documents = await Promise.all(
      ids.map((id) => indexer.getDocument(id))
    );
    const filteredDocuments = documents.filter((doc) => doc !== null);
    return new Hits(filteredDocuments.length, filteredDocuments);
  }
}
