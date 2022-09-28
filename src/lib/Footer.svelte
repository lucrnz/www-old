<script lang="ts">
    //import logoCreativeCommonsCcUrl from '../assets/creative-commons-cc.svg';
    //import logoCreativeCommonsByUrl from '../assets/creative-commons-by.svg';
    //import logoCreativeCommonsSaUrl from '../assets/creative-commons-sa.svg';
    //import mapToCssVariables from '$util/mapToCssVariables';

    //const ccUrl = (logoUrl: string): string => mapToCssVariables({ url: `url(${logoUrl})` });

    //import { authorFullName, copyrightYearFrom } from '$config/copyright';
    //const currentYear: number = new Date().getUTCFullYear();
    /* const copyrightYear: string =
        copyrightYearFrom === currentYear
            ? copyrightYearFrom.toString()
        : `${copyrightYearFrom.toString()} - ${currentYear.toString()}`;*/
</script>

<footer>
    <p>
        All code shown here is published under the <a href="https://unlicense.org/" target="_blank"
            >UNLICENSE</a
        > unless specified otherwise.
    </p>
    <p>
        All other content is licensed under the <a
            href="https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt"
            target="_blank"
            aria-label="Licensed under Creative Commons CC-0. Read more here."
        >
            CC-0 Public domain declaration.
        </a>
    </p>
    <p>
        Hosted by love @
        <a href="https://discord-linux.com/">dlinux</a>
    </p>
</footer>

<style lang="scss">
    @use '../variables.scss' as v;

    footer {
        @include v.text-config;
        @include v.footer-font-size;
        font-weight: 300;
        margin: 2rem 0 0 0;
        color: scale-color(v.$white, $alpha: -30%);
    }

    a {
        color: scale-color(v.$primary, $alpha: -30%);

        &:hover {
            color: scale-color(v.$primary, $alpha: -20%);
        }

        &:active {
            color: scale-color(v.$primary, $alpha: -50%);
        }
    }
    /*    .cc {
        display: inline-block;
        padding: 0.1rem 0 0 0;
        height: 0.9rem;
        width: 0.9rem;
        background-size: 0.9rem;
        background-repeat: no-repeat;
        background-position-y: bottom;
        background-image: var(--url);
    }*/
</style>
