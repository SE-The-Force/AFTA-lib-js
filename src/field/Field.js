/**
 * Class representing a field.
 * @class
 */
export default class Field {
  /**
   * Create a field.
   * @constructor
   * @param {string} key - The key of the field.
   * @param {string} value - The value of the field.
   * @param {string} [analyzedValue=""] - The analyzed value of the field.
   * @param {boolean} [isAnalyzed=false] - Whether the field is analyzed.
   * @param {boolean} [isIndexible=false] - Whether the field is indexable.
   * @param {boolean} [isStored=false] - Whether the field is stored.
   */
  constructor(
    key,
    value,
    analyzedValue = "",
    isAnalyzed = false,
    isIndexible = false,
    isStored = false
  ) {
    this.key = key;
    this.value = value;
    this.analyzedValue = analyzedValue;
    this.isAnalyzed = isAnalyzed;
    this.isIndexible = isIndexible;
    this.isStored = isStored;
  }

  /**
  * Compute the hash code for the field.
  * @returns {number} The computed hash code.
  */
  hashCode() {
    let result = this.key;
    result = 31 * result + this.value;
    result = 31 * result + this.analyzedValue;
    result = 31 * result + this.isAnalyzed;
    result = 31 * result + this.isIndexible;
    result = 31 * result + this.isStored;
    return result;
  }
}
