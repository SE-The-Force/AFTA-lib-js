import Term from "../../src/term/Term";
import TermQuery from "../../src/query/TermQuery";
import Hits from "../../src/hits/Hits";

describe("TermQuery", () => {
  test("search returns hits with documents containing term text", async () => {
    const term = new Term("field", "text");
    const query = new TermQuery(term);
    const doc1 = { id: 1 };
    const doc2 = { id: 2 };
    const indexer = {
      getDocument: jest.fn((id) => (id === 1 ? doc1 : doc2)),
      database: {
        search: jest.fn((text) => (text === "text" ? [1, 2] : [])),
      },
    };
    expect(await query.search(indexer)).toEqual(new Hits(2, [doc1, doc2]));
    expect(indexer.database.search).toHaveBeenCalledWith("text");
    expect(indexer.getDocument).toHaveBeenCalledWith(1);
    expect(indexer.getDocument).toHaveBeenCalledWith(2);
  });
});
