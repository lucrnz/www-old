<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { fetchApi } from '../../util/api';
    import { blogArticle } from '../../config/apiRoute';
    import ArticleListItem from './ArticleListItem.svelte';
    import getNewPageTitle from '../../util/getNewPageTitle';
    import Paragraph from '../../lib/Page/Paragraph.svelte';
    import Status from '../../lib/Status.svelte';
    import Title from '../../lib/Page/Title.svelte';
    import Wrapper from '../../lib/Page/Wrapper.svelte';
    import NotFoundPage from '../NotFoundPage.svelte';

    const foundPage = writable(true);
    const articles = writable([]);
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadArticles = () => {
        foundPage.set(true);
        isLoading.set(true);
        fetchApi(blogArticle)
            .then(({ response, found }) => {
                foundPage.set(found);
                haveError.set(false);
                articles.set(response);
            })
            .catch((err) => {
                foundPage.set(true);
                haveError.set(true);
            })
            .finally(() => {
                isLoading.set(false);
            });
    };

    if ($isLoading && !$haveError && $articles.length === 0) {
        loadArticles();
    }

    onMount(() => {
        document.title = getNewPageTitle('Blog');
    });
</script>

{#if $foundPage}
    <Wrapper>
        <Title>Blog</Title>
        <Paragraph>Welcome to my blog! Here is where I write about multiple topics 🙂</Paragraph>
        <Status isLoading={$isLoading} haveError={$haveError} retry={loadArticles}>
            {#if $articles.length > 0}
                {#each $articles as article}
                    <ArticleListItem article={article} />
                {/each}
            {/if}
        </Status>
    </Wrapper>
{:else}
    <NotFoundPage retry={loadArticles} />
{/if}
