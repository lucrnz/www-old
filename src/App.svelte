<script>
    import { Router, Route } from 'svelte-navigator';
    import HomePage from './pages/HomePage.svelte';
    import AboutPage from './pages/AboutPage.svelte';
    import ToolsPage from './pages/ToolsPage.svelte';
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
</script>

<Router>
    <Header
        title="Luc's Website"
        routes={{
            ['Home']: '/',
            ['About']: '/about',
            ['Tools']: '/tools',
        }}
    />
    <Route path="about">
        <AboutPage />
    </Route>
    <Route path="tools">
        <ToolsPage />
    </Route>
    <Route path="/">
        <HomePage />
    </Route>
    <Footer copyrightYear="2022" authorName="Lucien Cupcakes" />
</Router>
