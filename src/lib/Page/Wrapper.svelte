<script>
    import Footer from '../Footer.svelte';
    import { inAnimation, inConfig } from '../../config/animationConfig.js';
</script>

<article in:inAnimation={inConfig}>
    <slot />
    <Footer copyrightYear="2022" authorName="Lucien Cupcakes" />
</article>

<style>
    article {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem;
        width: 65vw;
    }
</style>
