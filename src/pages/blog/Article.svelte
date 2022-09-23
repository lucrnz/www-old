<script lang="ts">
    // @TODO:   ContentPage.svelte and Article.svelte are too similar
    //          there might be a way to do this generic??
    import type { BlogArticle } from 'src/types/BlogArticle';
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';
    import { blogArticleById } from '../../config/apiRoute';
    import { fetchApi } from '../../util/api';
    import getNewPageTitle from '../../util/getNewPageTitle';
    import isValidUUID from '../../util/isValidUUID';
    import NotFoundPage from '../NotFoundPage.svelte';
    import RenderableContent from '../../lib/RenderableContent/RenderableContent.svelte';
    import Status from '../../lib/Status.svelte';
    import Title from '../../lib/Page/Title.svelte';
    import Wrapper from '../../lib/Page/Wrapper.svelte';

    export let id = '';

    let validId = id.length > 0 && isValidUUID(id);

    const foundArticle = writable(validId);
    const article: Writable<Partial<BlogArticle>> = writable({});
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadArticle = () => {
        isLoading.set(true);
        fetchApi(blogArticleById(id))
            .then(({ response, found }) => {
                article.set(response);
                foundArticle.set(found);
                haveError.set(false);
            })
            .catch((err) => {
                console.error(err);
                foundArticle.set(true);
                haveError.set(true);
            })
            .finally(() => {
                isLoading.set(false);
            });
    };

    if (validId && $isLoading && !$haveError && Object.keys($article).length === 0) {
        loadArticle();
    }

    article.subscribe((value) => {
        if (value.title && value.title.length > 0) {
            document.title = getNewPageTitle(value.title);
        }
    });
</script>

{#if $foundArticle}
    <Wrapper>
        <Status isLoading={$isLoading} haveError={$haveError} retry={loadArticle}>
            {#if Object.keys($article).length > 0}
                <Title>{$article.title}</Title>
                {#each $article.contents as renderableContent}
                    <RenderableContent contents={renderableContent} />
                {/each}
            {/if}
        </Status>
    </Wrapper>
{:else}
    <NotFoundPage />
{/if}
