import Term from "../../src/term/Term";
import NotQuery from "../../src/query/NotQuery";
import Hits from "../../src/hits/Hits";
import Analyzer from "../../src/analyzer/Analyzer";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";
import SQLiteDatabase from "../../src/database/SQLiteDatabase";
import Indexer from "../../src/indexer/Indexer";
import IndexSearcher from "../../src/indexSearcher/IndexSearcher";
import PdfParser from "../../src/parser/pdf_parser/PdfParser";


describe("NotQuery", () => {
    it('should return correct documents for NOT operator', async () => {
        const analyzer = new Analyzer("http://172.17.0.2:5000/analyze");
        const db = new SQLiteDatabase('not.db')
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
        const query1 = new NotQuery("ኢትዮጵያ");
        const query2 = new NotQuery("ከበደ");
        
        const hits1 = await query1.search(indexer, analyzer);
        const hits2 = await query2.search(indexer, analyzer);
        
          
        expect(hits1.totalHits).toEqual(0);
        expect(hits2.totalHits).toBeGreaterThan(0)
    },30000);
});