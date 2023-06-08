import Term from "../../src/term/Term";
import PhraseQuery from "../../src/query/PhraseQuery";
import Hits from "../../src/hits/Hits";

describe("PhraseQuery", () => {
  test("search returns hits with documents containing phrase in field", async () => {
    const field = "field";
    const phrase = "text1 text2";
    const query = new PhraseQuery(field, phrase);
    const doc1 = {
      id: 1,
      fields: {
        [field]: "text1 text2",
      },
    };
    const doc2 = {
      id: 2,
      fields: {
        [field]: "text1 text3",
      },
    };
    const indexer = {
      database: {
        search: jest.fn(() => [1]),
      },
      getDocument: jest.fn((id) => (id === 1 ? doc1 : doc2)),
    };
    const analyzer = {
      analyze:  jest.fn(() => ['']),
    };
    expect(await query.search(indexer, analyzer)).toEqual(new Hits(1, [doc1]));
  });
});
