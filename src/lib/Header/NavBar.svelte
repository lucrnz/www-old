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
        // font-size: 1.75rem; desktop
        font-size: 1.25rem;
        color: v.$white;
        border: 0.1rem solid v.$primary;
        border-radius: 3rem;
        // padding: 0.5rem 1rem 0.5rem 1rem; //desktop
        padding: 0.4rem;
        margin-left: 0.4rem;

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
