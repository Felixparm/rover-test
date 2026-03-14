import { Review } from "../domain/Review";
import { Sitter } from "../domain/Sitter";

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