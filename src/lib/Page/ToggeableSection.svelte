<script lang="ts">
    import { inAnimation, inConfig } from '../../config/animationConfig.js';
    import ArrowIcon from '../ArrowIcon.svelte';
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
    header {
        cursor: pointer;
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1rem;
    }

    section {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>
