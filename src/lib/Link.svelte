<script lang="ts">
    export let href: string;
</script>

<a href={href} target="_blank"><slot /></a>

<style lang="scss">
    @use '../variables.scss' as v;

    a {
        @include v.text-config;
    }
</style>
