<script lang="ts">
    // @TODO:   ContentPage.svelte and Article.svelte are too similar
    //          there might be a way to do this generic??
    import type { ContentPage } from 'src/types/ContentPage';
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';
    import { contentPageById } from '../config/apiRoute';
    import { fetchApi } from '../util/api';
    import getNewPageTitle from '../util/getNewPageTitle';
    import isValidUUID from '../util/isValidUUID';
    import NotFoundPage from './NotFoundPage.svelte';
    import RenderableContent from '../lib/RenderableContent/RenderableContent.svelte';
    import Status from '../lib/Status.svelte';
    import Title from '../lib/Page/Title.svelte';
    import Wrapper from '../lib/Page/Wrapper.svelte';

    export let id = '';

    let validId = id.length > 0 && isValidUUID(id);

    const foundPage = writable(validId);
    const pageContent: Writable<Partial<ContentPage>> = writable({});
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadPage = () => {
        isLoading.set(true);
        fetchApi(contentPageById(id))
            .then(({ response, found }) => {
                pageContent.set(response);
                foundPage.set(found);
                haveError.set(false);
            })
            .catch((err) => {
                console.error(err);
                foundPage.set(true);
                haveError.set(true);
            })
            .finally(() => {
                isLoading.set(false);
            });
    };

    if (validId && $isLoading && !$haveError && Object.keys($pageContent).length === 0) {
        loadPage();
    }

    pageContent.subscribe((value) => {
        if (value.title && value.title.length > 0) {
            document.title = getNewPageTitle(value.title);
        }
    });
</script>

{#if $foundPage}
    <Wrapper>
        <Status isLoading={$isLoading} haveError={$haveError} retry={loadPage}>
            {#if Object.keys($pageContent).length > 0}
                {#each $pageContent.contents as renderableContent}
                    <RenderableContent contents={renderableContent} />
                {/each}
            {/if}
        </Status>
    </Wrapper>
{:else}
    <NotFoundPage />
{/if}
