export const isDevMode = (): boolean => {
    if (import.meta.env !== undefined && import.meta.env.MODE === 'development') {
        return true;
    }
    return false;
};

export const log = (message: string, isError: boolean = false) => {
    if (!isDevMode()) {
        return;
    }

    if (isError) {
        console.error(message);
    } else {
        console.log(message);
    }
};
