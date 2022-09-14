<script>
    import PageWrapper from '../lib/PageWrapper.svelte';
    import Section from '../lib/Section.svelte';
</script>

<PageWrapper>
    <Section title="About Me">
        <p>My Name is Lucien, I am 27 years old. I go by they/them pronouns.</p>
        <p>I am a developer from Argentina.</p>
    </Section>

    <Section title="Hobbies: Programming">
        <p>
            I learned programming by myself, I find it enjoyable to create programs or scripts that
            solves problems.
        </p>
        <p>
            I work as a fullstack software developer at a known international company, but I enjoy a
            lot more front-end.
        </p>
        <p>
            My tech skills include but are not limited to: JavaScript, C#, Go and a little bit of C.
        </p>
        <p>Even tho I dont wanna touch C ever again.</p>
    </Section>

    <Section title="Hobbies: General">
        <p>
            Apart from programming I enjoy gaming (both PC and VR), going out for a walk, working
            out, watching cartoons or tv shows, and generally enjoying my time with my partner.
        </p>
    </Section>

    <Section title="Life views">
        <p>
            I have my own definition of nihilism, I try to re-think how I interact with everything
            and find my own conclusions about them.
        </p>
        <p>
            While I try to remain positive as I found out that being too realistic or negative is
            depressive.
        </p>
        <p>
            I identify as gender non-binary, as I dont associate with either cultural masculiny or
            femininity, I enjoy creating my own meaning of gender expression. I fully support
            LGBTQIA+.
        </p>
        <p>
            I believe everyone should be treated the same regardless of gender, and that people
            should show their own interests instead of what society tells them to do.
        </p>
        <p>
            I believe killing animals for own pleasure or enjoyment is bad and should not be done. I
            only feed myself with plant based food.
        </p>
        <p>I don't believe in modern feminism as It seems to be hembrism or female-side sexism.</p>
    </Section>
</PageWrapper>

<style>
    p {
        line-height: 2rem;
    }
</style>
