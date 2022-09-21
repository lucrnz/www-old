<script lang="ts">
    export let error: string = '';
    export let isLoading: boolean = false;
    export let retry: (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void;

    const haveError = error.length > 0;
</script>

{#if isLoading || haveError}
    <div>
        {#if isLoading}
            <p class="loading">Loading...</p>
        {:else if error.length > 0}
            <p class="error">
                {error}
                <button on:click={retry}>Retry</button>
            </p>
        {/if}
    </div>
{:else}
    <slot />
{/if}

<style lang="scss">
    @use '../variables.scss' as v;

    p {
        @include v.text-config;
        font-weight: 300;

        &.error {
            color: red;
        }
        &.loading {
            font-style: italic;
        }
    }
</style>
