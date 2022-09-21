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
        <section class="title-nav">
            <h1>{title}</h1>
            <NavBar options={navBarOptions} />
        </section>
    </section>
</header>

<style lang="scss">
    @use '../../variables' as v;

    header {
        @include v.page-wrapper;
        background-color: scale-color(v.$black, $lightness: +5%);
        height: 12rem;
    }

    .container {
        @include v.mx-auto;
    }

    .title-nav {
    }

    h1 {
        margin: 0.5rem;
        font-size: 2rem;
        // font-size: 3rem; desktop
        font-weight: 700;
        letter-spacing: 0.2rem;
        color: v.$green;
    }
</style>
