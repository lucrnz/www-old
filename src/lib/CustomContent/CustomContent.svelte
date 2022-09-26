<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import type { Renderers } from 'svelte-markdown';
    import Paragraph from '@lib/Paragraph.svelte';
    import Image from './Adapters/Image.svelte';
    import Link from '@lib/Link.svelte';
    import Title from '@lib/Title.svelte';

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
