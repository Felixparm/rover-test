import { CsvRepository } from "../infrastructure/CsvRepository";
import { Sitter } from "../domain/Sitter";
import { Review } from "../domain/Review";
import { ScoreCalculator } from "../services/scoreCalculators";

export function groupReviewsBySitter(reviews: Review[]): Sitter[] {

  const groups: { [email: string]: Review[] } = {};

  for (const review of reviews) {

    if (!groups[review.sitterEmail]) {
      groups[review.sitterEmail] = [];
    }

    groups[review.sitterEmail].push(review);
  }
  const sitters: Sitter[] = [];

  for (const email in groups) {
    const reviews = groups[email];
    const sitterName = reviews[0].sitterName;
    sitters.push(new Sitter(email, sitterName, reviews));
  }

  return sitters;

}

async function main() {

  const repository = new CsvRepository();

  const reviews = await repository.loadReviews("tests/data/reviews.csv");

  const sitters = groupReviewsBySitter(reviews);
  const scoreCalculator = new ScoreCalculator();
  const result = sitters.map(sitter => {

    const profileScore = scoreCalculator.calculateProfileScore(sitter.name);
    const ratingsScore = scoreCalculator.calculateRatingsScore(sitter.reviews.map(review => review.rating));
    const searchScore = scoreCalculator.calculateSearchScore(profileScore, ratingsScore, sitter.reviews.length);

    return {
      email: sitter.email,
      name: sitter.name,
      profileScore,
      ratingsScore,
      searchScore
    };
  }).sort((a, b) => {
    if (b.searchScore !== a.searchScore) {
      return b.searchScore - a.searchScore;
    }
    return a.name.localeCompare(b.name);
  })
  console.table(result);
}

main();