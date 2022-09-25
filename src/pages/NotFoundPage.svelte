<script lang="ts">
    import { onMount, tick } from 'svelte';
    import Wrapper from '../lib/Wrapper.svelte';
    import Title from '../lib/Title.svelte';
    import Section from '../lib/Section.svelte';
    import Paragraph from '../lib/Paragraph.svelte';
    import getNewPageTitle from '../util/getNewPageTitle';
    import Button from '../lib/Button.svelte';

    export let retry: (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void | undefined = undefined;

    onMount(async () => {
        await tick();
        document.title = getNewPageTitle('Not Found');
    });
</script>

<Wrapper>
    <Title>Not found</Title>
    <Paragraph>Oops! This url does not exists 👽</Paragraph>
    <Paragraph>This is probably an error or this page was deleted for some reason.</Paragraph>
    {#if retry !== undefined}
        <Section>
            <Paragraph>You can try again by clicking this button but no promises.</Paragraph>
            <Button label="Retry" onClick={retry} />
        </Section>
    {/if}
</Wrapper>
