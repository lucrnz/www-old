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
    header {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
        height: 20rem;
        background-color: #2e2e2e;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        gap: 1.5rem;
        margin-left: 1rem;
    }

    .title-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        gap: 1.5rem;
        margin-top: 1.2rem;
    }

    h1 {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: 0.2rem;
        color: #49ebb1;
    }
</style>
