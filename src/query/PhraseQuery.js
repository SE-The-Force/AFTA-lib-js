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
   * @param {string} phrase - The phrase to search for.
   */
  constructor(phrase) {
    super();
    this.phrase = phrase;
  }

  /**
   * Search the index using the Phrase query.
   * @param {Indexer} indexer - The indexer instance.
   * @returns {Promise<Hits>} A promise that resolves with the search hits.
   */
  async search(indexer, analyzer) {
    const tokens = await analyzer.analyze(this.phrase);
    if(tokens.length === 0){
      return new Hits(0,[]);
    }
    const hits = [];
    const documentIds = [];
    const positionIndices = [];

    let docIdsSet = undefined;
    const docId_token_position = {}
    for(let token of tokens){
      const {ids, positions} = await indexer.database.search(token);
      const set1 = new Set(ids);
      if (!docIdsSet){
        docIdsSet = set1;
      }else{
        docIdsSet = new Set([...docIdsSet].filter(i => set1.has(i)));
      }
      for(let i=0;i<ids.length;i++){
        const docId = ids[i];
        if(!(docId in docId_token_position)){
          docId_token_position[docId] = {}
        }
        if(!(token in docId_token_position[docId])){
          docId_token_position[docId][token] = new Set();
        }
        docId_token_position[docId][token].add(positions[i])
      }
    }

    let ts = tokens.slice(1);
    for(const docId of docIdsSet){
      let first = docId_token_position[docId][tokens[0]]
      let found = true;
      for(const startPoint of first){
        let cur = startPoint;
        found = true;
        for(let token of ts){
          if(docId_token_position[docId][token].has(cur + 1)){
            cur = cur + 1
          }else{
            found = false;
            break;
          }
        }
        if(found){
          break;
        }
      }
      if(found){
        hits.push(await indexer.getDocument(docId));
      }
    }

    return new Hits(hits.length, hits);
  }
}
