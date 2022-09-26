import type { CacheItem } from '$types/CacheItem';
import { cacheMaxTimeMs } from '$config/cache';
import { log } from '$util/devMode';

const getLocalStorageItemName = (itemName: string): string => `cache_${itemName.toLowerCase()}`;

export const isCached = async (
    itemName: string,
    getHash: (itemName: string) => Promise<string>
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const localStorageItemName = getLocalStorageItemName(itemName);
        const itemMetaStr = localStorage.getItem(`${localStorageItemName}_meta`);

        if (!itemMetaStr || itemMetaStr.length === 0) {
            return resolve(undefined);
        }

        let item: Partial<CacheItem>;
        try {
            item = JSON.parse(itemMetaStr);
        } catch (err) {
            log(err, true);
            return resolve(false);
        }

        const timeNow = new Date();

        const expiryReached = timeNow.getTime() >= item.expiry;

        if (!expiryReached) {
            return resolve(true);
        }

        if (expiryReached) {
            getHash(itemName)
                .then((hash: string) => {
                    if (item.hash === hash) {
                        item.expiry = timeNow.getTime() + cacheMaxTimeMs;
                        localStorage.setItem(`${localStorageItemName}_meta`, JSON.stringify(item));
                        return resolve(true);
                    } else {
                        localStorage.removeItem(localStorageItemName);
                        localStorage.removeItem(`${localStorageItemName}_meta`);
                        return resolve(false);
                    }
                })
                .catch((err) => {
                    log(err, true);
                    return resolve(false);
                });
        }
    });
};

export const clearCache = (): void => {
    log('Clearing all cache');
    localStorage.clear();
};

export const getCache = (
    itemName: string,
    getHash: (itemName: string) => Promise<string>
): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const localStorageItemName = getLocalStorageItemName(itemName);
        const usingCacheMsg = `Using cache for item ${itemName}`;
        const itemIsCached = await isCached(itemName, getHash);

        if (itemIsCached) {
            log(usingCacheMsg);
            return resolve(localStorage.getItem(localStorageItemName));
        } else {
            return resolve('');
        }
    });
};

export const setCache = (itemName: string, itemValue: string, hash: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const localStorageItemName = getLocalStorageItemName(itemName);
        const timeNow = new Date();
        const cacheItem: Partial<CacheItem> = {
            name: itemName,
            expiry: timeNow.getTime() + cacheMaxTimeMs,
            hash,
        };

        try {
            const cacheItemStr = JSON.stringify(cacheItem);
            localStorage.setItem(`${localStorageItemName}_meta`, cacheItemStr);
            localStorage.setItem(localStorageItemName, itemValue);
            log(`Set cache for item ${itemName}`);
        } catch (err) {
            log(err, true);
            clearCache();
        } finally {
            return resolve();
        }
    });
};
