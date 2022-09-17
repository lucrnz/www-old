const convertRoutesToNavBarOptions = (routes) => {
    const options = [];
    for (const key of Object.keys(routes)) {
        options.push({ title: key, path: routes[key] });
    }
    return options;
};

export default convertRoutesToNavBarOptions;
