<script lang="ts">
    import { onMount } from 'svelte';
    import { log } from '$util/devMode';
    import { Router, Route } from 'svelte-navigator';
    import { contentPageId } from '$config/contentPageId';
    import Header from '$lib/Header.svelte';
    import NotFoundPage from '$pages/NotFoundPage.svelte';
    import ContentPage from '$pages/ContentPage.svelte';
    import BlogPage from '$pages/BlogPage.svelte';

    onMount(log.bind(null, '🦄 App mounted'));
</script>

<Router primary={false}>
    <main>
        <Header />
        <Route path="about">
            <ContentPage id={contentPageId.AboutMe} />
        </Route>
        <Route path="tools">
            <ContentPage id={contentPageId.Tools} />
        </Route>
        <Route path="blog/*route" component={BlogPage} />
        <Route path="/">
            <ContentPage id={contentPageId.Home} />
        </Route>
        <Route component={NotFoundPage} />
    </main>
</Router>

<style lang="scss">
    @use './variables.scss' as v;

    main {
        margin-left: auto;
        margin-right: auto;
    }
</style>
