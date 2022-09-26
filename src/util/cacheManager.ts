export const isCached = (name: string) => {
    const itemExpiryStr = localStorage.getItem(`cache_${name.toLowerCase()}_metadata`);

    if (!itemExpiryStr) {
        return false;
    }

    const itemExpiry = new Date(Number(itemExpiryStr));
    const timeNow = new Date();

    const minutesElapsed = (timeNow.getTime() - itemExpiry.getTime()) / 60000;
};
