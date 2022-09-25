<script>
    import { onMount } from 'svelte';
    import Title from '../lib/Title.svelte';
    import Paragraph from '../lib/Paragraph.svelte';
    import Wrapper from '../lib/Wrapper.svelte';
    import getNewPageTitle from '../util/getNewPageTitle';

    onMount(() => {
        document.title = getNewPageTitle('Tools');
    });
</script>

<Wrapper>
    <Title>Tools</Title>
    <Paragraph>Here you can find all my crazy projects.</Paragraph>
</Wrapper>
