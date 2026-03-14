import { OutputData } from "../src/infrastructure/CsvWriter";
import { sortSitters } from "../src/utils/sortSitters";

describe("sortSitters", () => {
    it("should sort sitters by searchScore descending and alphabetically", () => {
        const results: OutputData[] = [
            { email: "a@mail.com", name: "Anna", searchScore: 2.16, profileScore: 1.15, ratingsScore: 3.23 },
            { email: "j@mail.com", name: "John", searchScore: 2.76, profileScore: 1.15, ratingsScore: 3.83 },
            { email: "m@mail.com", name: "Mary", searchScore: 3.83, profileScore: 1.4, ratingsScore: 3.83 },
            { email: "c@mail.com", name: "Charlie", searchScore: 2.76, profileScore: 1.15, ratingsScore: 3.83 },
        ];

        sortSitters(results);

        expect(results[0].name).toBe("Mary");
        expect(results[1].name).toBe("Charlie");
        expect(results[2].name).toBe("John");
        expect(results[3].name).toBe("Anna");
    });

});