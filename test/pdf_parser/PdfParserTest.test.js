import PdfParser from "../../src/parser/pdf_parser/PdfParser";
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");

describe("PdfParser", () => {
  test("isStored returns correct value for header", () => {
    const parser = new PdfParser("location");
    expect(parser.isStored("Book Title")).toBe(false);
    expect(parser.isStored("Page Number")).toBe(true);
    expect(parser.isStored("Content")).toBe(true);
    expect(parser.isStored("Other")).toBe(false);
  });

  test("isIndexable returns correct value for header", () => {
    const parser = new PdfParser("location");
    expect(parser.isIndexable("Book Title")).toBe(true);
    expect(parser.isIndexable("Page Number")).toBe(false);
    expect(parser.isIndexable("Content")).toBe(true);
    expect(parser.isIndexable("Other")).toBe(false);
  });

  test("isAnalyzed returns correct value for header", () => {
    const parser = new PdfParser("location");
    expect(parser.isAnalyzed("Book Title")).toBe(false);
    expect(parser.isAnalyzed("Page Number")).toBe(false);
    expect(parser.isAnalyzed("Content")).toBe(true);
    expect(parser.isAnalyzed("Other")).toBe(false);
  });

  test("parse returns parsed data from PDF file", async () => {
    jest.doMock("pdfjs-dist/legacy/build/pdf.js", () => ({
      getDocument: jest.fn(() => ({
        promise: Promise.resolve({
          numPages: 2,
          getPage: jest.fn((pageNum) =>
            Promise.resolve({
              getTextContent: jest.fn(() =>
                Promise.resolve({
                  items: [
                    { str: `Page ${pageNum} Text 1` },
                    { str: `Page ${pageNum} Text 2` },
                  ],
                })
              ),
            })
          ),
        }),
      })),
    }));

    // Clear the require cache to ensure that the PdfParser module uses the mocked version of pdfjs-dist
    jest.resetModules();
    const PdfParser = require("../../src/parser/pdf_parser/PdfParser").default;

    const parser = new PdfParser("location");
    const data = await parser.parse();
    expect(data).toEqual([
      ["Book Title", "Page Number", "Content"],
      ["location", 1, "Page 1 Text 1Page 1 Text 2"],
      ["location", 2, "Page 2 Text 1Page 2 Text 2"],
    ]);
  });

  test("parse returns parsed data from actual PDF file", async () => {
    jest.dontMock("pdfjs-dist/legacy/build/pdf.js");
    jest.resetModules();
    // Create a new PDF document with some content
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    page.drawText("Test text", {
      x: 100,
      y: page.getHeight() - 100,
      font,
      size: fontSize,
    });
    const pdfBytes = await pdfDoc.save();
    const tempFilePath = "./test/pdf_parser/file.pdf";
    fs.writeFileSync(tempFilePath, pdfBytes);

    // Parse the PDF file using the PdfParser class
    const parser = new PdfParser(tempFilePath);
    const data = await parser.parse();
    // Check if the returned data matches the expected data from the PDF file
    expect(data).toEqual([
      ["Book Title", "Page Number", "Content"],
      [tempFilePath, 1, "Test text"],
    ]);
  });
});
