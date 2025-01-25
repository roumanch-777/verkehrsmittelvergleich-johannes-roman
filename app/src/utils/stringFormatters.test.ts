import { computeTimeString } from './stringFormatters';

describe("computeTimeString", () => {
    test("1 min", () => {
      const input = 60;
      const result = computeTimeString(input);
      expect(result).toBe("1 min");
    });
  
});


describe("computeTimeString", () => {
    it("2 min", () => {
        const input = 120;
        const result = computeTimeString(input);
        expect(result).toBe("2 min");
    });
});
  