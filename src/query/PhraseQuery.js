import Query from "./Query";
import Hits from "../hits/Hits";

/**
 * Class representing a Phrase Query.
 * @extends Query
 */
export default class PhraseQuery extends Query {
  /**
   * Create a Phrase Query.
   * @constructor
   * @param {string} field - The field to search in.
   * @param {string} phrase - The phrase to search for.
   */
  constructor(field, phrase) {
    super();
    this.field = field;
    this.phrase = phrase;
  }

  /**
   * Search the index using the Phrase query.
   * @param {Indexer} indexer - The indexer instance.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
  async search(indexer, analyzer) {
    const tokens = analyzer.analyze(this.phrase);
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
