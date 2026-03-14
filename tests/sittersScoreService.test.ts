import { Sitter } from "../src/domain/Sitter"
import { ScoreCalculator } from "../src/services/scoreCalculators"
import { SitterScoreService } from "../src/services/sittersScoreService"


describe("SitterScoreService", () => {

    let mockCalculator: jest.Mocked<ScoreCalculator>
    let service: SitterScoreService

    beforeEach(() => {
        mockCalculator = {
            calculateProfileScore: jest.fn(),
            calculateRatingsScore: jest.fn(),
            calculateSearchScore: jest.fn()
        } as jest.Mocked<ScoreCalculator>

        service = new SitterScoreService(mockCalculator)
    })

    it("computes scores and returns correct structure", () => {
        const sitters: Sitter[] = [
            {
                email: "j@mail.com",
                name: "John C",
                reviews: [{ rating: 2 }, { rating: 4 }]
            } as Sitter
        ]

        mockCalculator.calculateProfileScore.mockReturnValue(1.3)
        mockCalculator.calculateRatingsScore.mockReturnValue(3.4)
        mockCalculator.calculateSearchScore.mockReturnValue(3)

        const result = service.computeScores(sitters)

        expect(result).toEqual([
            {
                email: "j@mail.com",
                name: "John C",
                profileScore: 1.3,
                ratingsScore: 3.4,
                searchScore: 3
            }
        ])

        expect(mockCalculator.calculateProfileScore).toHaveBeenCalledWith("John C")
        expect(mockCalculator.calculateRatingsScore).toHaveBeenCalledWith([2, 4])
        expect(mockCalculator.calculateSearchScore).toHaveBeenCalledWith(1.3, 3.4, 2)
    })
})