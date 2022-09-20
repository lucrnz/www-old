<script lang="ts">
    import mapToCssVariables from '../../util/mapToCssVariables';
    import textConfig from '../../config/textConfig';
    export let className: string;
</script>

<p style={mapToCssVariables({ ...textConfig })} class={className}>
    <slot />
</p>

<style>
    p {
        font-weight: 300;
        line-height: var(--lineHeight);
        letter-spacing: var(--letterSpacing);
    }
</style>
