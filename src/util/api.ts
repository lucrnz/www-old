import { imageById } from '../config/apiRoute';
import { blobToBase64 } from '../util/blobToBase64';
// @TODO: Implement cache.

export const fetchApi = (route: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const fetchResponse = await fetch(`//${window.location.host}/api/${route}`);
            const fetchResponseJSON = await fetchResponse.json();
            const { response } = fetchResponseJSON;
            const found = response !== undefined;
            resolve({ found, response: found ? response : {} });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });

export const fetchImageById = (imageId: number): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const fetchResponse = await fetch(`//${window.location.host}/${imageById(imageId)}`);
            const blob = await fetchResponse.blob();
            const result = await blobToBase64(blob);
            resolve({ found: true, response: result });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
