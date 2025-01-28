import { computeDurationAxis, computeDistanceAxis } from "./computeDiagramAxis";

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("computeDurationAxis", () => {

    it("should round with 0.5 day precision for values {x | x >= 1d}", () => {
        expect(computeDurationAxis(DAY + HOUR)).toBe("1d");
        expect(computeDurationAxis(DAY + 5 * HOUR)).toBe("1d");
        expect(computeDurationAxis(DAY + 6 * HOUR)).toBe("1.5d");
        expect(computeDurationAxis(DAY + 17 * HOUR)).toBe("1.5d");
        expect(computeDurationAxis(DAY + 18 * HOUR)).toBe("2d");
        expect(computeDurationAxis(DAY + 23 * HOUR)).toBe("2d");
    });

    it("should round with 1h precision for values {x | 10h < x < 1d}", () => {
        expect(computeDurationAxis(10 * HOUR + 29 * MINUTE)).toBe("10h");
        expect(computeDurationAxis(10 * HOUR + 30 * MINUTE)).toBe("11h");
        expect(computeDurationAxis(23 * HOUR + 30 * MINUTE)).toBe("1d");
    });

    it("should round with 0.5h precision for values {x | 1h < x < 10h}", () => {
        expect(computeDurationAxis(HOUR + 14 * MINUTE)).toBe("1h");
        expect(computeDurationAxis(HOUR + 15 * MINUTE)).toBe("1.5h");
        expect(computeDurationAxis(HOUR + 44 * MINUTE)).toBe("1.5h");
        expect(computeDurationAxis(HOUR + 45 * MINUTE)).toBe("2h");
    });

    it("should round with 5min precision for values {x | 1min < x < 1h}", () => {
        expect(computeDurationAxis(1 * MINUTE)).toBe("0min");
        expect(computeDurationAxis(2 * MINUTE)).toBe("0min");
        expect(computeDurationAxis(3 * MINUTE)).toBe("5min");
        expect(computeDurationAxis(7 * MINUTE)).toBe("5min");
        expect(computeDurationAxis(8 * MINUTE)).toBe("10min");
        expect(computeDurationAxis(57 * MINUTE)).toBe("55min");
        expect(computeDurationAxis(58 * MINUTE)).toBe("1h");
    });
});


