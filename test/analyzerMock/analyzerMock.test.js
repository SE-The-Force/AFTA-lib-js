import Analyzer from "../../src/analyzer/Analyzer";

describe("AnalyzerMock", () => {

  it("should normalize and analyze text", async () => {
    const analyzer = new Analyzer("http://172.17.0.2:5000/analyze");

    const text = 'ይህ ምርመራ ነው';
    const result = await analyzer.analyze(text);
    expect(result).toEqual(['ምርመራ', 'ነው'])
  },60000);

  
});
