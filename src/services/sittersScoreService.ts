import { Sitter } from "../domain/Sitter"
import { OutputData } from "../infrastructure/CsvWriter"
import { ScoreCalculator } from "./scoreCalculators"


export class SitterScoreService {

    constructor(private calculator: ScoreCalculator) { }

    computeScores(sitters: Sitter[]): OutputData[] {

        return sitters.map((sitter) => {

            const ratings = sitter.reviews.map(r => r.rating)

            const profileScore =
                this.calculator.calculateProfileScore(sitter.name)

            const ratingsScore =
                this.calculator.calculateRatingsScore(ratings)

            const searchScore =
                this.calculator.calculateSearchScore(
                    profileScore,
                    ratingsScore,
                    sitter.reviews.length
                )

            return {
                email: sitter.email,
                name: sitter.name,
                profileScore,
                ratingsScore,
                searchScore
            }
        })
    }
}