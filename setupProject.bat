@echo off
cd src
md analyzer cache database document field hits indexer indexSearcher query term parser\html_parser parser\pdf_parser main
echo. > analyzer\Analyzer.js
echo. > analyzer\IAnalyzerMock.js
echo. > cache\Cache.js
echo. > database\IDatabase.js
echo. > database\SQLiteDatabase.js
echo. > document\Document.js
echo. > field\Field.js
echo. > hits\Hits.js
echo. > indexer\Indexer.js
echo. > indexSearcher\IndexSearcher.js
echo. > query\BooleanQuery.js
echo. > query\PhraseQuery.js
echo. > query\Query.js
echo. > query\TermQuery.js
echo. > term\Term.js
echo. > parser\Parser.js
echo. > parser\html_parser\HtmlParser.js
echo. > parser\pdf_parser\PdfParser.js
echo. > main\App.js
cd ..
cd test
md document indexer indexSearcher mocks pdf_parser
echo. > document\DocumentTest.js
echo. > indexer\DocumentPersistenceTest.js
echo. > indexer\IndexerTest.js
echo. > indexSearcher\IndexSearcherTest.js
echo. > mocks\DatabaseMock.js
echo. > pdf_parser\PdfParserTest.js
cd ..
echo Project structure has been created successfully.
