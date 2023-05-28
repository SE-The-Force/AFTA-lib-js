import Field from "../../src/field/Field";

describe("Field", () => {
  it("should have the correct properties", () => {
    const field = new Field("key", "value", "analyzedValue", true, true, true);

    expect(field.key).toBe("key");
    expect(field.value).toBe("value");
    expect(field.analyzedValue).toBe("analyzedValue");
    expect(field.isAnalyzed).toBe(true);
    expect(field.isIndexible).toBe(true);
    expect(field.isStored).toBe(true);
  });

  it("should have default values for optional properties", () => {
    const field = new Field("key", "value");

    expect(field.analyzedValue).toBe("");
    expect(field.isAnalyzed).toBe(false);
    expect(field.isIndexible).toBe(false);
    expect(field.isStored).toBe(false);
  });
});
