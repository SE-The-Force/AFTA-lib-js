import Term from "../../src/term/Term";
const TermQuery = require("../../src/query/TermQuery");
const Hits = require("../../src/hits/Hits");

describe("TermQuery", () => {
    it("search returns hits with documents containing term text", async () => {
        const term = new Term("field", "text");
        const query = new TermQuery(term);
        const doc1 = { id: 1 };
        const doc2 = { id: 2 };
        const indexer = {
            getDocument: jest.fn((id) => (id === 1 ? doc1 : doc2)),
            getDocuments: jest.fn((ids) => ids.map((id)=> indexer.getDocument(id))),
            database: {
                search: jest.fn(() => ({
                    ids: [1, 2],
                    frequencies: [2, 1],
                    position: [0, 10]
                })),
                getTotalDocuments: jest.fn(() => 2),
                getNumDocsTokenBelongsTo : jest.fn(()=>3),

            },
            getTotalDocuments: jest.fn(() => 2),
            
        };

        const analyzer = {
            analyze:  jest.fn(() => ['text']),
        };

        const hits = await query.search(indexer, analyzer);

        expect(hits.totalHits).toBe(2);
        expect(hits.documents).toEqual([doc1, doc2]); // It's important to note the order of the documents
        expect(hits.scores[doc1.id]).toBeGreaterThan(hits.scores[doc2.id]); // Document 1 should have higher score because it has higher frequency
        expect(indexer.getDocument).toHaveBeenCalledWith(1);
        expect(indexer.getDocument).toHaveBeenCalledWith(2);
        expect(indexer.database.search).toHaveBeenCalledWith("text");
        expect(indexer.getTotalDocuments).toHaveBeenCalledTimes(1);
    });
});