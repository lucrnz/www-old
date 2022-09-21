<script type="ts">
    import Paragraph from '../Page/Paragraph.svelte';
    import Section from '../Page/Section.svelte';
    import { RenderableContentType } from '../../config/RenderableContentType';
    import type { RenderableContent } from '../../types/RenderableContent';
    import { getParamAsString, getParamAsRenderableContentArray } from './paramHelper';
    import ToggeableSection from '../Page/ToggeableSection.svelte';

    export let contents: RenderableContent;
    const param = (paramName: string): string => getParamAsString(paramName, contents.params);
    const paramRc = (paramName: string): RenderableContent[] =>
        getParamAsRenderableContentArray(paramName, contents.params);
</script>

{#if contents !== undefined && Object.keys(contents.params).length > 0}
    {#if contents.type === RenderableContentType.Section}
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
    {:else if contents.type === RenderableContentType.Link}
        <a href={param('href')}>{param('value')}</a>
    {:else if contents.type === RenderableContentType.Image}
        <img src={`/image/` + param('id')} alt={param('alt')} />
    {/if}
{/if}

<style lang="scss">
    img {
        max-width: 100%;
    }
</style>
