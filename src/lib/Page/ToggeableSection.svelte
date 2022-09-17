<script>
    import { inAnimation, inConfig } from '../../config/animationConfig.js';
    import ArrowIcon from '../ArrowIcon.svelte';
    export let intent = 'display contents';
    export let title = '';
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

<style>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
        margin-top: 2rem;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>
