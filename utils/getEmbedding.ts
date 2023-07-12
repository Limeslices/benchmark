const getEmbedding = async (text: string | string[]): Promise<number[][]> => {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`
        },
        body: JSON.stringify({
            input: text,
            model: "text-embedding-ada-002"
        })
    })
    const data = await res.json();
    const embeddingsAndMetadata = data?.data; //this is assuming that the array is in order of the input
    return embeddingsAndMetadata.map((embeddingAndMetadata: any) => embeddingAndMetadata.embedding);
}

export default getEmbedding;