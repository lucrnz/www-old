<script>
    import Wrapper from '../lib/Wrapper.svelte';
    import Title from '../lib/Title.svelte';
    import Paragraph from '../lib/Paragraph.svelte';

    import { onMount } from 'svelte';
    import getNewPageTitle from '../util/getNewPageTitle';

    onMount(() => {
        document.title = getNewPageTitle('Home');
    });
</script>

<Wrapper>
    <Title>Home Page</Title>
    <Paragraph>Hi! This is my personal website</Paragraph>
    <Paragraph>Here is where I store all my blog posts and little projects</Paragraph>
</Wrapper>
