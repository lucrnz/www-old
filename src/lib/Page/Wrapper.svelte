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
        @include v.page-size;
        padding: 1rem 0 1rem 0;
    }
</style>
