import { ScoreCalculator } from "../src/services/scoreCalculators";


describe('ScoreCalculator - calculateProfileScore', () => {
    let calculator: ScoreCalculator;

    beforeEach(() => {
        calculator = new ScoreCalculator();
    });

    it('should return 0 if there is no name', () => {
        const name = '';
        expect(calculator.calculateProfileScore(name)).toBe(0);
    });

    it('should calculate score for a name with unique letters', () => {
        const name = 'abc';
        expect(calculator.calculateProfileScore(name)).toBe(0.58);
    });

    it('should ignore duplicate letters', () => {
        const name = 'aabbcc';
        expect(calculator.calculateProfileScore(name)).toBe(0.58);
    });

    it('should ignore non-alphabetic characters', () => {
        const name = 'a1b2c3!';
        expect(calculator.calculateProfileScore(name)).toBe(0.58);
    });

    it('should consider capital and small letter', () => {
        const name = 'AbC';
        expect(calculator.calculateProfileScore(name)).toBe(0.58);
    });

    it('should return maximum score 5 for all letters of the alphabet', () => {
        const name = 'abcdefghijklmnopqrstuvwxyz';
        expect(calculator.calculateProfileScore(name)).toBe(5);
    });
});

describe('ScoreCalculator - calculateRatingsScore', () => {
    let calculator: ScoreCalculator;

    beforeEach(() => {
        calculator = new ScoreCalculator();
    });

    it('should return 0 if there is no rate', () => {
        const rate = [] as number[];
        expect(calculator.calculateRatingsScore(rate)).toBe(0);
    });

    it('should return the rate when there is no decimal number', () => {
        const rate = [4, 5, 3];
        expect(calculator.calculateRatingsScore(rate)).toBe(4);
    });

    it('should return the rate and round down to two decimal places', () => {
        const rate = [4.333, 5.333, 3.33];
        expect(calculator.calculateRatingsScore(rate)).toBe(4.33);
    });

    it('should return the rate and roun up to two decimal places', () => {
        const rate = [4.556, 5.555, 3.555];
        expect(calculator.calculateRatingsScore(rate)).toBe(4.56);
    });
});

describe('ScoreCalculator - calculateSearchScore', () => {
    let calculator: ScoreCalculator;

    beforeEach(() => {
        calculator = new ScoreCalculator();
    });

    it('should return search score when there us no review', () => {
        const scores = { profileScore: 3.5, ratingsScore: 4.5, numberOfReviews: 0 };
        expect(calculator.calculateSearchScore(scores.profileScore, scores.ratingsScore, scores.numberOfReviews)).toBe(scores.profileScore);
    });

    it('should return search score when there is no review', () => {
        const scores = { profileScore: 3.5, ratingsScore: 4.5, numberOfReviews: 10 };
        expect(calculator.calculateSearchScore(scores.profileScore, scores.ratingsScore, scores.numberOfReviews)).toBe(scores.ratingsScore);
    });

    it('should return search score', () => {
        const scores = { profileScore: 2, ratingsScore: 4, numberOfReviews: 5 };
        expect(calculator.calculateSearchScore(scores.profileScore, scores.ratingsScore, scores.numberOfReviews)).toBe(3);
    });

    it('should return search score with decimal numbers', () => {
        const scores = { profileScore: 2, ratingsScore: 4.5, numberOfReviews: 2 };
        expect(calculator.calculateSearchScore(scores.profileScore, scores.ratingsScore, scores.numberOfReviews)).toBe(2.5);
    });

});
