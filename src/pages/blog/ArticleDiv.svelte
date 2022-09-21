<script lang="ts">
    import Paragraph from '../../lib/Page/Paragraph.svelte';
    import blogArticleDivType from '../../config/blogArticleDivType';
    import type { BlogArticleDiv } from '../../types/BlogArticle';

    export let contents: BlogArticleDiv;
</script>

{#if Object.keys(contents.params).length > 0}
    <Paragraph>
        {#if contents.type === blogArticleDivType.Text.toString()}
            {contents.params['value']}
        {:else if contents.type === blogArticleDivType.Link.toString()}
            <a href={contents.params['href']}>{contents.params['value']}</a>
        {:else if contents.type === blogArticleDivType.Image.toString()}
            <img src={`/image/` + contents.params['id']} alt={contents.params['alt']} />
        {/if}
    </Paragraph>
{/if}

<style lang="scss">
    img {
        max-width: 100%;
    }
</style>
