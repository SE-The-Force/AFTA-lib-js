import axios from 'axios';
import AmharicPreprocessor from "./AmharicPreprocessor";

/**
 * Class representing an Analyzer.
 * @class
 */
export default class Analyzer {
  /**
   * Create an Analyzer.
   * @constructor
   * @param {string} analyzerUrl - The URL of the analyzer.
   */
  constructor(analyzerUrl) {
    this.analyzerUrl = analyzerUrl;
  }

  /**
   * Split the text into tokens.
   * @param {string} text - The input text.
   * @returns {string[]} An array of tokens.
   */
  static tokens(text) {
    return text.split(' ');
  }

   /**
   * Preprocess the text by applying various operations.
   * @param {string} text - The input text.
   * @returns {Promise<string>} A promise that resolves with the preprocessed text.
   */
  async preprocess(text) {
    text = AmharicPreprocessor.removePunctuation(text);
    text = AmharicPreprocessor.removeNonAmharicChars(text);
    text = AmharicPreprocessor.removeExtraSpaces(text);
    text = AmharicPreprocessor.removeStopWords(text);
    return AmharicPreprocessor.normalize(text);
  }

  /**
   * Analyze the text by sending it to the analyzer service.
   * @param {string} text - The input text.
   * @returns {Promise<string[]>} A promise that resolves with the analyzed words.
   * @throws {Error} If an error occurs during analysis.
   */
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
      return [];
    }
  }
}
