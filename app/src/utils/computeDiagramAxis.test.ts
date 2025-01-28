import { computeDurationAxis, computeDistanceAxis } from './computeDiagramAxis';

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe('computeDurationAxis', () => {

    it('should round with 0.5 day precision for values >= 1 day', () => {
        expect(computeDurationAxis(DAY + HOUR)).toBe("1 d");
        expect(computeDurationAxis(DAY + 5 * HOUR)).toBe("1 d");
        expect(computeDurationAxis(DAY + 6 * HOUR)).toBe("1.5 d");
        expect(computeDurationAxis(DAY + 17 * HOUR)).toBe("1.5 d");
        expect(computeDurationAxis(DAY + 18 * HOUR)).toBe("2 d");
        expect(computeDurationAxis(DAY + 23 * HOUR)).toBe("2 d");
    });

    it('should return duration in hours for values > 10h', () => {
        expect(computeDurationAxis(72000)).toBe("20 h");
    });

    it('should return duration in half hours for values greater than 3600 seconds', () => {
        expect(computeDurationAxis(5400)).toBe("1.5 h");
    });

    it('should return duration in minutes for values greater than 60 seconds', () => {
        expect(computeDurationAxis(300)).toBe("5 min");
    });

    it('should return "0 min" for values less than or equal to 60 seconds', () => {
        expect(computeDurationAxis(30)).toBe("0 min");
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
