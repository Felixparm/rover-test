import { CsvRepository } from "../src/infrastructure/CsvRepository";

async function testCsv() {
    const repo = new CsvRepository();
    try {
        const reviews = await repo.loadReviews('./tests/data/reviews.csv');
        console.log('Loaded reviews:', reviews);
    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}

testCsv();