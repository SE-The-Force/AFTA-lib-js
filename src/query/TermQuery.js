import Query from "./Query";
import Hits from "../hits/Hits";

/**
 * Class representing a Term Query.
 * @extends Query
 */
export default class TermQuery {
  /**
   * Create a Term Query.
   * @constructor
   * @param {string} term - The term to search for.
   */
    constructor(term) {
        this.term = term;
    }

  /**
   * Search the index using the Term query.
   * @param {Indexer} indexer - The indexer instance.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
    async search(indexer) {
        const {ids, frequencies, doc_freqs} = await indexer.database.search(this.term.text);
        const documents = await Promise.all(
            ids.map((id) => indexer.getDocument(id))
        );
        const filteredDocuments = documents.filter((doc) => doc !== null);
        // Compute tf-idf scores for each document
        const tf_idfs = {};
        const totalDocs = await indexer.getTotalDocuments();
        frequencies.forEach((tf, index) => {
            const idf = Math.log(1 + ( totalDocs / (1 + doc_freqs[index])));
            tf_idfs[ids[index]] = tf * idf;
        });
        // Sort documents based on tf-idf scores
        filteredDocuments.sort((a, b) => tf_idfs[b.id] - tf_idfs[a.id]);
        // Create a Hits object
        return new Hits(Object.keys(tf_idfs).length, filteredDocuments, tf_idfs);
    }
}

module.exports = TermQuery;