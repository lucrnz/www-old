<script>
    import mapToCssVariables from '../util/mapToCssVariables';
    import textConfig from '../config/textConfig';

    const textConfigCss = mapToCssVariables(textConfig);

    export let error = '';
    export let isLoading = false;
    export let retry;

    const haveError = error.length > 0;
</script>

{#if isLoading || haveError}
    <div>
        {#if isLoading}
            <p class="loading" style={textConfigCss}>Loading...</p>
        {:else if error.length > 0}
            <p class="error" style={textConfigCss}>
                {error}
                <button on:click={retry}>Retry</button>
            </p>
        {/if}
    </div>
{:else}
    <slot />
{/if}

<style lang="scss">
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    p {
        font-weight: 300;
        line-height: var(--lineHeight);
        letter-spacing: var(--letterSpacing);

        &.error {
            color: red;
        }
        &.loading {
            font-style: italic;
        }
    }
</style>
