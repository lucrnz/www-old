<script lang="ts">
    import type { NavBarOption } from '../../types/navBar';
    import { link, useLocation } from 'svelte-navigator';
    export let options: NavBarOption[];
    const location = useLocation();
</script>

<nav>
    <ol>
        {#each options as option, i}
            <li>
                <a
                    class={`nav-btn${
                        option.path === '/'
                            ? $location.pathname === option.path
                                ? ' nav-btn-sel'
                                : ''
                            : $location.pathname.startsWith(option.path)
                            ? ' nav-btn-sel'
                            : ''
                    }${i === 0 ? ' nav-btn-first' : ''}`}
                    href={option.path}
                    use:link>{option.title}</a
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

        @media (min-width: 768px) {
            margin-left: 0.5rem;
            padding: 0.5rem 1rem 0.5rem 1rem;
            font-size: 1.25rem;
        }

        &:hover {
            background-color: #785d4a;
            text-decoration: none;
        }

        &:active {
            background-color: #785d4a83;
        }
    }

    .nav-btn-first {
        margin-left: 0;
    }

    .nav-btn-sel {
        background-color: #785d4a83;
    }
</style>
