<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';
    import Status from './Status.svelte';
    import { fetchImageById } from '../util/api';
    import isValidUUID from '../util/isValidUUID';
    import mapToCssVariables from '../util/mapToCssVariables';
    import { imageNotFound } from '../config/errorMessage';
    import { tick } from 'svelte';

    export let id = '';
    export let height = 'auto';
    export let alt = 'Image';

    let validId = id.length > 0 && isValidUUID(id);

    const foundImage = writable(validId);
    const imageData: Writable<string> = writable('');
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadImage = () => {
        isLoading.set(true);
        fetchImageById(id)
            .then(({ response, found }) => {
                imageData.set(response);
                foundImage.set(found);
                haveError.set(false);
            })
            .catch((err) => {
                console.error(err);
                foundImage.set(true);
                haveError.set(true);
            })
            .finally(() => {
                isLoading.set(false);
            });
    };

    if (validId && $isLoading && !$haveError && $imageData.length === 0) {
        loadImage();
    }
</script>

{#if $foundImage}
    <Status isLoading={$isLoading} haveError={$haveError} retry={loadImage} height={height}>
        {#if $imageData.length > 0}
            <img src={$imageData} alt={alt} />
        {/if}
    </Status>
{:else}
    <div class="img-not-found" style={mapToCssVariables({ height })}>
        <p>{imageNotFound}</p>
        <button on:click={loadImage}>Retry</button>
    </div>
{/if}

<style lang="scss">
    @use '../variables.scss' as v;

    img {
        max-width: 100%;
    }

    .img-not-found {
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
</style>
