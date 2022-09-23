<script lang="ts">
    import type { NavBarRoutes } from '../../types/navBar';
    import convertRoutesToNavBarOptions from '../../util/convertRoutesToNavBarOptions';
    import NavBar from './NavBar.svelte';
    import Logo from './Logo.svelte';
    export let title: string;
    export let routes: NavBarRoutes;
    const navBarOptions = convertRoutesToNavBarOptions(routes);
</script>

<header>
    <section class="container">
        <Logo />
        <h1>{title}</h1>
        <NavBar options={navBarOptions} />
    </section>
</header>

<style lang="scss">
    @use '../../variables' as v;

    header {
        @include v.text-config;
        padding: 1rem 0 1rem 0;
        background-color: scale-color(v.$black, $lightness: +5%);
        height: 12rem;

        @media (min-width: 768px) {
            height: 4rem;
            padding: 0.5rem 0 0.5rem 0;
        }
    }

    .container {
        @include v.header-size;
        @include v.mx-auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;

        @media (min-width: 768px) {
            display: block;
            flex-direction: unset;
            align-items: unset;
            align-content: unset;
        }
    }

    h1 {
        color: v.$green;
        margin: 0.7rem 0 0.7rem 0;
        font-weight: 700;
        letter-spacing: 0.2rem;
        font-size: 2rem;

        @media (min-width: 768px) {
            margin: 1rem 0 1rem 0;
            font-size: 2.5rem;
        }
    }
</style>
