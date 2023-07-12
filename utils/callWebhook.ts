import { Qa } from "../types/qa";

const callWebhook = async (url: string, qas: Qa[]) => {
    let results = [];
    for (let i = 0; i < qas.length; i++) {
        const data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: qas[i].q,
                userId: "abcs23wisfd"
            })
        });
        results.push(await data.json());
    }
    return results;
}

export default callWebhook;