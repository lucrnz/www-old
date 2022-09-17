<script>
    import { onMount } from 'svelte';

    import { Router, Route } from 'svelte-navigator';
    import Header from './lib/Header/Header.svelte';
    import Wrapper from './lib/Page/Wrapper.svelte';

    /* Pages Import */
    import HomePage from './pages/HomePage.svelte';
    import AboutPage from './pages/AboutPage.svelte';
    import ToolsPage from './pages/ToolsPage.svelte';

    onMount(() => {
        document.querySelector('noscript').remove();
    });
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
    <Route path="about" component={AboutPage} />
    <Route path="tools" component={ToolsPage} />
    <Route path="/" component={HomePage} />
</Router>
