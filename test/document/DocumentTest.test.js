import { describe, expect, test } from "@jest/globals";
import Document from "../../src/document/Document";
import Field from "../../src/field/Field";

describe("Document", () => {
  it("should add fields to the document", () => {
    const document = new Document(1);
    const field1 = new Field(
      "field1",
      "value1",
      "analyzedValue1",
      true,
      true,
      true
    );

    const field2 = new Field("value2", "analyzedValue2", false, false, false);
    document.add(field1);
    document.add(field2);
    expect(document.fields).toEqual([field1, field2]);
  });

  it("should return true when comparing two documents with the same id and fields", () => {
    const document1 = new Document(1);
    const field1 = new Field(
      "field1",
      "value1",
      "analyzedValue1",
      true,
      true,
      true
    );
    const field2 = new Field(
      "field2",
      "value2",
      "analyzedValue2",
      true,
      true,
      true
    );
    document1.add(field1);
    document1.add(field2);

    const document2 = new Document(1);
    document2.add(field1);
    document2.add(field2);

    expect(document1.equals(document2)).toBe(true);
  });

  it("should return false when comparing two documents with different ids", () => {
    const document1 = new Document(1);
    const document2 = new Document(2);

    expect(document1.equals(document2)).toBe(false);
  });

  it("should return false when comparing two documents with different fields", () => {
    const document1 = new Document(1);
    const field1 = new Field("field1", "value1");
    document1.add(field1);

    const document2 = new Document(1);
    const field2 = new Field("field2", "value2");
    document2.add(field2);

    expect(document1.equals(document2)).toBe(false);
  });

  it("should return false when comparing two documents with different number of fields", () => {
    const document1 = new Document(1);
    const field1 = new Field("field1", "value1");
    document1.add(field1);

    const document2 = new Document(1);
    const field2 = new Field("field2", "value2");
    const field3 = new Field("field3", "value3");
    document2.add(field2);
    document2.add(field3);

    expect(document1.equals(document2)).toBe(false);
  });


  it("should return false when comparing a document to a non-document object", () => {
    const document = new Document(1);
    expect(document.equals({})).toBe(false);
  });

  it("should return the same hash code for two documents with the same id and fields", () => {
    const document1 = new Document(1);
    const field1 = new Field(
      "field1",
      "value1",
      "analyzedValue1",
      true,
      true,
      true
    );
    const field2 = new Field(
      "field2",
      "value2",
      "analyzedValue2",
      true,
      true,
      true
    );
    document1.add(field1);
    document1.add(field2);

    const document2 = new Document(1);
    document2.add(field1);
    document2.add(field2);

    expect(document1.hashCode()).toBe(document2.hashCode());
  });

  it("should return true when comparing two documents with the same fields in different orders", () => {
    const document1 = new Document(1);
    const field1 = new Field("field1", "value1");
    const field2 = new Field("field2", "value2");
    document1.add(field1);
    document1.add(field2);

    const document2 = new Document(1);
    document2.add(field2);
    document2.add(field1);

    expect(document1.equals(document2)).toBe(true);
  });

  it("should return true when comparing a document to itself", () => {
    const document = new Document(1);
    expect(document.equals(document)).toBe(true);
  });
});
