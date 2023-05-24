/*
 * IDatabase interface.
 * This class should be extended and methods should be overridden.
 */
export default class IDatabase {
  insert(token, docId, position) {
    // to be overridden
  }

  search(token) {
    // to be overridden
  }

  saveDocument(document) {
    // to be overridden
  }

  getDocument(id) {
    // to be overridden
  }
}
