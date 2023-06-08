import axios from 'axios';
import AmharicPreprocessor from "./AmharicPreprocessor";

export default class Analyzer {
  constructor(analyzerUrl) {
    this.analyzerUrl = analyzerUrl;
  }

  static tokens(text) {
    return text.split(' ');
  }

  async preprocess(text) {
    text = AmharicPreprocessor.removePunctuation(text);
    text = AmharicPreprocessor.removeNonAmharicChars(text);
    text = AmharicPreprocessor.removeExtraSpaces(text);
    text = AmharicPreprocessor.removeStopWords(text);
    return AmharicPreprocessor.normalize(text);
  }

  async analyze(text) {
    const preprocessedText = await this.preprocess(text);
    const tokens = Analyzer.tokens(preprocessedText);
    
    try {
      const response = await axios.post(this.analyzerUrl, {
        words: tokens,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data.rootWords;
    } catch (error) {
      throw error;
    }
  }
}
