<script lang="ts">
    import mapToCssVariables from '../../util/mapToCssVariables';
    import imageUrl from '../../assets/pepe.svg';
</script>

<div
    alt="Pepe the frog"
    aria-label="Pepe the frog"
    style={mapToCssVariables({
        ['image-url']: `url(${imageUrl})`,
    })}
/>

<style lang="scss">
    div {
        height: 4rem;
        width: 4rem;
        background-image: var(--image-url);
        background-size: 3.5rem;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #785d4a;
        border-radius: 5rem;
        padding: 0.5rem;
    }
</style>
