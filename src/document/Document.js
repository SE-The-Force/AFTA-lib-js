export default class Document {
  constructor(id) {
    this.id = id;
    this.fields = [];
  }

  add(field) {
    this.fields.push(field);
  }

  equals(other) {
    if (this === other) return true;
    if (!(other instanceof Document)) return false;

    if (this.id !== other.id) return false;
    return this.fieldsAreEqual(other);
  }

  hashCode() {
    let result = this.id;
    result = 31 * result + this.fieldsHashCode();
    return result;
  }

  fieldsHashCode() {
    let result = 1;
    for (let field of this.fields) {
      result = 31 * result + field.hashCode();
    }
    return result;
  }

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
