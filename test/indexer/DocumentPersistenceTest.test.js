import { describe, expect, test } from "@jest/globals";
import assert from "assert";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";
import SQLiteDatabase from "../../src/database/SQLiteDatabase";
import fs from "fs";

// Please delete test.db before running tests

describe("SQLiteDatabase", function () {
  let db;
  let dbName;

  beforeAll(async () => {
    db = new SQLiteDatabase(dbName);
    await db.createTables();
  });

  beforeEach(async () => {
    dbName = `test-${Date.now()}.db`;
    if (fs.existsSync(dbName)) {
      if (db.open) {
        await db.close();
      }
      fs.unlinkSync(dbName);
    }
    db = new SQLiteDatabase(dbName);
    await db.connect();
  });

  it("should save and retrieve documents correctly", async function () {
    let document = new Document("doc2");
    document.add(new Field("key", "value", "analyzed_value", true, true, true));
    await db.saveDocument(document);

    let retrievedDocument = await db.getDocument("doc2");
    assert.deepStrictEqual(retrievedDocument, document);
  }, 10000);

  it("should save and retrieve multiple documents correctly", async function () {
    let document1 = new Document("doc1");
    document1.add(
      new Field("key1", "value1", "analyzed_value1", true, true, true)
    );
    await db.saveDocument(document1);

    let document2 = new Document("doc2");
    document2.add(
      new Field("key2", "value2", "analyzed_value2", true, true, true)
    );
    await db.saveDocument(document2);

    let retrievedDocument1 = await db.getDocument("doc1");
    assert.deepStrictEqual(retrievedDocument1, document1);

    let retrievedDocument2 = await db.getDocument("doc2");
    assert.deepStrictEqual(retrievedDocument2, document2);
  });

  it("should handle documents with multiple fields correctly", async function () {
    let document = new Document("doc3");
    document.add(
      new Field("key1", "value1", "analyzed_value1", true, true, true)
    );
    document.add(
      new Field("key2", "value2", "analyzed_value2", true, true, true)
    );
    await db.saveDocument(document);

    let retrievedDocument = await db.getDocument("doc3");
    assert.deepStrictEqual(JSON.stringify(retrievedDocument), JSON.stringify(document));
  });

  it("should search for documents correctly", async function () {
    let document = new Document("doc4");
    document.add(new Field("key", "value", "token", true, true, true));
    await db.saveDocument(document);
    await db.insert("token", "doc4", 0);

    let searchResults = await db.search("token");

    assert.deepStrictEqual(
        JSON.stringify(searchResults), 
        JSON.stringify({ ids: ["doc4"], frequencies: [null], doc_freqs: [null] })
    );
  });

  it("should handle errors correctly when creating tables", async function () {
    const oldRun = db.db.run;

    // Override the run method to simulate an error
    db.db.run = (sql, callback) => {
      callback(new Error("Test error"));
    };

    await expect(db.createTables()).rejects.toThrow("Test error");

    // Restore the original run method
    db.db.run = oldRun;
  });
});
