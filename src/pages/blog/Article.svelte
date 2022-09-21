<script lang="ts">
    import type { BlogArticle } from 'src/types/BlogArticle';
    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';
    import isValidUUID from '../../util/isValidUUID';
    import ArticleDiv from './ArticleDiv.svelte';
    import Wrapper from '../../lib/Page/Wrapper.svelte';
    import Title from '../../lib/Page/Title.svelte';
    import Status from '../../lib/Status.svelte';
    import NotFoundPage from '../NotFoundPage.svelte';
    import Paragraph from '../../lib/Page/Paragraph.svelte';
    import getNewPageTitle from '../../util/getNewPageTitle';

    export let id = '';

    let validId = id.length > 0 && isValidUUID(id);

    const notFoundPage = writable(!validId);
    const article: Writable<Partial<BlogArticle>> = writable({});
    const isLoading = writable(true);
    const errorMessage = writable('');

    //@TODO : Create API helper.
    const loadArticle = () =>
        fetch(`/api/blog-articles/${id}`)
            .then((rawResult) => {
                rawResult
                    .json()
                    .then((apiResult) => {
                        const { response } = apiResult;
                        article.set(response !== undefined ? response : {});
                        notFoundPage.set(response === undefined);
                    })
                    .catch((err) => {
                        console.error(err);
                        errorMessage.set(`API error: cannot parse JSON.`);
                    });
            })
            .catch((err) => {
                console.error('API error', err);
                errorMessage.set(`API error.`);
            })
            .finally(() => {
                isLoading.set(false);
            });

    if (validId && $isLoading && $errorMessage.length === 0 && Object.keys($article).length === 0) {
        loadArticle();
    }

    article.subscribe((value) => {
        if (value.title && value.title.length > 0) {
            document.title = getNewPageTitle(value.title);
        }
    });
</script>

{#if $notFoundPage}
    <NotFoundPage />
{:else}
    <Wrapper>
        <Status isLoading={$isLoading} error={$errorMessage} retry={loadArticle}>
            {#if Object.keys($article).length > 0}
                <Title>{$article.title}</Title>
                {#each $article.contents as articleDiv}
                    <ArticleDiv contents={articleDiv} />
                {/each}
            {/if}
        </Status>
    </Wrapper>
{/if}
