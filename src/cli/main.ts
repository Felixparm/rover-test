import { CsvRepository } from "../infrastructure/CsvRepository";
import { ScoreCalculator } from "../services/scoreCalculators";
import { CsvWriter } from "../infrastructure/CsvWriter";
import { sortSitters } from "../utils/sortSitters";
import { SitterScoreService } from "../services/sittersScoreService";
import { groupReviewsBySitter } from "../utils/groupReviewBySitters";

async function main() {

  const repository = new CsvRepository()
  const calculator = new ScoreCalculator()
  const scoreService = new SitterScoreService(calculator)

  const writer = new CsvWriter()

  const reviews = await repository.loadReviews("./tests/data/reviews.csv")

  const sitters = groupReviewsBySitter(reviews)

  const results = scoreService.computeScores(sitters)

  sortSitters(results)

  writer.write("result/sitters.csv", results)

}

main()