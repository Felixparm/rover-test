export class ScoreCalculator {

    calculateProfileScore(name: string): number {

        const letters = name
            .toLowerCase()
            .replace(/[^a-z]/g, "");

        const uniqueLetters = new Set(letters);

        const score = 5 * (uniqueLetters.size / 26);

        return Number(score.toFixed(2));
    }

    calculateRatingsScore(ratings: number[]): number {

        if (ratings.length === 0) {
            return 0;
        }

        const sum = ratings.reduce((acc, rating) => acc + rating, 0);

        const average = sum / ratings.length;

        return Number(average.toFixed(2));
    }

    calculateSearchScore(
        profileScore: number,
        ratingsScore: number,
        numberOfReviews: number
    ): number {

        if (numberOfReviews === 0) {
            return Number(profileScore.toFixed(2));
        }

        if (numberOfReviews >= 10) {
            return Number(ratingsScore.toFixed(2));
        }

        const weight = numberOfReviews / 10;

        const score =
            (1 - weight) * profileScore +
            weight * ratingsScore;

        return Number(score.toFixed(2));
    }

}