import type { NavBarOption, NavBarRoutes } from 'src/types/navBar';

const convertRoutesToNavBarOptions = (routes: NavBarRoutes): NavBarOption[] => {
    const options: NavBarOption[] = [];
    for (const key of Object.keys(routes)) {
        const newOption: NavBarOption = { title: key, path: routes[key] };
        options.push(newOption);
    }
    return options;
};

export default convertRoutesToNavBarOptions;
