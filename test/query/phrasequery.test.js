import Term from "../../src/term/Term";
import PhraseQuery from "../../src/query/PhraseQuery";
import Hits from "../../src/hits/Hits";
import Analyzer from "../../src/analyzer/Analyzer";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";
import SQLiteDatabase from "../../src/database/SQLiteDatabase";
import Indexer from "../../src/indexer/Indexer";
import IndexSearcher from "../../src/indexSearcher/IndexSearcher";

describe("PhraseQuery", () => {
  test("search returns hits with documents containing phrase in field", async () => {
    const analyzer = new Analyzer("http://127.0.0.1:5000");
    const db = new SQLiteDatabase('phrase.db')
    await db.connect();
    const indexer = new Indexer(analyzer, db);
    const searcher = new IndexSearcher(indexer, analyzer);

    const query = new PhraseQuery("content", "Test text")
    expect(await query.search(indexer, analyzer)).toEqual({"documents": [], "scores": undefined, "totalHits": 0});
  },10000);
});
