const getRemSizeInPixels = (value: number = 1): number => {
    const sizePxStr: string = window.getComputedStyle(document.body).fontSize.replaceAll('px', '');
    const sizePx: number = parseInt(sizePxStr);
    if (value > 1) {
        return value * sizePx;
    }
    return sizePx;
};

export default getRemSizeInPixels;
