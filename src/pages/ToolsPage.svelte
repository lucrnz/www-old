<script>
    import { onMount } from 'svelte';
    import Title from '../lib/Page/Title.svelte';
    import Paragraph from '../lib/Page/Paragraph.svelte';
    import Wrapper from '../lib/Page/Wrapper.svelte';
    import getNewPageTitle from '../util/getNewPageTitle';

    onMount(() => {
        document.title = getNewPageTitle('Tools');
    });
</script>

<Wrapper>
    <Title>Tools</Title>
    <Paragraph>Here you can find all my crazy projects.</Paragraph>
</Wrapper>
