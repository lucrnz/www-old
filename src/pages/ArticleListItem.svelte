<script lang="ts">
    import type { BlogArticle } from '$types/BlogArticle';
    import { formatDate } from '$util/formatDate';
    import { link } from 'svelte-navigator';
    import Title from '$lib/Title.svelte';

    export let article: BlogArticle;

    import { articleById } from '$config/routes';
</script>

<div class="article-card">
    <div class="title">
        <a href={articleById(article.id)} use:link><Title>{article.title}</Title></a>
    </div>
    <div class="info">
        {formatDate(article.creationDate)} • {article.readTimeMinutes} minutes read.
    </div>
    <div class="description">
        {article.description}
    </div>
</div>

<style lang="scss">
    @use '../variables.scss' as v;

    .article-card {
        .info,
        .description {
            @include v.text-config;
            font-weight: 300;
        }
    }

    .info {
        @include v.footer-font-size;
    }
</style>
