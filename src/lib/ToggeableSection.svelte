<script lang="ts">
    import { inAnimation, inConfig } from '@config/animationConfig.js';
    import ArrowIcon from './ArrowIcon.svelte';
    export let intent: string = 'display contents';
    export let title: string = '';
    let show = false;
</script>

<header on:click={() => (show = !show)} aria-label="Interact to {intent}">
    <h2>{title}</h2>
    {#if show}
        <ArrowIcon direction="up" />
    {:else}
        <ArrowIcon direction="down" />
    {/if}
</header>

{#if show}
    <section transition:inAnimation={inConfig}>
        <slot />
    </section>
{/if}

<style lang="scss">
    h2 {
        margin: 0 0 1rem 0;
    }

    header {
        cursor: pointer;
        margin: 2rem 0 0 0;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1rem;
    }

    section {
        margin: 0 0 2rem 0;
    }
</style>
