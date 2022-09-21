<script lang="ts">
    import type { NavBarOption } from '../../types/navBar';
    import { link, useLocation } from 'svelte-navigator';
    export let options: NavBarOption[];
    const location = useLocation();
</script>

<ul>
    {#each options as option, i}
        <li>
            <a
                class={`nav-button${
                    option.path === '/'
                        ? $location.pathname === option.path
                            ? ' nav-button-selected'
                            : ''
                        : $location.pathname.startsWith(option.path)
                        ? ' nav-button-selected'
                        : ''
                }${i === 0 ? ' nav-button-first' : ''}`}
                href={option.path}
                use:link>{option.title}</a
            >
        </li>
    {/each}
</ul>

<style lang="scss">
    @use '../../variables.scss' as v;

    ul {
        margin-top: 2rem;
        padding: 0.5rem;
    }

    li {
        display: inline;
    }

    .nav-button {
        // font-size: 1.75rem; desktop
        font-size: 1.25rem;
        color: v.$white;
        border: 0.1rem solid v.$primary;
        border-radius: 3rem;
        // padding: 0.5rem 1rem 0.5rem 1rem; //desktop
        padding: 0.6rem;
        margin-left: 0.4rem;

        &:hover {
            background-color: #785d4a;
            text-decoration: none;
        }

        &:active {
            background-color: #785d4a83;
        }
    }

    .nav-button-first {
        margin-left: 0;
    }

    .nav-button-selected {
        background-color: #785d4a83;
    }
</style>
