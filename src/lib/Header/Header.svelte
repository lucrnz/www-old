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
        @include v.page-size;
        padding: 1rem 0 1rem 0;
        background-color: scale-color(v.$black, $lightness: +5%);
        height: 12rem;
    }

    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    h1 {
        margin: 1rem 0 1rem 0;
        font-size: 2rem;
        // font-size: 3rem; desktop
        font-weight: 700;
        letter-spacing: 0.2rem;
        color: v.$green;
    }
</style>
