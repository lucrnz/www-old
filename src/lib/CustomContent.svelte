<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import type { Renderers } from 'svelte-markdown';
    import Paragraph from './Paragraph.svelte';
    import Image from './Image.svelte';
    import Link from './Link.svelte';
    import Title from './Title.svelte';

    export let contents: string = '';

    const renderers: Partial<Renderers> = {
        paragraph: Paragraph,
        image: Image,
        link: Link,
        heading: Title,
    };
</script>

{#if contents.length > 0}
    <SvelteMarkdown source={contents} renderers={renderers} />
{/if}
