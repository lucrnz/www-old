<script lang="ts">
    import type { BlogArticle } from '../../types/BlogArticle';
    import { link } from 'svelte-navigator';
    import Title from '../../lib/Page/Title.svelte';

    export let article: BlogArticle;

    import { articleById } from '../../config/routes';
</script>

<div class="article-card">
    <div class="title">
        <a href={articleById(article.id)} use:link><Title>{article.title}</Title></a>
    </div>
    <div class="create-date">
        Created at {article.creationDate.toString()}
    </div>
    <div class="time-read">
        {article.readTimeMinutes} minutes read.
    </div>
    <div class="description">
        {article.description}
    </div>
</div>

<style lang="scss">
    @use '../../variables.scss' as v;

    .article-card {
        .create-date,
        .time-read,
        .description {
            @include v.text-config;
            font-weight: 300;
        }
    }
</style>
