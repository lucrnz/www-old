<script lang="ts">
    import Footer from '../Footer.svelte';
    import { inAnimation, inConfig } from '../../config/animationConfig.js';
</script>

<article in:inAnimation={inConfig}>
    <slot />
    <Footer />
</article>

<style lang="scss">
    @use '../../variables.scss' as v;

    article {
        @include v.mx-auto;
        @include v.page-wrapper;
        padding-top: 2rem;
        max-width: 100vh;
    }
</style>
