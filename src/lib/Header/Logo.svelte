<script lang="ts">
    import mapToCssVariables from '../../util/mapToCssVariables';
    import imageUrl from '../../assets/logo.svg';
    const altText = 'Pepe the frog';
</script>

<div
    alt={altText}
    aria-label={altText}
    style={mapToCssVariables({
        ['url']: `url(${imageUrl})`,
    })}
/>

<style lang="scss">
    @use '../../variables.scss' as v;

    div {
        background-image: var(--url);
        background-repeat: no-repeat;
        background-position: center;
        background-color: #785d4a;
        border-radius: 5rem;

        height: 4rem;
        width: 4rem;
        background-size: 3.5rem;
        padding: 0.5rem;

        @media (min-width: 768px) {
            display: inline-block;
            height: 3.4rem;
            width: 3.4rem;
            padding: 0.3rem;
            background-size: 3rem;
        }
    }
</style>
