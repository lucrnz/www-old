<script>
    export let copyrightYear;
    export let authorName;
</script>

<footer>
    <p>Copyright (c) {copyrightYear} {authorName}</p>
    <p>
        Made using <a href="https://svelte.dev/" target="_blank">Svelte</a> and
        <a href="https://vitejs.dev/" target="_blank">Vite</a>. Hosted by the awesome containers at
        <a href="https://discord-linux.com/">dlinux</a>
    </p>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        opacity: 0.8;
        font-weight: 300;
        /* font-style: italic; */
    }
</style>
