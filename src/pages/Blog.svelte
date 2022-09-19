<script lang="ts">
    import Title from '../lib/Page/Title.svelte';
    import Paragraph from '../lib/Page/Paragraph.svelte';
    import Wrapper from '../lib/Page/Wrapper.svelte';

    let articles = [];
    let apiCalled = false;

    if (!apiCalled && articles.length === 0) {
        fetch('/api/blog-articles')
            .then((rawResult) => {
                console.log(rawResult);
                rawResult
                    .json()
                    .then((apiResult) => {
                        const { response: articlesIdList } = apiResult;
                        articles = articlesIdList;
                        apiCalled = true;
                    })
                    .catch((err) => {
                        console.error('Cannot parse to JSON', err);
                    });
            })
            .catch((err) => {
                console.error('Cannot call API', err);
            });
    }
</script>

<Wrapper>
    <Title>Blog</Title>
    <Paragraph>This section is for showing my blog posts!</Paragraph>

    {#if apiCalled}
        {#each articles as articleId}
            <code>{articleId}</code>
        {/each}
    {/if}
</Wrapper>
