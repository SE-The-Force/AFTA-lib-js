export default class AnalyzerMock {
  constructor() {}

  tokens(text) {
    return text.split(" ");
  }

  analyze(text) {
    const tokens = this.tokens(text);
    // TODO: analyze tokens
    return tokens;
  }
}
