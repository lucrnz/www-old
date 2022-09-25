<h2><slot /></h2>

<style lang="scss">
    @use '../variables.scss' as v;

    h2 {
        @include v.text-config;
        margin: 1rem 0 0.5rem 0;
    }
</style>
