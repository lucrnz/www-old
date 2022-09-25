<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import NotFoundPage from './NotFoundPage.svelte';
    import Article from './Article.svelte';
    import ArticleList from './ArticleList.svelte';
</script>

<Router primary={false}>
    <Route path="/:id" let:params>
        <Article id={params.id} />
    </Route>
    <Route path="/">
        <ArticleList />
    </Route>
    <Route>
        <NotFoundPage />
    </Route>
</Router>
