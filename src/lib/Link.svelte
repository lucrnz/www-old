<script lang="ts">
    export let url: string;
    export let alt: string;
    export let value: string;
</script>

<a href={url} target="_blank" aria-label={alt}>{value}</a>

<style lang="scss">
    @use '../variables.scss' as v;

    a {
        @include v.text-config;
    }
</style>
