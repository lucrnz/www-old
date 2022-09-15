<script>
    import { link } from 'svelte-navigator';
    export let options;
</script>

<ul>
    {#each options as option}
        <li><a class="nav-button" href={option.path} use:link>{option.title}</a></li>
    {/each}
</ul>

<style>
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
    }

    .nav-button:hover {
        background-color: #785d4a;
        text-decoration: none;
    }

    .nav-button:active {
        background-color: #785d4a83;
    }
</style>
