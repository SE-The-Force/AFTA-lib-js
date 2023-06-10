import Term from "../../src/term/Term";
import PhraseQuery from "../../src/query/PhraseQuery";
import Hits from "../../src/hits/Hits";
import Analyzer from "../../src/analyzer/Analyzer";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";
import SQLiteDatabase from "../../src/database/SQLiteDatabase";
import Indexer from "../../src/indexer/Indexer";
import IndexSearcher from "../../src/indexSearcher/IndexSearcher";
import PdfParser from "../../src/parser/pdf_parser/PdfParser";

describe("PhraseQuery", () => {
  test("search returns hits with documents containing phrase in field", async () => {
    const analyzer = new Analyzer("http://172.17.0.2:5000/analyze");
    const db = new SQLiteDatabase('phrase.db')
    await db.connect();
    const indexer = new Indexer(analyzer, db);
    const searcher = new IndexSearcher(indexer, analyzer);
    // Parse a PDF file using the PdfParser class
    const pdfParser = new PdfParser("./test/pdf_parser/file4.pdf");
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
    const query1 = new PhraseQuery(" ኢትዮጵያ ዘመን አቆጣጠር");
    const query2 = new PhraseQuery(" ኢትዮጵያ አቆጣጠር");

    expect((await query1.search(indexer, analyzer)).totalHits).toBeGreaterThan(0)
    expect((await query2.search(indexer, analyzer)).totalHits).toEqual(0);
  },50000);
});
