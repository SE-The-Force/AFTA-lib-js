/**
 * Class representing search hits.
 * @class
 */
export default class Hits {
    /**
   * Create search hits.
   * @constructor
   * @param {number} totalHits - The total number of hits.
   * @param {Document[]} documents - The array of documents representing the hits.
   * @param {number[]} scores - The array of scores for each hit (based on tf-idf).
   */
    constructor(totalHits, documents, scores) {
        this.totalHits = totalHits;
        this.documents = documents;
        // The score is based on tf-idf
        this.scores = scores;
    }
}
