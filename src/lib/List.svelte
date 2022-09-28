<script lang="ts">
    export let ordered: boolean;
    export let start: number;
</script>

{#if ordered}
    <ol start={start}><slot /></ol>
{:else}
    <ul><slot /></ul>
{/if}

<style lang="scss">
    ul {
        margin-left: 1rem;
        list-style-type: '- ';
    }
</style>
