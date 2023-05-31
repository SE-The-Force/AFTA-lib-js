export default class Hits {
    constructor(totalHits, documents, scores) {
        this.totalHits = totalHits;
        this.documents = documents;
        // The score is based on tf-idf
        this.scores = scores;
    }
}
