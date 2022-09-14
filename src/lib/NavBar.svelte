<script>
    export let options;
</script>

<ul>
    {#each options as option}
        <li><button>{option.title}</button></li>
    {/each}
</ul>

<style>
    ul {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin: 0;
        padding: 1rem;
        border: 0.1rem solid gray;
        border-radius: 0.5rem;
    }

    ul > li {
        margin: 0;
        display: inline-flex;
    }

    button {
        margin: 0;
        padding: 0;
        background-color: unset;
        color: orange;
        border: none;
        font-size: 1rem;
        cursor: pointer;
    }
</style>
