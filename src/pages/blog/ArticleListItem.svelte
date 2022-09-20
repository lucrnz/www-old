<script lang="ts">
    import type { BlogArticle } from '../../types/BlogArticle';
    import { link } from 'svelte-navigator';
    import textConfig from '../../config/textConfig';
    import mapToCssVariables from '../../util/mapToCssVariables';
    import Title from '../../lib/Page/Title.svelte';

    export let article: BlogArticle;

    const articleUrl = `/blog/article/${article.id}`;
    const textConfigCss = mapToCssVariables(textConfig);
</script>

<div class="article-card">
    <div class="title" style={textConfigCss}>
        <a href={articleUrl} use:link><Title>{article.title}</Title></a>
    </div>
    <div class="create-date" style={textConfigCss}>
        Created at {article.creationDate.toString()}
    </div>
    <div class="time-read" style={textConfigCss}>
        {article.readTimeMinutes} minutes read.
    </div>
    <div class="description" style={textConfigCss}>
        {article.description}
    </div>
</div>

<style lang="scss">
    .article-card {
        .create-date,
        .time-read,
        .description {
            font-weight: 300;
            letter-spacing: var(--letterSpacing);
            line-height: var(--lineHeight);
        }
    }
</style>
