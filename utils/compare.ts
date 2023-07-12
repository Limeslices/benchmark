import { Qa } from "../types/qa";
import rateLimit from "./rateLimit";

const compare = async (qas: Qa[], suggestedQas: Qa[]) => {
    let data = [];
    for (let i = 0; i < suggestedQas.length; i++) {
        data.push(
            await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {
                            "role": "system", "content": `Given the question, does correctAnswer and suggestedAnswer contradict each other or are they consistent?
                            Respond with true (if they do not contradict) or false (if they do contradict).
                            Respond with only the boolean value.` },
                        { "role": "user", "content": `{ "question": "${qas[i].q}", "correctAnswer": "${qas[i].a}", "suggestedAnswer": "${suggestedQas[i].a}"}` },
                    ]
                })
            }).then((res) => res.json())
        )
    }
    let results: { accuracy: number, responses: { text: string, isCorrect: boolean }[] } = {
        accuracy: 0,
        responses: []
    };
    let trues = 0;
    let falses = 0;
    data.map((item) => {
        let text = item.choices[0].message.content

        results.responses.push({ text, isCorrect: text === "true" });

        if (text === "true") {
            trues++;
        } else if (text === "false") {
            falses++;
        } else {
            throw new Error("Invalid response from comparison OpenAI API. The bot responded: \n\n" + text);
        }
    })

    let accuracy = (trues / (trues + falses)) * 100;
    results.accuracy = accuracy;
    return results;
}

export default compare;