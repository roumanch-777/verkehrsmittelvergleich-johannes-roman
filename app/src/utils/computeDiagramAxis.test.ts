import { computeDurationAxis, computeDistanceAxis } from './computeDiagramAxis';

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe('computeDurationAxis', () => {

    it('should round with 0.5 day precision for values {x | x >= 1d}', () => {
        expect(computeDurationAxis(DAY + HOUR)).toBe("1d");
        expect(computeDurationAxis(DAY + 5 * HOUR)).toBe("1d");
        expect(computeDurationAxis(DAY + 6 * HOUR)).toBe("1.5d");
        expect(computeDurationAxis(DAY + 17 * HOUR)).toBe("1.5d");
        expect(computeDurationAxis(DAY + 18 * HOUR)).toBe("2d");
        expect(computeDurationAxis(DAY + 23 * HOUR)).toBe("2d");
    });

    it('should round with 1h precision for values {x | 10h < x < 1d}', () => {
        expect(computeDurationAxis(10 * HOUR + 29 * MINUTE)).toBe("10h");
        expect(computeDurationAxis(10 * HOUR + 30 * MINUTE)).toBe("11h");
        expect(computeDurationAxis(23 * HOUR + 30 * MINUTE)).toBe("1d");
    });

    it('should round with 0.5h precision for values {x | 1h < x < 10h}', () => {
        expect(computeDurationAxis(HOUR + 14 * MINUTE)).toBe("1h");
        expect(computeDurationAxis(HOUR + 15 * MINUTE)).toBe("1.5h");
        expect(computeDurationAxis(HOUR + 44 * MINUTE)).toBe("1.5h");
        expect(computeDurationAxis(HOUR + 45 * MINUTE)).toBe("2h");
    });

    it('should round with 5min precision for values {x | 1min < x < 1h}', () => {
        expect(computeDurationAxis(2 * MINUTE)).toBe("0min");
        expect(computeDurationAxis(3 * MINUTE)).toBe("5min");
        expect(computeDurationAxis(7 * MINUTE)).toBe("5min");
        expect(computeDurationAxis(8 * MINUTE)).toBe("10min");
        expect(computeDurationAxis(57 * MINUTE)).toBe("55min");
        expect(computeDurationAxis(58 * MINUTE)).toBe("1h");
    });
});

// describe('computeDistanceAxis', () => {
//     it('should return the input string if value is a string', () => {
//         expect(computeDistanceAxis("test")).toBe("test");
//     });

//     it('should return distance in kilometers for values greater than 100000 meters', () => {
//         expect(computeDistanceAxis(200000)).toBe("200 km");
//     });

//     it('should return distance in half kilometers for values greater than 1000 meters', () => {
//         expect(computeDistanceAxis(1500)).toBe("1.5 km");
//     });

//     it('should return distance in meters for values less than or equal to 1000 meters', () => {
//         expect(computeDistanceAxis(500)).toBe("500 m");
//     });
// });
