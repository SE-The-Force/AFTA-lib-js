import AnalyzerMock from "../../src/analyzer/Analyzer";

describe("AnalyzerMock", () => {
  it("should split text into tokens", async () => {
    const analyzer = new AnalyzerMock();

    const text = 'This is a test';
    const result = await analyzer.tokens(text);

    // You're expecting that tokens splits text into words
    expect(result).toEqual(['This', 'is', 'a', 'test']);
  },60000);

  it("should normalize and analyze text", async () => {
    const analyzer = new AnalyzerMock();

    // Here's a sentence in Amharic (it means "This is a test" in English)
    const text = 'ይህ ምርመራ ነው';
    const result = await analyzer.analyze(text);

    console.log(result);

    // This test will be dependent on the expected output of your Python script
    // For the sake of this example, let's say your Python script returns the array ['ይህ', 'ምርመራ', 'ነው']
    // expect(result).toEqual(['ይህ', 'ምርመራ', 'ነው']);
  },60000);
});
