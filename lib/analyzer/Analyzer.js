"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _AmharicPreprocessor = _interopRequireDefault(require("./AmharicPreprocessor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Analyzer {
  constructor(analyzerUrl) {
    this.analyzerUrl = analyzerUrl;
  }
  static tokens(text) {
    return text.split(' ');
  }
  async preprocess(text) {
    text = _AmharicPreprocessor.default.removePunctuation(text);
    text = _AmharicPreprocessor.default.removeNonAmharicChars(text);
    text = _AmharicPreprocessor.default.removeExtraSpaces(text);
    text = _AmharicPreprocessor.default.removeStopWords(text);
    return _AmharicPreprocessor.default.normalize(text);
  }
  async analyze(text) {
    const preprocessedText = await this.preprocess(text);
    const tokens = Analyzer.tokens(preprocessedText);
    try {
      const response = await _axios.default.post(this.analyzerUrl, {
        words: tokens
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data.rootWords;
    } catch (error) {
      throw error;
    }
  }
}
exports.default = Analyzer;