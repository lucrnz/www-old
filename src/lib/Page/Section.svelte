<section>
    <slot />
</section>

<style lang="scss">
    @use '../../variables.scss' as v;

    section {
        @include v.text-config;
        margin: 1rem 0 1rem 0;
    }
</style>
