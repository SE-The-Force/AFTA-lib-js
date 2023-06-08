"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Parser = _interopRequireDefault(require("../Parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import pdfjsLib from "pdfjs-dist";

class PdfParser extends _Parser.default {
  constructor(location) {
    super(location);
  }
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
      const strings = content.items.map(item => item.str);
      data.push([pdfPath, i, strings.join("")]);
    }
    return data;
  }
}
exports.default = PdfParser;