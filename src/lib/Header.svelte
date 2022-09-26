<script lang="ts">
    import { link } from 'svelte-navigator';
    import { pageTitle } from '$config/pageTitle';
    import NavBar from './NavBar.svelte';
    import Logo from './Logo.svelte';
</script>

<header>
    <div class="container">
        <Logo />
        <h1><a use:link href="/" aria-label="Go to the home page">{pageTitle}</a></h1>
        <NavBar />
    </div>
</header>

<style lang="scss">
    @use '../variables' as v;

    header {
        @include v.text-config;
        padding: 1rem 0 1rem 0;
        background-color: scale-color(v.$black, $lightness: +5%);
        height: 12rem;

        @media (min-width: 1024px) {
            position: sticky;
            top: 0;
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

        @media (min-width: 1024px) {
            display: block;
            flex-direction: unset;
            align-items: unset;
            align-content: unset;
        }
    }

    h1 {
        display: inline-block;
        vertical-align: middle;
        color: v.$green;
        margin: 0.7rem 0 0.7rem 0;
        font-weight: 700;
        letter-spacing: 0.2rem;
        font-size: 2rem;

        @media (min-width: 1024px) {
            margin: 0 0.5rem 0 0;
            font-size: 2.2rem;
        }
    }

    h1 > a {
        color: unset;
        &,
        &:hover,
        &:active {
            text-decoration: none;
        }
    }
</style>
