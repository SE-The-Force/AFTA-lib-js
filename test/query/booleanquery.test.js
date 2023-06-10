import Term from "../../src/term/Term";
import BooleanQuery from "../../src/query/BooleanQuery";
import Hits from "../../src/hits/Hits";

describe("BooleanQuery", () => {
  const indexer = {
    someMethod: jest.fn()
    // add any other methods or properties needed
  };

  it('should return correct documents for AND operator', async () => {
    const doc1 = { id: 1, score: 1.5 };
    const doc2 = { id: 2, score: 2.5 };
    const doc3 = { id: 3, score: 1.0 };
    
    const query1 = {
        search: jest.fn((indexer, analyzer) => Promise.resolve(new Hits(2, [doc1, doc2], {'1' : 1.5, '2' : 2.5})))
    };
    const query2 = {
        search: jest.fn((indexer, analyzer) => Promise.resolve(new Hits(2, [doc2, doc3], {'2':2.5, '3':1.0})  ))
    };
    
    const booleanQuery = new BooleanQuery([query1, query2], "AND");
    
    const result = await booleanQuery.search(indexer, {analyze : (token)=>[token]});
    
    expect(result.documents).toEqual([doc2]); // doc2 is in both queries
    expect(result.scores).toEqual({ '2': 5.0 }); // doc2 score is sum of query1 and query2 scores
});

it('should return correct documents for OR operator', async () => {
    const doc1 = { id: 1, score: 1.5 };
    const doc2 = { id: 2, score: 2.5 };
    const doc3 = { id: 3, score: 1.0 };
    
    const query1 = {
        search: jest.fn(() => Promise.resolve(new Hits(2, [doc1, doc2], {'1' : 1.5, '2' : 2.5})))
    };
    const query2 = {
        search: jest.fn(() => Promise.resolve(new Hits(2, [doc2, doc3], {'2':2.5, '3':1.0})  ))
    };
    
    const booleanQuery = new BooleanQuery([query1, query2], "OR");
    
    const result = await booleanQuery.search(indexer, {});
    
    expect(result.documents).toEqual([doc1, doc2, doc3]); // All documents are returned
    expect(result.scores).toEqual({ '1': 1.5, '2': 5.0, '3': 1.0 }); // scores are summed where applicable
});
});
