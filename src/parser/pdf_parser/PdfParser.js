import Parser from "../Parser";
// import pdfjsLib from "pdfjs-dist";

/**
 * Class representing a PDF Parser.
 * @extends Parser
 */
export default class PdfParser extends Parser {
  /**
   * Create a PDF Parser.
   * @constructor
   * @param {string} location - The location of the PDF file.
   */
  constructor(location) {
    super(location);
  }

  /**
   * Check if the header is stored.
   * @param {string} header - The header to check.
   * @returns {boolean} `true` if the header is stored, `false` otherwise.
   */
  isStored(header) {
    switch (header) {
      case "Book Title":
        return false;
      case "Page Number":
        return true;
      case "Content":
        return true;
      default:
        return false;
    }
  }

  /**
   * Check if the header is indexable.
   * @param {string} header - The header to check.
   * @returns {boolean} `true` if the header is indexable, `false` otherwise.
   */
  isIndexable(header) {
    switch (header) {
      case "Book Title":
        return true;
      case "Page Number":
        return false;
      case "Content":
        return true;
      default:
        return false;
    }
  }

   /**
   * Check if the header is analyzed.
   * @param {string} header - The header to check.
   * @returns {boolean} `true` if the header is analyzed, `false` otherwise.
   */
  isAnalyzed(header) {
    switch (header) {
      case "Book Title":
        return false;
      case "Page Number":
        return false;
      case "Content":
        return true;
      default:
        return false;
    }
  }

  /**
   * Parse the PDF file and extract the content.
   * @returns {Promise<Array<Array<string>>>} A promise that resolves with the parsed data as a 2D array.
   */
  async parse() {
    const data = [["Book Title", "Page Number", "Content"]];
    const pdfPath = this.location;
    const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      data.push([pdfPath, i, strings.join("")]);
    }
    return data;
  }
}
