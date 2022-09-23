<script lang="ts">
    import { pageTitle } from './config/pageTitle';
    import { Router, Route } from 'svelte-navigator';
    import { aboutPageId } from './config/contentPageId';
    import Header from './lib/Header/Header.svelte';
    import NotFoundPage from './pages/NotFoundPage.svelte';
    import HomePage from './pages/HomePage.svelte';
    import ContentPage from './pages/ContentPage.svelte';
    import ToolsPage from './pages/ToolsPage.svelte';
    import BlogPage from './pages/blog/BlogPage.svelte';
</script>

<Router primary={false}>
    <main>
        <Header
            title={pageTitle}
            routes={{
                ['Home']: '/',
                ['Blog']: '/blog',
                ['Tools']: '/tools',
                ['About']: '/about',
            }}
        />
        <Route path="about">
            <ContentPage id={aboutPageId} />
        </Route>
        <Route path="tools" component={ToolsPage} />
        <Route path="blog/*route" component={BlogPage} />
        <Route path="/" component={HomePage} />
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
