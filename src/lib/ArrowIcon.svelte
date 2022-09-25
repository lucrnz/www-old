<script lang="ts">
    import mapToCssVariables from '@util/mapToCssVariables';
    export let sizeRem = 0.7;
    export let direction = 'up';
    export let color = window.getComputedStyle(document.body).color;

    let getRotationByDirection: { [key: string]: string } = {
        up: '-135deg',
        down: '45deg',
        left: '135deg',
        rigth: '-45deg',
    };

    const rotation = getRotationByDirection[direction];
    const padding = `${sizeRem - 0.3}rem`;
</script>

<div
    style={mapToCssVariables({
        color,
        rotation,
        padding,
    })}
    alt="arrow {direction}"
    aria-hidden="true"
/>

<style>
    div {
        border: solid var(--color);
        border-width: 0 0.3rem 0.3rem 0;
        display: inline-block;
        padding: var(--padding);
        rotate: var(--rotation);
    }
</style>
