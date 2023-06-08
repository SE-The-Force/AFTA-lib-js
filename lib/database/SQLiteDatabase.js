"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _IDatabase = _interopRequireDefault(require("./IDatabase"));
var _Document = _interopRequireDefault(require("../document/Document"));
var _Field = _interopRequireDefault(require("../field/Field"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sqlite3 = require("sqlite3").verbose();
class SQLiteDatabase extends _IDatabase.default {
  constructor(databaseName) {
    super();
    this.db = new sqlite3.Database(`${databaseName}`);
  }
  async connect() {
    return new Promise((resolve, reject) => {
      this.db.on('open', async err => {
        if (err) {
          reject(new Error("Failed to connect to database"));
        } else {
          await this.createTables();
          resolve();
        }
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.db.close(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  createTables() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS index_table (
            token TEXT, 
            doc_id TEXT, 
            position INTEGER,
            frequency INTEGER,
            doc_freq INTEGER)`, err => {
          if (err) reject(err);
        });
        this.db.run(`CREATE TABLE IF NOT EXISTS documents_table (
        doc_id TEXT PRIMARY KEY)`, err => {
          if (err) reject(err);
        });
        this.db.run(`CREATE TABLE IF NOT EXISTS fields_table (
        key TEXT, 
        value TEXT, 
        analyzed_value TEXT, 
        is_analyzed INTEGER, 
        is_indexible INTEGER, 
        is_stored INTEGER, 
        doc_id TEXT)`, err => {
          if (err) reject(err);else resolve();
        });
      });
    });
  }
  async getTotalDocuments() {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT COUNT(DISTINCT doc_id) as total FROM index_table", [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.total);
        }
      });
    });
  }
  async insert(token, docId, position, frequency) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("INSERT INTO index_table (token, doc_id, position, frequency) VALUES (?, ?, ?, ?)");
      stmt.run(token, docId, position, frequency, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      stmt.finalize();
    });
  }
  search(token) {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT doc_id, frequency, doc_freq FROM index_table WHERE token = ?", [token], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const ids = rows.map(row => row.doc_id);
          const frequencies = rows.map(row => row.frequency);
          const doc_freqs = rows.map(row => row.doc_freq);
          resolve({
            ids,
            frequencies,
            doc_freqs
          });
        }
      });
    });
  }
  saveDocument(document) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt1 = this.db.prepare("INSERT OR REPLACE INTO documents_table (doc_id) VALUES (?)");
        stmt1.run(document.id, err => {
          if (err) {
            reject(err);
            return;
          }
          stmt1.finalize();
          for (let field of document.fields) {
            const stmt2 = this.db.prepare("INSERT INTO fields_table (key, value, analyzed_value, is_analyzed, is_indexible, is_stored, doc_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
            stmt2.run(field.key, field.value, field.analyzedValue, field.isAnalyzed ? 1 : 0, field.isIndexible ? 1 : 0, field.isStored ? 1 : 0, document.id, err => {
              if (err) {
                reject(err);
                return;
              }
              stmt2.finalize();
            });
          }
          resolve();
        });
      });
    });
  }
  async getDocument(id) {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM documents_table INNER JOIN fields_table ON documents_table.doc_id = fields_table.doc_id WHERE documents_table.doc_id = ?", [id], (err, rows) => {
        if (err) {
          reject(err);
        } else if (rows.length > 0) {
          let document = new _Document.default(id);
          for (let row of rows) {
            let field = new _Field.default(row.key, row.value, row.analyzed_value, !!row.is_analyzed, !!row.is_indexible, !!row.is_stored);
            document.add(field);
          }
          resolve(document);
        } else {
          resolve(null);
        }
      });
    });
  }
}
exports.default = SQLiteDatabase;
module.exports = SQLiteDatabase;