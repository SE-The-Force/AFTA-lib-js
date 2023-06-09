/**
 * Class representing a Term.
 */
export default class Term {
  /**
   * Create a Term.
   * @constructor
   * @param {string} field - The field associated with the term.
   * @param {string} text - The text of the term.
   */
  constructor(field, text) {
    this.field = field;
    this.text = text;
  }
}
