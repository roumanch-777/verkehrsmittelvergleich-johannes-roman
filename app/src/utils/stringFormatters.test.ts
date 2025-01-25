import { computeTimeString } from './stringFormatters';

describe("computeTimeString", () => {
    test("0 s", () => {
        const result = computeTimeString(0);
        expect(result).toBe("0 s");
    });
    test("58 s -> 58 s", () => {
        const result = computeTimeString(58);
        expect(result).toBe("58 s");
    });
    test("61 s -> 1 min", () => {
        const result = computeTimeString(61);
        expect(result).toBe("1 min");
    });
    test("130 s -> 2 min", () => {
        const result = computeTimeString(130);
        expect(result).toBe("2 min");
    });
    test("9 min 20 s -> 9 min", () => {
        const result = computeTimeString((9 * 60) + 20);
        expect(result).toBe("9 min");
    });
    test("51 min 40 s -> 52 min", () => {
        const result = computeTimeString((51 * 60) + 40);
        expect(result).toBe("52 min");
    });
    test("59 min 40 s -> 1 h 0 min", () => {
        const result = computeTimeString((59*60) + 40);
        expect(result).toBe("1 h 0 min");
    });
    test("1 h 12 min 10 s -> 1 h 12 min", () => {
        const result = computeTimeString((1 * 3600) + (12 * 60) + 10);
        expect(result).toBe("1 h 12 min");
    });
    test("1 h 58 min 50 s -> 1 h 59 min", () => {
        const result = computeTimeString((1 * 3600) + (58 * 60) + 50);
        expect(result).toBe("1 h 59 min");
    });
    test("2 h 0 min 50 s -> 2 h 1 min", () => {
        const result = computeTimeString((2 * 3600) + (0 * 60) + 50);
        expect(result).toBe("2 h 1 min");
    });
    test("9 h 59 min 40 s -> 10 h 0 min", () => {
        const result = computeTimeString((9 * 3600) + (59 * 60) + 40);
        expect(result).toBe("10 h 0 min");
    });
    test("21 h 2 min 20 s -> 21 h 2 min", () => {
        const result = computeTimeString((21 * 3600) + (2 * 60) + 20);
        expect(result).toBe("21 h 2 min");
    });
    // test("23 h 59 min 40 s -> 1d 0h", () => {
    //     const result = computeTimeString((23 * 3600) + (59 * 60) + 40);
    //     expect(result).toBe("1d 0h");
    // });
});

