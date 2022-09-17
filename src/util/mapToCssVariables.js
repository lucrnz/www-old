const mapToCssVariables = (dictionary) => {
    let result = '';
    for (const key of Object.keys(dictionary)) {
        const value = dictionary[key];
        result = `${result}--${key}: ${value};`;
    }
    return result;
};

export default mapToCssVariables;
