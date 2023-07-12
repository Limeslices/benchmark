const rateLimit = async (promises: Promise<any>[]) => {
    //resolve 10 promises at a time
    let resolvedPromises = [];
    for (let i = 0; i < promises.length; i += 10) {
        const d = await Promise.all(promises.slice(i, i + 10));
        resolvedPromises.push(d);
    }
    return resolvedPromises;
}

export default rateLimit;