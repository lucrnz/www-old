<script lang="ts">
    import logoCreativeCommonsCcUrl from '../assets/creative-commons-cc.svg';
    import logoCreativeCommonsByUrl from '../assets/creative-commons-by.svg';
    import logoCreativeCommonsSaUrl from '../assets/creative-commons-sa.svg';
    import mapToCssVariables from '../util/mapToCssVariables';

    const ccUrl = (logoUrl: string): string => mapToCssVariables({ url: `url(${logoUrl})` });

    import { authorFullName, copyrightYearFrom } from '../config/copyright';
    const currentYear: number = new Date().getUTCFullYear();
    const copyrightYear: string =
        copyrightYearFrom === currentYear
            ? copyrightYearFrom.toString()
            : `${copyrightYearFrom.toString()} - ${currentYear.toString()}`;
</script>

<footer>
    <p class="copyright">
        <a
            href="https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt"
            target="_blank"
            aria-label="Licensed under Creative Commons CC BY SA 4.0. Read more here."
        >
            <div class="cc" aria-hidden="true" style={ccUrl(logoCreativeCommonsCcUrl)} />
            <div class="cc" aria-hidden="true" style={ccUrl(logoCreativeCommonsByUrl)} />
            <div class="cc" aria-hidden="true" style={ccUrl(logoCreativeCommonsSaUrl)} />
        </a><span>{copyrightYear} {authorFullName}</span>
    </p>
    <p>
        All code shown here is published under the <a href="https://unlicense.org/" target="_blank"
            >UNLICENSE</a
        > unless specified otherwise.
    </p>
    <p>
        Made using <a href="https://svelte.dev/" target="_blank">Svelte</a> and
        <a href="https://vitejs.dev/" target="_blank">Vite</a>.
    </p>
    <p>
        Hosted by love at
        <a href="https://discord-linux.com/">dlinux</a>
    </p>
</footer>

<style lang="scss">
    @use '../variables.scss' as v;

    .copyright > a {
        &,
        &:hover,
        &:active {
            text-decoration: none;
        }
    }

    .cc {
        display: inline-block;
        padding: 0.1rem 0 0 0;
        height: 0.9rem;
        width: 0.9rem;
        background-size: 0.9rem;
        background-repeat: no-repeat;
        background-position-y: bottom;
        background-image: var(--url);
    }

    footer {
        @include v.text-config;
        margin: 2rem 0 0 0;
        font-weight: 300;
        color: scale-color(mix(v.$black, v.$white, 50%), $lightness: +20%);
    }
</style>
