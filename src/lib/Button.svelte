<script lang="ts">
    export let onClick: (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void;

    export let label: string;
</script>

<button on:click={onClick}>{label}</button>

<style lang="scss">
    @use '../../variables.scss' as v;

    button {
        @include v.text-config;
        margin: 1rem 0 1rem 0;
    }
</style>
