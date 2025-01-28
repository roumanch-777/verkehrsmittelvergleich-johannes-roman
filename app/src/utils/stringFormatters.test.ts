import { computeDistanceString, computeTimeString, MINUTE, HOUR, DAY } from "./stringFormatters";


describe("computeDistanceString", () => {
    test("0m -> 0m", () => {
        expect(computeDistanceString(0)).toBe("0m");
    });
    test("999m -> 999m", () => {
        expect(computeDistanceString(999)).toBe("999m");
    });
    test("1049m -> 1km", () => {
        expect(computeDistanceString(1049)).toBe("1km");
    });
    test("1050m -> 1.1km", () => {
        expect(computeDistanceString(1050)).toBe("1.1km");
    });
    test("1949m -> 1.9km", () => {
        expect(computeDistanceString(1949)).toBe("1.9km");
    });
    test("1950m -> 2km", () => {
        expect(computeDistanceString(1950)).toBe("2km");
    });
    test("10'049m -> 10km", () => {
        expect(computeDistanceString(10_049)).toBe("10km");
    });
    test("10'050m -> 10.1km", () => {
        expect(computeDistanceString(10_050)).toBe("10.1km");
    });
    test("99'950m -> 100km", () => {
        expect(computeDistanceString(99_950)).toBe("100km");
    });
    test("9'999'499m -> 9999km", () => {
        expect(computeDistanceString(9_999_499)).toBe("9999km");
    });
    test("9'999'500m -> 10'000km", () => {
        expect(computeDistanceString(9_999_500)).toBe("10'000km");
    });
    test("10'000'500m -> 10'001km", () => {
        expect(computeDistanceString(10_000_500)).toBe("10'001km");
    });
});


describe("computeTimeString", () => {
    test("0s", () => {
        expect(computeTimeString(0)).toBe("0s");
    });
    test("58s -> 58s", () => {
        expect(computeTimeString(58)).toBe("58s");
    });
    test("61s -> 1min", () => {
        expect(computeTimeString(61)).toBe("1min");
    });
    test("130s -> 2min", () => {
        expect(computeTimeString(130)).toBe("2min");
    });
    test("9min 20s -> 9min", () => {
        expect(computeTimeString((9 * MINUTE) + 20)).toBe("9min");
    });
    test("51min 40s -> 52min", () => {
        expect(computeTimeString((51 * MINUTE) + 40)).toBe("52min");
    });
    test("59min 40s -> 1h 0min", () => {
        expect(computeTimeString((59 * MINUTE) + 40)).toBe("1h 0min");
    });
    test("1h 12min 10s -> 1h 12min", () => {
        expect(computeTimeString((1 * HOUR) + (12 * MINUTE) + 10)).toBe("1h 12min");
    });
    test("1h 58min 50s -> 1h 59min", () => {
        expect(computeTimeString((1 * HOUR) + (58 * MINUTE) + 50)).toBe("1h 59min");
    });
    test("2h 0min 50s -> 2h 1min", () => {
        expect(computeTimeString((2 * HOUR) + (0 * MINUTE) + 50)).toBe("2h 1min");
    });
    test("9h 59min 40s -> 10h 0min", () => {
        expect(computeTimeString((9 * HOUR) + (59 * MINUTE) + 40)).toBe("10h 0min");
    });
    test("21h 2min 20s -> 21h 2min", () => {
        expect(computeTimeString((21 * HOUR) + (2 * MINUTE) + 20)).toBe("21h 2min");
    });
    test("23h 59min 29s -> 23h 59min", () => {
        expect(computeTimeString((23 * HOUR) + (59 * MINUTE) + 29)).toBe("23h 59min");
    });
    test("23h 59min 30s -> 1d 0h 0min", () => {
        expect(computeTimeString((23 * HOUR) + (59 * MINUTE) + 30)).toBe("1d 0h 0min");
    });
    test("1d 0h 0min 30s -> 1d 0h 1min", () => {
        expect(computeTimeString((1 * DAY) + (0 * HOUR) + (0 * MINUTE) + 30)).toBe("1d 0h 1min");
    });
    test("1d 12h 35min 40s -> 1d 12h 36min", () => {
        expect(computeTimeString((1 * DAY) + (12 * HOUR) + (35 * MINUTE) + 40)).toBe("1d 12h 36min");
    });
    test("5d 6h 59min 29s -> 5d 6h 59min", () => {
        expect(computeTimeString((5 * DAY) + (6 * HOUR) + (59 * MINUTE) + 29)).toBe("5d 6h 59min");
    });
    test("5d 6h 59min 30s -> 5d 7h 0min", () => {
        expect(computeTimeString((5 * DAY) + (6 * HOUR) + (59 * MINUTE) + 30)).toBe("5d 7h 0min");
    });
    test("5d 23h 59min 30s -> 6d 0h 0min", () => {
        expect(computeTimeString((5 * DAY) + (23 * HOUR) + (59 * MINUTE) + 30)).toBe("6d 0h 0min");
    });
});

