import Query from "./Query";
import Hits from "../hits/Hits";

export default class PhraseQuery extends Query {
  constructor(field, phrase) {
    super();
    this.field = field;
    this.phrase = phrase;
  }

  async search(indexer) {
    const tokens = this.phrase.split(" ");
    const hits = [];
    const documentIds = await indexer.database.search(this.phrase);
    const documents = await Promise.all(
      documentIds.map((id) => indexer.getDocument(id))
    );
    for (const doc of documents) {
      const positions = Object.entries(doc.fields)
        .filter(([key]) => key === this.field)
        .flatMap(([, value]) =>
          value.split(" ").map((value, index) => [index, value])
        )
        .reduce((acc, [index, value]) => {
          acc[value] = acc[value] || [];
          acc[value].push(index);
          return acc;
        }, {});
      let found = true;
      for (let i = 1; i < tokens.length; i++) {
        const prevToken = tokens[i - 1];
        const token = tokens[i];
        if (
          !positions.hasOwnProperty(prevToken) ||
          !positions.hasOwnProperty(token) ||
          !positions[prevToken].some((p) => positions[token].includes(p + 1))
        ) {
          found = false;
          break;
        }
      }
      if (found) {
        hits.push(doc);
      }
    }
    return new Hits(hits.length, hits);
  }
}
