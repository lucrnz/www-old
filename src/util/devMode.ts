export const isDevMode = (): boolean =>
    import.meta.env && import.meta.env.MODE
        ? import.meta.env.MODE.toLocaleLowerCase().startsWith('dev')
        : false;

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
