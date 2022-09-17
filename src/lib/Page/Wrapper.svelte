<script>
    import Footer from '../Footer.svelte';
    import { inAnimation, inConfig } from '../../config/animationConfig.js';
</script>

<main id="main-content" in:inAnimation={inConfig}>
    <slot />
    <Footer copyrightYear="2022" authorName="Lucien Cupcakes" />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem;
    }
</style>
