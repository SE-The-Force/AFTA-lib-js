import Cache from "../../src/cache/Cache";

describe("Cache", () => {
  let cache;

  beforeEach(() => {
    cache = new Cache(2);
  });

  it("should return the default value when the key is not in the cache", () => {
    const defaultValue = () => "default";
    expect(cache.get("key", defaultValue)).toBe("default");
  });

  it("should return the cached value when the key is in the cache", () => {
    cache.put("key", "value");
    const defaultValue = () => "default";
    expect(cache.get("key", defaultValue)).toBe("value");
  });

  it("should remove the oldest entry when the cache is full", () => {
    cache.put("key1", "value1");
    cache.put("key2", "value2");
    cache.put("key3", "value3");

    const defaultValue = () => "default";
    expect(cache.get("key1", defaultValue)).toBe("default");
    expect(cache.get("key2", defaultValue)).toBe("value2");
    expect(cache.get("key3", defaultValue)).toBe("value3");
  });
});
