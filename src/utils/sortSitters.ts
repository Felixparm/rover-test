import { OutputData } from "../infrastructure/CsvWriter"


export function sortSitters(results: OutputData[]): void {

    results.sort((a, b) => {

        if (b.searchScore !== a.searchScore) {
            return b.searchScore - a.searchScore
        }

        return a.name.localeCompare(b.name)

    })

}