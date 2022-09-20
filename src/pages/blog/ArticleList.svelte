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
    const errorMessage = writable('');

    const loadArticles = () =>
        fetch('/api/blog-articles')
            .then((rawResult) => {
                rawResult
                    .json()
                    .then((apiResult) => {
                        const { response: articlesList } = apiResult;
                        articles.set(articlesList);
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

    if ($isLoading && $errorMessage.length === 0 && $articles.length === 0) {
        loadArticles();
    }

    onMount(() => {
        document.title = getNewPageTitle('Blog');
    });
</script>

<Wrapper>
    <Title>Articles</Title>
    <Paragraph>Welcome to my blog! These are the latests posts:</Paragraph>
    <Status isLoading={$isLoading} error={$errorMessage} retry={loadArticles}>
        {#if $articles.length > 0}
            {#each $articles as article}
                <ArticleListItem article={article} />
            {/each}
        {/if}
    </Status>
</Wrapper>
