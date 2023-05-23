import Cache from "../cache/Cache";

export default class Indexer {
  constructor(analyzer, database) {
    this.analyzer = analyzer;
    this.database = database;
    this.documentCache = new Cache(1000);
  }

  async addDocument(document) {
    this.documentCache.put(document.id, document);
    await this.index(document);
  }

  getDocument(id) {
    return this.documentCache.get(id, () => this.database.getDocument(id));
  }

  async index(document) {
    for (const field of document.fields) {
      if (field.isIndexible) {
        const tokens = field.value.split(" ");
        for (const [position, token] of tokens.entries()) {
          await this.database.insert(token, document.id, position);
        }
      }
    }
    await this.database.saveDocument(document);
  }
}
