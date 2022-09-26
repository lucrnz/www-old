<script lang="ts">
    import { errorMessage } from '$config/errorMessage';
    import mapToCssVariables from '$util/mapToCssVariables';
    import { loaderSvg } from '$config/loaderSvg';
    export let haveError = false;
    export let isLoading: boolean = false;
    export let height: string = 'auto';
    export let margin: string = '2rem 0 2rem 0';

    export let retry: (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void;
</script>

{#if isLoading || haveError}
    <section style={mapToCssVariables({ height, margin })} class={isLoading ? 'sec-loading' : ''}>
        {#if isLoading}
            <div aria-label="Loading..." class="loader">
                {@html loaderSvg}
            </div>
        {:else if haveError}
            <div class="error">
                <p>{errorMessage}</p>
                <button on:click={retry}>Retry</button>
            </div>
        {/if}
    </section>
{:else}
    <slot />
{/if}

<style lang="scss">
    @use '../variables.scss' as v;

    .error {
        @include v.text-config;
        font-weight: 300;
        @include v.text-config;
        @include v.border-radius-small;
        margin: 2rem 0 2rem 0;
        padding: 1rem;
        height: var(--height);
        border: 0.1rem solid v.$gray;

        & > button {
            margin: 1rem 0 0 0;
        }
    }

    .loader {
        height: 1rem;
        width: 3rem;
    }

    section {
        margin: var(--margin);
        height: var(--height);
        &.sec-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
        }
    }
</style>
