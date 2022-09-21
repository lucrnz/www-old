<script lang="ts">
    import { authorFullName, copyrightYearFrom } from '../config/copyright';
    const currentYear: number = new Date().getUTCFullYear();
    const copyrightYear: string =
        copyrightYearFrom === currentYear
            ? copyrightYearFrom.toString()
            : `${copyrightYearFrom.toString()} - ${currentYear.toString()}`;
</script>

<footer>
    <p>Copyright (c) {copyrightYear} {authorFullName}</p>
    <p>
        Made using <a href="https://svelte.dev/" target="_blank">Svelte</a> and
        <a href="https://vitejs.dev/" target="_blank">Vite</a>.
    </p>
    <p>
        Hosted by love at
        <a href="https://discord-linux.com/">dlinux</a>
    </p>
</footer>

<style>
    footer {
        margin-top: 1rem;
        font-weight: 300;
        opacity: 0.8;
    }
</style>
