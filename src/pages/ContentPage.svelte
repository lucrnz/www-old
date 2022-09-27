<script lang="ts">
    import type { ContentPage } from 'src/types/ContentPage';
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';
    import { contentPageById } from '$config/apiRoute';
    import { fetchApi } from '$util/api';
    import getNewPageTitle from '$util/getNewPageTitle';
    import NotFoundPage from './NotFoundPage.svelte';
    import Status from '$lib/Status.svelte';
    import Wrapper from '$lib/Wrapper.svelte';
    import CustomContent from '$lib/CustomContent/CustomContent.svelte';

    export let id = '';
    const validId = id.length > 0;

    const foundPage = writable(validId);
    const pageContent: Writable<Partial<ContentPage>> = writable({});
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadPage = () => {
        foundPage.set(true);
        isLoading.set(true);
        fetchApi(contentPageById(id))
            .then(({ response, found }) => {
                pageContent.set(response);
                foundPage.set(found);
                haveError.set(false);
            })
            .catch((err) => {
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
                <CustomContent contents={$pageContent.contents} />
                <slot />
            {/if}
        </Status>
    </Wrapper>
{:else}
    <NotFoundPage retry={loadPage} />
{/if}
