<script>
    export let title = '';
</script>

<section>
    {#if title.length > 0}<h2>{title}</h2>{/if}
    <slot />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>
