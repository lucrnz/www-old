const getRemSizeInPixels = (value: number = 1): number => {
    let sizePx: number = parseInt(window.getComputedStyle(document.body).fontSize);
    if (value > 1) {
        return value * sizePx;
    }
    return sizePx;
};

export default getRemSizeInPixels;
