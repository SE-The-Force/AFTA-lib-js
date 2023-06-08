import Analyzer from "../../src/analyzer/Analyzer";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";
import SQLiteDatabase from "../../src/database/SQLiteDatabase";
import Indexer from "../../src/indexer/Indexer";
import IndexSearcher from "../../src/indexSearcher/IndexSearcher";
import Hits from "../../src/hits/Hits";
import PdfParser from "../../src/parser/pdf_parser/PdfParser";
import Term from "../../src/term/Term";
import TermQuery from "../../src/query/TermQuery";

test("Integration test: parse PDF file, create documents, analyze, index and search", async () => {
  // Set up the components of your system
  const analyzer = new Analyzer("http://172.17.0.2:5000/analyze");
  const database = new SQLiteDatabase("test.db");
  await database.connect();
  const indexer = new Indexer(analyzer, database);
  const searcher = new IndexSearcher(indexer, analyzer);

  // Parse a PDF file using the PdfParser class
  const pdfParser = new PdfParser("./test/pdf_parser/file2.pdf");
  const parsedData = await pdfParser.parse();
  
  // Create a document for each page of the PDF file
  for (const [bookTitle, pageNumber, content] of parsedData.slice(1)) {
    const document = new Document(`${bookTitle}-${pageNumber}`);
    document.add(
      new Field(
        "bookTitle",
        bookTitle,
        "",
        pdfParser.isAnalyzed("Book Title"),
        pdfParser.isStored("Book Title"),
        pdfParser.isIndexable("Book Title")
      )
    );
    document.add(
      new Field(
        "pageNumber",
        pageNumber.toString(),
        "",
        pdfParser.isAnalyzed("Page Number"),
        pdfParser.isStored("Page Number"),
        pdfParser.isIndexable("Page Number")
      )
    );
    document.add(
      new Field(
        "content",
        content,
        "",
        pdfParser.isAnalyzed("Content"),
        pdfParser.isStored("Content"),
        pdfParser.isIndexable("Content")
      )
    );
    await indexer.addDocument(document);

  }
  // Search the index for a specific term
  const query = new TermQuery(new Term("content", "አማርኛ"));
  const hits = await searcher.search(query);

  // Verify that the search results are correct
  expect(hits.totalHits).toBeGreaterThan(0);
  for (const document of hits.documents) {
    expect(document.getField("content").value).toContain("አማርኛ");
  }
},10000);