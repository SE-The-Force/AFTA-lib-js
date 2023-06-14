import HtmlParser from "../../src/parser/html_parser/HtmlParser";

describe("PdfParser", () => {
  test("isStored returns correct value for header", () => {
    const parser = new HtmlParser("location");
    expect(parser.isStored("url")).toBe(true);
    expect(parser.isStored("Content")).toBe(true);
    expect(parser.isStored("Other")).toBe(false);
  });

  test("isIndexable returns correct value for header", () => {
    const parser = new HtmlParser("location");
    expect(parser.isIndexable("url")).toBe(false);
    expect(parser.isIndexable("Content")).toBe(true);
    expect(parser.isIndexable("Other")).toBe(false);
  });

  test("isAnalyzed returns correct value for header", () => {
    const parser = new HtmlParser("location");
    expect(parser.isAnalyzed("url")).toBe(false);
    expect(parser.isAnalyzed("Content")).toBe(true);
    expect(parser.isAnalyzed("Other")).toBe(false);
  });

  test("parse url and return list", async () => {
    const parser = new HtmlParser("https://www.hanaelias.org",2);
    const data = await parser.crawl();
    expect(data.length).toBeGreaterThan(0);
  },1000000);
});
