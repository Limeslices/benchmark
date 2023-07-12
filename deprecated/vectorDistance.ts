import { MathUtils } from "../utils/MathUtils";
import getEmbedding from "../utils/getEmbedding";
import readCSV from "../utils/readCsv";
var similarity = require('compute-cosine-similarity');


const vectorDistance = async () => {
    const csvInput = await readCSV();
    const answers = csvInput.map((row) => row.a);
    const questions = csvInput.map((row) => row.q);
    const testEmbeddings = await getEmbedding(answers);
    const testEmbeddingsAndAnswers = testEmbeddings.map((embedding, index) => (
        { embedding, a: answers[index], q: questions[index] }
    ));
    // const llmSuggestedAnswer = { q: "Can I work from Russia?", a: "No, Russia is on the blacklist" };
    const llmSuggestedAnswer = { q: "Can I work from Russia?", a: "I'm not quite sure if you can work from Russia as it is not provided in the context" };
    const suggestedEmbeddings = await getEmbedding(llmSuggestedAnswer.a);

    const matchingQA = testEmbeddingsAndAnswers.find((item) => item.q === llmSuggestedAnswer.q);
    if (!matchingQA) throw new Error("No matching QA found");

    const mathUtils = new MathUtils(); //make this abstract

    // const distance = mathUtils.cosine(matchingQA.embedding, suggestedEmbeddings[0]);
    const distance = similarity(matchingQA.embedding, suggestedEmbeddings[0]);
}

export default vectorDistance;