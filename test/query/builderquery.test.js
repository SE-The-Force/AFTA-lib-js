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
import { BooleanQuery, PhraseQuery, BuilderQuery } from "../../src";

test('BuilderQuery should correctly execute queries in sequence', async () => {
  const analyzer = new Analyzer("http://172.17.0.2:5000/analyze");
  const database = new SQLiteDatabase("builder_test.db");
  await database.connect();
  const indexer = new Indexer(analyzer, database);
  const searcher = new IndexSearcher(indexer, analyzer);

   // Parse a PDF file using the PdfParser class
  const pdfParser = new PdfParser("./test/pdf_parser/file4.pdf");
  const parsedData = await pdfParser.parse();
  // Create a document for each page of the PDF file
  const docs = [];
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
    // await indexer.addDocument(document);
    docs.push(document);
  }
  await indexer.addAllDocument(docs);

  // Create TermQuery instances
  const query1 = new TermQuery(new Term("content", "ዘመን"));
  const query2 = new TermQuery(new Term("content", "ኢትዮጵያ"));

  // Create BooleanQuery instances
  const booleanQuery = new BooleanQuery([query1, query2], "AND");

  // Create PhraseQuery instance
  const phraseQuery = new PhraseQuery("ኢትዮጵያ እና ዘመን");

  // Create BuilderQuery instance
  const builderQuery = new BuilderQuery();
  builderQuery.build(query1);
  builderQuery.build(query2);
  builderQuery.build(booleanQuery);
  builderQuery.build(phraseQuery);

  // Execute the BuilderQuery
  const result = await builderQuery.execute(indexer, analyzer);

  // Validate the result
  expect(result.totalHits).toBeGreaterThan(0);
  expect(result.documents[0].id).toEqual("./test/pdf_parser/file4.pdf-1");
}, 100000);
