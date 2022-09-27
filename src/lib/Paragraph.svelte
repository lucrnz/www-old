<p>
    <slot />
</p>

<style lang="scss">
    @use '../variables.scss' as v;

    p {
        @include v.text-config;
        font-weight: 300;
        word-wrap: break-word;
        margin: 0.8rem 0 0.8rem 0;
    }
</style>
