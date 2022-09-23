export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.addEventListener('load', () => {
                resolve(reader.result);
            });
        } catch (err) {
            reject(err);
        }
    });
};
