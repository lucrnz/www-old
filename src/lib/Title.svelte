<h2><slot /></h2>

<style lang="scss">
    @use '../variables.scss' as v;

    h2 {
        @include v.text-config;
        @include v.header-font-size;
        margin: 1rem 0 1rem 0;
        font-weight: 500;
    }
</style>
