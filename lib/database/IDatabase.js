"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * IDatabase interface.
 * This class should be extended and methods should be overridden.
 */
class IDatabase {
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
exports.default = IDatabase;