<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';
    import Status from '$lib/Status.svelte';
    import Button from '$lib/Button.svelte';
    import { fetchImageById } from '$util/api';
    import mapToCssVariables from '$util/mapToCssVariables';
    import { imageNotFound } from '$config/errorMessage';

    export let id: number;
    export let height = 'auto';
    export let alt = 'Image';

    const foundImage = writable(true);
    const imageData: Writable<string> = writable('');
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadImage = () => {
        foundImage.set(true);
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

    if ($isLoading && !$haveError && $imageData.length === 0) {
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
        <Button label="Retry" onClick={loadImage} />
    </div>
{/if}

<style lang="scss">
    @use '../variables.scss' as v;

    img {
        margin: 1rem 0 1rem 0;
        max-width: 100%;

        @media (min-width: 1444px) {
            max-width: 45rem;
        }
    }

    .img-not-found {
        @include v.text-config;
        @include v.border-radius-small;
        margin: 2rem 0 2rem 0;
        padding: 1rem;
        height: var(--height);
        border: 0.1rem solid v.$gray;
    }
</style>
