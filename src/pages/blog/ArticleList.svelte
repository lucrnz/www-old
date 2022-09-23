<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import Title from '../../lib/Page/Title.svelte';
    import Paragraph from '../../lib/Page/Paragraph.svelte';
    import Wrapper from '../../lib/Page/Wrapper.svelte';
    import Status from '../../lib/Status.svelte';
    import getNewPageTitle from '../../util/getNewPageTitle';
    import ArticleListItem from './ArticleListItem.svelte';

    const articles = writable([]);
    const isLoading = writable(true);
    const haveError = writable(false);

    const loadArticles = () =>
        fetch('/api/blog-articles')
            .then((rawResult) => {
                rawResult
                    .json()
                    .then((apiResult) => {
                        const { response: articlesList } = apiResult;
                        articles.set(articlesList);
                        haveError.set(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        haveError.set(true);
                    });
            })
            .catch((err) => {
                console.error('API error', err);
                haveError.set(true);
            })
            .finally(() => {
                isLoading.set(false);
            });

    if ($isLoading && !$haveError && $articles.length === 0) {
        loadArticles();
    }

    onMount(() => {
        document.title = getNewPageTitle('Blog');
    });
</script>

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
