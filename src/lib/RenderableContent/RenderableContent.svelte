<script type="ts">
    import Paragraph from '../Page/Paragraph.svelte';
    import Section from '../Page/Section.svelte';
    import { RenderableContentType } from '../../types/RenderableContent';
    import type { RenderableContent } from '../../types/RenderableContent';
    import { getParamAsString, getParamAsRenderableContentArray } from './paramHelper';
    import ToggeableSection from '../Page/ToggeableSection.svelte';
    import Title from '../Page/Title.svelte';
    import Image from '../Image.svelte';

    export let contents: RenderableContent;
    const param = (paramName: string): string => getParamAsString(paramName, contents.params);
    const paramRc = (paramName: string): RenderableContent[] =>
        getParamAsRenderableContentArray(paramName, contents.params);
</script>

{#if contents !== undefined && Object.keys(contents.params).length > 0}
    {#if contents.type === RenderableContentType.Paragraph}
        <Paragraph>
            {#each paramRc('value') as child}
                <svelte:self contents={child} />
            {/each}
        </Paragraph>
    {:else if contents.type === RenderableContentType.Section}
        <Section>
            {#each paramRc('value') as child}
                <svelte:self contents={child} />
            {/each}
        </Section>
    {:else if contents.type === RenderableContentType.ToggeableSection}
        <ToggeableSection title={param('title')}>
            {#each paramRc('value') as child}
                <svelte:self contents={child} />
            {/each}
        </ToggeableSection>
    {:else if contents.type === RenderableContentType.Text}
        {param('value')}
    {:else if contents.type === RenderableContentType.Title}
        <Title>{param('value')}</Title>
    {:else if contents.type === RenderableContentType.Link}
        <a href={param('url')} target="_blank" aria-label={param('alt')}>{param('value')}</a>
    {:else if contents.type === RenderableContentType.Image}
        <Image id={parseInt(param('id'))} alt={param('alt')} />
    {/if}
{/if}
