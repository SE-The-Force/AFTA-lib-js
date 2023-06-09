/**
 * Class representing a document.
 * @class
 */
export default class Document {
  /**
   * Create a document.
   * @constructor
   * @param {string} id - The ID of the document.
   */
  constructor(id) {
    this.id = id;
    this.fields = [];
    this.fieldMap = new Map();
  }

  /**
   * Add a field to the document.
   * @param {Field} field - The field to add.
   */
  add(field) {
    this.fields.push(field);
    this.fieldMap.set(field.key, field);
  }

  /**
   * Get a field from the document by name.
   * @param {string} name - The name of the field.
   * @returns {Field|null} The field with the specified name, or null if not found.
   */
  getField(name) {
    return this.fieldMap.get(name);
  }

  /**
   * Check if the document is equal to another document.
   * @param {Document} other - The other document to compare with.
   * @returns {boolean} True if the documents are equal, false otherwise.
   */
  equals(other) {
    if (this === other) return true;
    if (!(other instanceof Document)) return false;

    if (this.id !== other.id) return false;
    return this.fieldsAreEqual(other);
  }

  /**
   * Compute the hash code for the document.
   * @returns {number} The computed hash code.
   */
  hashCode() {
    let result = this.id;
    result = 31 * result + this.fieldsHashCode();
    return result;
  }

  /**
   * Compute the hash code for the document's fields.
   * @returns {number} The computed hash code.
   */
  fieldsHashCode() {
    let result = 1;
    for (let field of this.fields) {
      result = 31 * result + field.hashCode();
    }
    return result;
  }

  /**
   * Check if the fields of the document are equal to the fields of another document.
   * @param {Document} other - The other document to compare the fields with.
   * @returns {boolean} True if the fields are equal, false otherwise.
   */
  fieldsAreEqual(other) {
    if (this.fields.length !== other.fields.length) {
      return false;
    }

    const otherFieldsSet = new Set(other.fields);

    for (let field of this.fields) {
      if (!otherFieldsSet.has(field)) {
        return false;
      }
    }

    return true;
  }
}
