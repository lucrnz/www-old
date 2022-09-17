<script>
    import Section from '../lib/Page/Section.svelte';
    import Paragraph from '../lib/Page/Paragraph.svelte';
    import Title from '../lib/Page/Title.svelte';
    import Wrapper from '../lib/Page/Wrapper.svelte';
    import ToggeableSection from '../lib/Page/ToggeableSection.svelte';
</script>

<Wrapper>
    <Section>
        <Title>About Me</Title>
        <Paragraph>My Name is Lucien, I am 27 years old. I go by they/them pronouns.</Paragraph>
        <Paragraph>I am a developer from Argentina.</Paragraph>
    </Section>

    <Section>
        <Title>Hobbies: Programming</Title>
        <Paragraph
            >I learned programming by myself, I find it enjoyable to create programs or scripts that
            solves problems.</Paragraph
        >
        <Paragraph
            >I work as a fullstack software developer at a known international company, but I enjoy
            a lot more front-end.</Paragraph
        >
        <Paragraph
            >My tech skills include but are not limited to: JavaScript, C#, Go and a little bit of
            C.</Paragraph
        >
        <Paragraph>Even tho I dont wanna touch C ever again.</Paragraph>
        <Paragraph
            >Originally I created this website to practice my front-end development skills.</Paragraph
        >
    </Section>

    <Section>
        <Title>Hobbies: General</Title>
        <Paragraph
            >Apart from programming I enjoy gaming (both PC and VR), going out for a walk, working
            out,</Paragraph
        >
        <Paragraph
            >watching cartoons or tv shows, and generally enjoying my time with my partner.</Paragraph
        >
    </Section>

    <ToggeableSection title="Life Views">
        <Paragraph
            >I have my own definition of nihilism, I try to re-think how I interact with everything
            and find my own conclusions about them.</Paragraph
        >
        <Paragraph
            >While I try to remain positive as I found out that being too realistic or negative is
            depressive.</Paragraph
        >
        <Paragraph
            >I identify as gender non-binary, as I dont associate with either cultural masculiny or</Paragraph
        >
        <Paragraph
            >femininity, I enjoy creating my own meaning of gender expression. I fully support
            LGBTQIA+.</Paragraph
        >
        <Paragraph
            >I believe everyone should be treated the same regardless of gender, and that people
            should show their own interests instead of what society tells them to do.</Paragraph
        >
        <Paragraph
            >I believe killing animals for own pleasure or enjoyment is bad and should not be done.
            I only feed myself with plant based food.</Paragraph
        >
        <Paragraph
            >I don't believe in modern feminism as It seems to be hembrism or female-side sexism.</Paragraph
        >
    </ToggeableSection>
</Wrapper>
