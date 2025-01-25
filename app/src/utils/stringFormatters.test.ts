import { computeDistanceString, computeTimeString, MINUTE, HOUR, DAY } from './stringFormatters';


describe("computeDistanceString", () => {
    test("0m -> 0m", () => {
        const result = computeDistanceString(0);
        expect(result).toBe("0m");
    });
    test("999m -> 999m", () => {
        const result = computeDistanceString(999);
        expect(result).toBe("999m");
    });
    test("1049m -> 1km", () => {
        const result = computeDistanceString(1049);
        expect(result).toBe("1km");
    });
    test("1050m -> 1.1km", () => {
        const result = computeDistanceString(1050);
        expect(result).toBe("1.1km");
    });
    test("1949m -> 1.8km", () => {
        const result = computeDistanceString(1949);
        expect(result).toBe("1.9km");
    });
    test("1950m -> 2km", () => {
        const result = computeDistanceString(1950);
        expect(result).toBe("2km");
    });
    test("10'049m -> 10km", () => {
        const result = computeDistanceString(10_049);
        expect(result).toBe("10km");
    });
    test("10'050m -> 10.1km", () => {
        const result = computeDistanceString(10_050);
        expect(result).toBe("10.1km");
    });
    test("99'950m -> 100km", () => {
        const result = computeDistanceString(99_950);
        expect(result).toBe("100km");
    });
    test("9'999'499m -> 9999km", () => {
        const result = computeDistanceString(9_999_499);
        expect(result).toBe("9999km");
    });
    test("9'999'500m -> 10'000km", () => {
        const result = computeDistanceString(9_999_500);
        expect(result).toBe("10'000km");
    });
    test("10'000'500m -> 10'001km", () => {
        const result = computeDistanceString(10_000_500);
        expect(result).toBe("10'001km");
    });
});


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
    test("23h 59min 29s -> 23h 59min", () => {
        const result = computeTimeString((23 * HOUR) + (59 * MINUTE) + 29);
        expect(result).toBe("23h 59min");
    });
    test("23h 59min 30s -> 1d 0h 0min", () => {
        const result = computeTimeString((23 * HOUR) + (59 * MINUTE) + 30);
        expect(result).toBe("1d 0h 0min");
    });
    test("1d 0h 0min 30s -> 1d 0h 1min", () => {
        const result = computeTimeString((1 * DAY) + (0 * HOUR) + (0 * MINUTE) + 30);
        expect(result).toBe("1d 0h 1min");
    });
    test("1d 12h 35min 40s -> 1d 12h 36min", () => {
        const result = computeTimeString((1 * DAY) + (12 * HOUR) + (35 * MINUTE) + 40);
        expect(result).toBe("1d 12h 36min");
    });
    test("5d 6h 59min 29s -> 5d 6h 59min", () => {
        const result = computeTimeString((5 * DAY) + (6 * HOUR) + (59 * MINUTE) + 29);
        expect(result).toBe("5d 6h 59min");
    });
    test("5d 6h 59min 30s -> 5d 7h 0min", () => {
        const result = computeTimeString((5 * DAY) + (6 * HOUR) + (59 * MINUTE) + 30);
        expect(result).toBe("5d 7h 0min");
    });
    test("5d 23h 59min 30s -> 6d 0h 0min", () => {
        const result = computeTimeString((5 * DAY) + (23 * HOUR) + (59 * MINUTE) + 30);
        expect(result).toBe("6d 0h 0min");
    });
});

