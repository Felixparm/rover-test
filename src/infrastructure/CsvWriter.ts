import fs from "fs";

export interface OutputData {
    email: string;
    name: string;
    profileScore: number;
    ratingsScore: number;
    searchScore: number;
}

export class CsvWriter {

    write(filePath: string, data: OutputData[]): void {
        const header =
            "sitter_email,sitter_name,profile_score,ratings_score,search_score";

        const rows = data.map((row) =>
            `${row.email},${row.name},${row.profileScore},${row.ratingsScore},${row.searchScore}`
        );

        const csvContent = [header, ...rows].join("\n");

        fs.writeFileSync(filePath, csvContent);
    }

}