const isValidUUID = (str: string) => {
    // https://gist.github.com/johnelliott/cf77003f72f889abbc3f32785fa3df8d
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    return Boolean(str.match(v4));
};

export default isValidUUID;
