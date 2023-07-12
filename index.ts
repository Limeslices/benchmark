#! /usr/bin/env node
import { Qa } from "./types/qa";
import callWebhook from "./utils/callWebhook";
import compare from "./utils/compare";
import readCSV from "./utils/readCsv";
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const main = async () => {
    const csvInput = await readCSV();

    //ping model to get this via webhook

    const webhookResponse: { finalResponse: string }[] = await callWebhook("http://localhost:3000/api/testingwebhook", csvInput);
    const suggestedQas: Qa[] = webhookResponse.map((response, index) => {
        return {
            q: csvInput[index].q,
            a: response.finalResponse,
        }
    })

    //compare
    const comparisons = await compare(csvInput, suggestedQas);

    const csvWriter = createCsvWriter({
        path: 'benchmark/ouput.csv',
        header: [
            { id: 'question', title: 'Question' },
            { id: 'correctAnswer', title: 'Correct Answer' },
            { id: 'suggestedAnswer', title: 'Suggested Answer' },
            { id: 'correct', title: "Correct" }
        ]
    });

    const records = csvInput.map((item, index) => {
        return {
            question: item.q,
            correctAnswer: item.a,
            suggestedAnswer: suggestedQas[index].a,
            correct: comparisons.responses[index].isCorrect
        }
    })

    csvWriter.writeRecords(records)

    console.log(comparisons);
}

main();