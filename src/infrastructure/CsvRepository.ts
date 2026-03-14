import fs from "fs";
import csv from "csv-parser";
import { Review } from "../domain/Review";

export class CsvRepository {

    async loadReviews(filePath: string): Promise<Review[]> {
        return new Promise((resolve, reject) => {

            const reviews: Review[] = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    const review = new Review(
                        Number(row.rating),
                        row.sitter_email,
                        row.sitter
                    );
                    reviews.push(review);
                })
                .on("end", () => {
                    console.log(reviews)
                    resolve(reviews);
                })
                .on("error", reject);

        });
    }
}