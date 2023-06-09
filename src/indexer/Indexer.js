import Cache from "../cache/Cache";

/**
 * Class representing an Indexer.
 * @class
 */
export default class Indexer {
  /**
   * Create an Indexer.
   * @constructor
   * @param {Analyzer} analyzer - The analyzer instance.
   * @param {SQLiteDatabase} database - The database instance.
   */
  constructor(analyzer, database) {
    this.analyzer = analyzer;
    this.database = database;
    this.documentCache = new Cache(1000);
  }

  /**
   * Add a document to the index.
   * @param {Document} document - The document to add.
   * @returns {Promise<void>} A promise that resolves when the document is added.
   */
  async addDocument(document) {
    this.documentCache.put(document.id, document);
    await this.index(document);
  }

  /**
   * Get a document from the index by its ID.
   * @param {string} id - The ID of the document to retrieve.
   * @returns {Promise<Document>} A promise that resolves with the retrieved document.
   */
  async getDocument(id) {
    const res = await this.documentCache.get(
      id,
      async () => await this.database.getDocument(id)
    );
    return res;
  }

  /**
   * Get the total number of documents in the index.
   * @returns {Promise<number>} A promise that resolves with the total number of documents.
   */
  async getTotalDocuments(){
    return await this.database.getTotalDocuments();
  }

    /**
   * Index a document.
   * @param {Document} document - The document to index.
   * @returns {Promise<void>} A promise that resolves when the document is indexed.
   */
  async index(document) {
    for (const field of document.fields) {
      if (field.isIndexible) {
        let tokens = [];
        if(field.isAnalyzed){
          tokens = await this.analyzer.analyze(field.value);
        }else{
          tokens = field.value.split(" ");
        }
        // Count the frequency of each token
        let tokenFreq = {};
        for (const token of tokens) {
          if (!tokenFreq[token]) {
            tokenFreq[token] = 0;
          }
          tokenFreq[token]++;
        }
        // Store tokens and their frequencies to the database
        for (const [position, token] of tokens.entries()) {
          await this.database.insert(token, document.id, position, tokenFreq[token]);
        }
      }
    }
    await this.database.saveDocument(document);
  }
}
