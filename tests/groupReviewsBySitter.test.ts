
import { Review } from "../src/domain/Review";
import { groupReviewsBySitter } from "../src/utils/groupReviewBySitters";

describe('groupReviewsBySitter', () => {

    it('should return empty array if there is no reviews', () => {
        const result = groupReviewsBySitter([]);
        expect(result).toEqual([]);
    });

    it('should group reviews by sitter email', () => {
        const reviews: Review[] = [
            { sitterEmail: 'user7852@hotmail.com', sitterName: 'Mary B', rating: 5 },
            { sitterEmail: 'user5005@hotmail.com', sitterName: 'John D', rating: 4 },
            { sitterEmail: 'user7852@hotmail.com', sitterName: 'Mary B', rating: 3 },
        ];

        const result = groupReviewsBySitter(reviews);
        expect(result).toHaveLength(2);

        const sitter1 = result.find(s => s.email === 'user7852@hotmail.com');
        expect(sitter1).toBeDefined();
        expect(sitter1?.name).toBe('Mary B');
        expect(sitter1?.reviews).toHaveLength(2);

        const sitter2 = result.find(s => s.email === 'user5005@hotmail.com');
        expect(sitter2).toBeDefined();
        expect(sitter2?.name).toBe('John D');
        expect(sitter2?.reviews).toHaveLength(1);
    });
});