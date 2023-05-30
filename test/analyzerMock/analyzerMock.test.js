import AnalyzerMock from "../../src/analyzer/Analyzer";

describe("AnalyzerMock", () => {
  it("should split text into tokens", async () => {
    const analyzer = new AnalyzerMock();

    const text = 'This is a test';
    const result = await analyzer.tokens(text);

    expect(result).toEqual(['This', 'is', 'a', 'test']);
  },60000);

  it("should normalize and analyze text", async () => {
    const analyzer = new AnalyzerMock();

    const text = 'ይህ ምርመራ ነው';
    const result = await analyzer.analyze(text);
  },60000);
});
