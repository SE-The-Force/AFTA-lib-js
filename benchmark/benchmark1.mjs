import pkg from '../lib/index.js';
const { Analyzer, Document, Field, SQLiteDatabase, IndexSearcher, Indexer, Hits, PdfParser, Term, TermQuery, BooleanQuery, PhraseQuery } = pkg;
(async () => {
    // gunicorn -w 1 -b 0.0.0.0:5002 --timeout 60000 --log-level=debug analyzer:app
    console.time("Total");
    const analyzer = new Analyzer("http://0.0.0.0:5002/analyze");
    const database = new SQLiteDatabase("test.db");
    console.time("Database Connection");
    await database.connect();
    console.timeEnd("Database Connection");
    const indexer = new Indexer(analyzer, database);
    const searcher = new IndexSearcher(indexer, analyzer);

    console.time("PDF Parsing");
    const pdfParser = new PdfParser("./file4.pdf");
    const parsedData = await pdfParser.parse();
    console.timeEnd("PDF Parsing");

    console.time("Document Creation");
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
    docs.push(document);
    }
    console.timeEnd("Document Creation");

    console.time("Indexing");
    await indexer.addAllDocument(docs);
    console.timeEnd("Indexing");

    console.time("Searching");
    const query = new TermQuery(new Term("content", "ዘመን"));
    const query2 = new TermQuery(new Term("content", "ኢትዮጵያ"));
    const boolean = new BooleanQuery([query, query2], "AND");
    const boolean2 = new BooleanQuery([query, query2], "OR");
    const phrase = new PhraseQuery("ኢትዮጵያ እና ዘመን");
    const phrase2 = new PhraseQuery("ዘመን ኢትዮጵያ");

    const hits = await searcher.search(query);
    const hits2 = await searcher.search(boolean);
    const hits3 = await searcher.search(boolean2);
    const hits4 = await searcher.search(phrase);
    const hits5 = await searcher.search(phrase2);
    console.timeEnd("Searching");

    console.timeEnd("Total");
})();