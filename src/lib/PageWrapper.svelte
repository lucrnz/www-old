<script>
    export let title = '';
</script>

<main>
    {#if title.length > 0}<h2>{title}</h2>{/if}
    <slot />
</main>

<style>
    h2 {
        margin-top: 2rem;
    }
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem;
    }
</style>
