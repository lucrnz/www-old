import { imageById } from '$config/apiRoute';
import { blobToBase64 } from '$util/blobToBase64';
import { getCache, setCache } from '$util/cache';
import { cacheIsEnabled } from '$config/cache';
import { log } from '$util/devMode';

const getHash = (route: string): Promise<string> =>
    new Promise(async (resolve, reject) => {
        const fetchResponse = await fetch(`//${window.location.host}/${route}?hash=true`);
        const errMsgPrefix = `Cannot get hash for route ${route}:`;
        if (fetchResponse.ok) {
            try {
                const hashValue = await fetchResponse.text();

                if (hashValue.length > 0) {
                    resolve(hashValue);
                } else {
                    const errMsg = `${errMsgPrefix} API responded with empty value.`;
                    log(errMsg, true);
                    reject(errMsg);
                }
            } catch (err) {
                log(err, true);
                reject(err);
            }
        } else {
            const errMsg = `${errMsgPrefix} API responded with status code ${fetchResponse.status}.`;
            log(errMsg, true);
            reject(errMsg);
        }
    });

const getCacheNameFromRoute = (route: string) => route.replaceAll('/', '-');

export const fetchApi = (route: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const routeAsCacheName = getCacheNameFromRoute(route);
            const getHashAdapter = (itemName: string): Promise<string> =>
                new Promise(async (resolve, reject) => {
                    try {
                        const result = await getHash(`api/${route}`);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });

            const cache = cacheIsEnabled ? await getCache(routeAsCacheName, getHashAdapter) : '';

            let result: any = {};
            if (cache.length > 0) {
                try {
                    result = JSON.parse(cache);
                } catch (err) {
                    log(err, true);
                }
            } else {
                const url = `//${window.location.host}/api/${route}`;
                log(`Fetching ${url}`);
                const fetchResponse = await fetch(url);
                log(`Fetch ${url}: status: ${fetchResponse.status}`);
                if (fetchResponse.ok) {
                    try {
                        const resultStr = await fetchResponse.text();
                        const hash = await getHashAdapter('');
                        if (cacheIsEnabled) {
                            await setCache(routeAsCacheName, resultStr, hash);
                        }
                        result = JSON.parse(resultStr);
                    } catch (err) {
                        log(err, true);
                    }
                }
            }

            if (typeof result === 'object' && Object.keys(result).length > 0) {
                const { response } = result;
                const found = response !== undefined;
                resolve({ found, response: found ? response : {} });
            } else {
                resolve({ found: false });
            }
        } catch (err) {
            log(err, true);
            resolve({ found: false });
        }
    });

export const fetchImageById = (imageId: number): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const route = imageById(imageId);
            const routeAsCacheName = getCacheNameFromRoute(route);
            const getHashAdapter = (itemName: string): Promise<string> =>
                new Promise(async (resolve, reject) => {
                    try {
                        const result = await getHash(route);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                });

            const cache = cacheIsEnabled ? await getCache(routeAsCacheName, getHashAdapter) : '';

            if (cache.length > 0) {
                return resolve({ found: true, response: cache });
            }

            const url = `//${window.location.host}/${route}`;
            const fetchResponse = await fetch(url);
            log(`Fetch: ${url} : Status: ${fetchResponse.status}`);

            if (!fetchResponse.ok) {
                return resolve({ found: false, response: '' });
            }

            let result = '';
            try {
                const blob = await fetchResponse.blob();
                result = (await blobToBase64(blob)) as string;
            } catch (err) {
                log(err, true);
            }

            if (result.length > 0) {
                try {
                    const hash = await getHashAdapter('');
                    if (cacheIsEnabled) {
                        await setCache(routeAsCacheName, result, hash);
                    }
                } catch (err) {
                    log(err, true);
                }
            }

            return resolve({ found: result.length > 0, response: result });
        } catch (err) {
            log(err, true);
            return resolve({ found: false });
        }
    });
