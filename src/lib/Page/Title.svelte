<script lang="ts">
    import mapToCssVariables from '../../util/mapToCssVariables';
    import textConfig from '../../config/textConfig';
</script>

<h2 style={mapToCssVariables({ ...textConfig })}><slot /></h2>

<style>
    h2 {
        margin-top: 2rem;
        line-height: var(--lineHeight);
        letter-spacing: var(--letterSpacing);
    }
</style>
