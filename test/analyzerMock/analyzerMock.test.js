import AnalyzerMock from "../../src/analyzer/Analyzer";

describe("AnalyzerMock", () => {
  it("should split text into tokens", () => {
    // Example usage
    const modelPath = '"C:/Users/Coffee/Documents/morpho/epoch_3_prec_81";';  // Replace with the actual path to your model files
    const analyzer = new AnalyzerMock(modelPath);

    const inflectedWords = ["በቤቶች", "ሰበርን", "ሰበርሸ"];
    for (const word of inflectedWords) {
      const rootWord = analyzer.analyze(word);
      console.log(`Inflected Word: ${word}`);
      console.log(`Root Word: ${rootWord}`);
    }

    // const analyzer = new AnalyzerMock();
    const text = "The quick brown fox jumps over the lazy dog";
    const expectedTokens = [
      "The",
      "quick",
      "brown",
      "fox",
      "jumps",
      "over",
      "the",
      "lazy",
      "dog",
    ];
    expect(analyzer.analyze(text)).toEqual(expectedTokens);
  });
});
