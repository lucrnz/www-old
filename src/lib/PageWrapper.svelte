<script>
    export let title = '';
</script>

<main>
    {#if title.length > 0}<h2>{title}</h2>{/if}
    <slot />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
</style>
