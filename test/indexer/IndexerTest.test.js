import Indexer from "../../src/indexer/Indexer";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";
import AnalyzerMock from "../../src/analyzer/Analyzer";

const analyzerMock = new AnalyzerMock();

// Create the mockDatabase object here
const mockDatabase = {
  initialize: jest.fn(),
  query: jest.fn(),
  close: jest.fn(),
  createTables: jest.fn(),
  insert: jest.fn(),
  search: jest.fn(),
  saveDocument: jest.fn(),
  getDocument: jest.fn(),
};

mockDatabase.initialize.mockResolvedValue();
mockDatabase.query.mockResolvedValue([{ id: 1, name: "John" }]);
mockDatabase.close.mockResolvedValue();
mockDatabase.createTables.mockResolvedValue();
mockDatabase.insert.mockResolvedValue();
mockDatabase.search.mockResolvedValue(["doc1", "doc2"]);
mockDatabase.saveDocument.mockResolvedValue();
mockDatabase.getDocument.mockResolvedValue({ id: "doc1", fields: [] });

test("should correctly add a document to the index", async () => {
  const indexer = new Indexer(analyzerMock, mockDatabase);
  const document = new Document("testId");
  const field = new Field("key", "value1 value2", "", false, true, true);

  document.add(field);
  await indexer.addDocument(document);

  expect(await indexer.getDocument("testId")).toEqual(document);
}, 10000);

test("should retrieve a document from the cache", async () => {
  const indexer = new Indexer(analyzerMock, mockDatabase); // Use the mockDatabase object here
  const document = new Document("testId");
  const field = new Field("key", "value1 value2", "", false, true, true);

  document.add(field);
  await indexer.addDocument(document);

  const cachedDocument = await indexer.getDocument("testId");
  expect(cachedDocument).toEqual(document);
});
