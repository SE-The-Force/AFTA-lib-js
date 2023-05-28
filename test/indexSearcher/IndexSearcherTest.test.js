import Query from "../../src/query/Query";
import IndexSearcher from "../../src/indexSearcher/IndexSearcher";
import Hits from "../../src/hits/Hits";
import Cache from "../../src/cache/Cache";

describe("IndexSearcher", () => {
  test("search returns result from cache if query exists", async () => {
    const indexer = {
      getDocument: jest.fn(),
    };
    const query = {
      search: jest.fn(),
    };
    const hits = new Hits(1, []);
    const cache = new Cache(1);
    cache.put(query, hits);
    const searcher = new IndexSearcher(indexer);
    searcher.searchCache = cache;
    expect(await searcher.search(query)).toBe(hits);
    expect(query.search).not.toHaveBeenCalled();
  });

  test("search calls query search if query does not exist in cache", async () => {
    const indexer = {
      getDocument: jest.fn(),
    };
    const query = {
      search: jest.fn(),
    };
    const hits = new Hits(1, []);
    query.search.mockReturnValue(hits);
    const searcher = new IndexSearcher(indexer);
    expect(await searcher.search(query)).toBe(hits);
    expect(query.search).toHaveBeenCalledWith(indexer);
  });
});
