import AmharicPreprocessor from "./AmharicPreprocessor";

export default class AnalyzerMock {
  constructor() {}

  tokens(text) {
    return text.split(' ');
  }

  async analyze(text) {
    const tokens = this.tokens(text);
    // analyze
    return tokens; 
  }
}