<script lang="ts">
    import type { NavBarOption } from '../../types/navBar';
    import { link, useLocation } from 'svelte-navigator';
    export let options: NavBarOption[];
    const location = useLocation();
</script>

<ul>
    {#each options as option}
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
                }`}
                href={option.path}
                use:link>{option.title}</a
            >
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin: 0;
        padding: 0.5rem;
    }

    ul > li {
        margin: 0;
        display: inline-flex;
    }

    .nav-button {
        font-size: 1.75rem;
        color: #fbfbfe;
        border: 0.1rem solid #ff9737;
        border-radius: 3rem;
        padding: 0.5rem 1rem 0.5rem 1rem;

        &:hover {
            background-color: #785d4a;
            text-decoration: none;
        }

        &:active {
            background-color: #785d4a83;
        }
    }

    .nav-button-selected {
        background-color: #785d4a83;
    }
</style>
