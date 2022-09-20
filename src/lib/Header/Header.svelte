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
        background-color: scale-color(v.$black, $lightness: +5%);
        width: 100vw;
        height: 15rem;
    }

    .container {
        @include v.flex-center;
        flex-direction: row;
        width: 65vw;
        gap: 1.5rem;
    }

    .title-nav {
        @include v.flex-center;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1.2rem;
    }

    h1 {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: 0.2rem;
        color: v.$green;
    }
</style>
