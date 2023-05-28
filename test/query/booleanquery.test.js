import Term from "../../src/term/Term";
import BooleanQuery from "../../src/query/BooleanQuery";
import Hits from "../../src/hits/Hits";

describe("BooleanQuery", () => {
  test("search with AND operator returns intersection of documents", async () => {
    const doc1 = { id: 1 };
    const doc2 = { id: 2 };
    const doc3 = { id: 3 };
    const query1 = {
      search: jest.fn(() => new Hits(2, [doc1, doc2])),
    };
    const query2 = {
      search: jest.fn(() => new Hits(2, [doc2, doc3])),
    };
    const query = new BooleanQuery([query1, query2], "AND");
    const indexer = {};
    expect(await query.search(indexer)).toEqual(new Hits(1, [doc2]));
    expect(query1.search).toHaveBeenCalledWith(indexer);
    expect(query2.search).toHaveBeenCalledWith(indexer);
  });

  test("search with OR operator returns union of documents", async () => {
    const doc1 = { id: 1 };
    const doc2 = { id: 2 };
    const doc3 = { id: 3 };
    const query1 = {
      search: jest.fn(() => new Hits(2, [doc1, doc2])),
    };
    const query2 = {
      search: jest.fn(() => new Hits(2, [doc2, doc3])),
    };
    const query = new BooleanQuery([query1, query2], "OR");
    const indexer = {};
    expect(await query.search(indexer)).toEqual(
      new Hits(3, [doc1, doc2, doc3])
    );
    expect(query1.search).toHaveBeenCalledWith(indexer);
    expect(query2.search).toHaveBeenCalledWith(indexer);
  });

  test("search with NOT operator returns difference of documents", async () => {
    const doc1 = { id: 1 };
    const doc2 = { id: 2 };
    const doc3 = { id: 3 };
    const query1 = {
      search: jest.fn(() => new Hits(2, [doc1, doc2])),
    };
    const query2 = {
      search: jest.fn(() => new Hits(2, [doc2, doc3])),
    };
    const query = new BooleanQuery([query1, query2], "NOT");
    const indexer = {};
    expect(await query.search(indexer)).toEqual(new Hits(1, [doc1]));
    expect(query1.search).toHaveBeenCalledWith(indexer);
    expect(query2.search).toHaveBeenCalledWith(indexer);
  });
});
