<script lang="ts">
    import { link, useLocation } from 'svelte-navigator';
    import { routes } from '../../config/routes';
    const location = useLocation();
</script>

<nav>
    <ol>
        {#each routes as route, i}
            <li>
                <a
                    class={`nav-btn${
                        route.path === '/'
                            ? $location.pathname === route.path
                                ? ' nav-btn-sel'
                                : ''
                            : $location.pathname.startsWith(route.path)
                            ? ' nav-btn-sel'
                            : ''
                    }${i === 0 ? ' nav-btn-first' : ''}`}
                    href={route.path}
                    use:link>{route.title}</a
                >
            </li>
        {/each}
    </ol>
</nav>

<style lang="scss">
    @use '../../variables.scss' as v;

    nav {
        margin: 0.5rem 0 0.5rem 0;
        padding: 0.5rem;

        @media (min-width: 1024px) {
            float: right;
            display: inline-block;
            vertical-align: middle;
        }
    }

    li {
        display: inline;
    }

    .nav-btn {
        @include v.border-radius-strong;
        @include v.nav-bar-font-size;

        color: v.$white;
        border: 0.1rem solid v.$primary;

        margin-left: 0.3rem;
        font-size: 1rem;
        padding: 0.4rem;

        @media (min-width: 375px) {
            margin-left: 0.4rem;
            padding: 0.5rem;
        }

        @media (min-width: 1024px) {
            margin-left: 0.5rem;
            padding: 0.5rem 1rem 0.5rem 1rem;
            font-size: 1.25rem;
        }

        &:hover {
            background-color: v.$secondary;
            text-decoration: none;
        }

        &:active {
            background-color: scale-color(v.$secondary, $lightness: -30%);
        }
    }

    .nav-btn-first {
        margin-left: 0;
    }

    .nav-btn-sel {
        background-color: #785d4a83;
    }
</style>
