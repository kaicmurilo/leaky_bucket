import { checkToken } from "../app/services/LeakyBucketService";

describe("Leaky Bucket", () => {
  it("should allow up to 10 requests initially", () => {
    for (let i = 0; i < 10; i++) {
      expect(checkToken("user1", false)).toBe(true);
    }
    expect(checkToken("user1", false)).toBe(false);
  });
});
