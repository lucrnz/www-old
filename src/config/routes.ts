import type { NavBarRoute } from 'src/types/navBar';

export const routes: NavBarRoute[] = [
    {
        title: 'Home',
        path: '/',
    },
    {
        title: 'Blog',
        path: '/blog',
    },
    {
        title: 'Tools',
        path: '/tools',
    },
    {
        title: 'About',
        path: '/about',
    },
];

export const articleById = (id: string) => `/blog/${id}`;
