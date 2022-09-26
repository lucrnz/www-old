<script type="ts">
    import Image from '@lib/Image.svelte';
    export let href: string;
    export let text: string;

    let id = '';

    if (href.length > 0) {
        if (href.startsWith('/')) {
            let t0 = href.substring(1);
            id = t0.substring(t0.indexOf('/') + 1);
        } else {
            id = href.substring(href.indexOf('/') + 1);
        }
    }

    const parsedId: number = id.length > 0 ? parseInt(id) : NaN;
</script>

{#if href.length > 0 && !isNaN(parsedId)}
    <Image id={parsedId} alt={text} />
{/if}
