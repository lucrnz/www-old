<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Header from './lib/Header/Header.svelte';
    import HomePage from './pages/HomePage.svelte';
    import AboutPage from './pages/AboutPage.svelte';
    import ToolsPage from './pages/ToolsPage.svelte';
    import BlogPage from './pages/Blog.svelte';
</script>

<Router>
    <Header
        title="Luc's Website"
        routes={{
            ['Home']: '/',
            ['Blog']: '/blog',
            ['Tools']: '/tools',
            ['About']: '/about',
        }}
    />
    <Route path="about" component={AboutPage} />
    <Route path="tools" component={ToolsPage} />
    <Route path="blog" component={BlogPage} />
    <Route path="/" component={HomePage} />
</Router>
