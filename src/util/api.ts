import { imageById } from '../config/apiRoute';
import { blobToBase64 } from '../util/blobToBase64';

export const fetchApi = (route: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const fetchResponse = await fetch(`//${window.location.host}/api/${route}`);
            const fetchResponseJSON = await fetchResponse.json();
            const { response } = fetchResponseJSON;
            const found = response !== undefined;

            console.log(
                `[Request for route ${route}]`,
                found ? 'Found = ' : 'Not found',
                found ? `Object with ${Object.keys(response).length} keys.` : ''
            );

            // @TODO: Implement cache.
            resolve({ found, response: found ? response : {} });
        } catch (err) {
            reject(err);
        }
    });

export const fetchImageById = (imageId: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
        try {
            const fetchResponse = await fetch(`//${window.location.host}/${imageById(imageId)}`);
            const blob = await fetchResponse.blob();
            const result = await blobToBase64(blob);
            // @TODO: Implement cache.
            // [imageId: result]
            resolve({ found: true, response: result });
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
