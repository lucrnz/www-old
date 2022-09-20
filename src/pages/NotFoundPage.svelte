<script>
    import { onMount, tick } from 'svelte';
    import Wrapper from '../lib/Page/Wrapper.svelte';
    import Title from '../lib/Page/Title.svelte';
    import Paragraph from '../lib/Page/Paragraph.svelte';
    import getNewPageTitle from '../util/getNewPageTitle';

    onMount(async () => {
        await tick();
        document.title = getNewPageTitle('Not Found');
    });
</script>

<Wrapper>
    <Title>Not Found</Title>
    <Paragraph>Oops! This url does not exists.</Paragraph>
    <Paragraph
        >This is probably an error or this article/page was deleted for some reason.</Paragraph
    >
</Wrapper>
