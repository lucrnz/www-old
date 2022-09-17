const sleepAsync = (timeMs: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), timeMs);
    });
};

export default sleepAsync;
