import { computeTimeString } from './stringFormatters';

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("computeTimeString", () => {
    test("0s", () => {
        const result = computeTimeString(0);
        expect(result).toBe("0s");
    });
    test("58s -> 58s", () => {
        const result = computeTimeString(58);
        expect(result).toBe("58s");
    });
    test("61s -> 1min", () => {
        const result = computeTimeString(61);
        expect(result).toBe("1min");
    });
    test("130s -> 2min", () => {
        const result = computeTimeString(130);
        expect(result).toBe("2min");
    });
    test("9min 20s -> 9min", () => {
        const result = computeTimeString((9 * MINUTE) + 20);
        expect(result).toBe("9min");
    });
    test("51min 40s -> 52min", () => {
        const result = computeTimeString((51 * MINUTE) + 40);
        expect(result).toBe("52min");
    });
    test("59min 40s -> 1h 0min", () => {
        const result = computeTimeString((59 * MINUTE) + 40);
        expect(result).toBe("1h 0min");
    });
    test("1h 12min 10s -> 1h 12min", () => {
        const result = computeTimeString((1 * HOUR) + (12 * MINUTE) + 10);
        expect(result).toBe("1h 12min");
    });
    test("1h 58min 50s -> 1h 59min", () => {
        const result = computeTimeString((1 * HOUR) + (58 * MINUTE) + 50);
        expect(result).toBe("1h 59min");
    });
    test("2h 0min 50s -> 2h 1min", () => {
        const result = computeTimeString((2 * HOUR) + (0 * MINUTE) + 50);
        expect(result).toBe("2h 1min");
    });
    test("9h 59min 40s -> 10h 0min", () => {
        const result = computeTimeString((9 * HOUR) + (59 * MINUTE) + 40);
        expect(result).toBe("10h 0min");
    });
    test("21h 2min 20s -> 21h 2min", () => {
        const result = computeTimeString((21 * HOUR) + (2 * MINUTE) + 20);
        expect(result).toBe("21h 2min");
    });
    // test("23h 59min 40s -> 1d 0h", () => {
    //     const result = computeTimeString((23 * HOURS) + (59 * MINUTES) + 40);
    //     expect(result).toBe("1d 0h");
    // });
    test("1d 0h 12min 40s -> 1d 0h", () => {
        const result = computeTimeString((1 * DAY) + (0 * HOUR) + (12 * MINUTE) + 40);
        expect(result).toBe("1 d 0h");
    });
});

