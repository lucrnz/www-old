export type CSSVariables = {
    [key: string]: string;
};

const mapToCssVariables = (dictionary: CSSVariables) => {
    let result: string = '';
    for (const key of Object.keys(dictionary)) {
        const value = dictionary[key];
        result = `${result}--${key}: ${value};`;
    }
    return result;
};

export default mapToCssVariables;
