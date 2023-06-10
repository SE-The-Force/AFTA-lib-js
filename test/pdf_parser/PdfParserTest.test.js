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

  test("parse returns parsed data from actual PDF file", async () => {
    const tempFilePath = "./test/pdf_parser/file.pdf";
    const parser = new PdfParser(tempFilePath);
    const data = await parser.parse();
    // Check if the returned data matches the expected data from the PDF file
    expect(data).toEqual([
      ["Book Title", "Page Number", "Content"],
      [tempFilePath, 1, "Test text"],
    ]);
  });
});
