<script>
    import { Router, Route } from 'svelte-navigator';
    import HomePage from './pages/HomePage.svelte';
    import AboutPage from './pages/AboutPage.svelte';
    import Header from './lib/Header.svelte';
    import Footer from './lib/Footer.svelte';
</script>

<Router>
    <Header title="Luc's Website" />
    <Route path="about" component={AboutPage} />
    <Route path="/" component={HomePage} />
    <Footer copyrightYear="2022" authorName="Lucien Cupcakes" />
</Router>
