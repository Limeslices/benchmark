import { Qa } from "../types/qa";
import csv from 'csvtojson';

const readCSV = async (): Promise<Qa[]> => {
    type CSV = {
        field1: string,
        field2: string,
    }
    try {
        const jsonArray: CSV[] = await csv({
            noheader: true,
            checkColumn: false,
        }).fromFile("./benchmark/input.csv");
        return jsonArray.map((obj) => ({ q: obj["field1"] as string, a: obj["field2"] as string }))
    } catch (error) {
        console.error("Make sure your file is located in benchmark/input.csv")
        return [];
    }
}

export default readCSV;