<script>
    import NavBar from '../lib/NavBar.svelte';
    import navBarOptions from '../constant/navBarOptions.js';
    export let title;
</script>

<header>
    <h1>{title}</h1>
    <NavBar options={navBarOptions} />
</header>

<style>
    header {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        margin-left: 1rem;
        /* text-shadow: 0.15rem 0.15rem 0.4rem darkgray; */
    }
</style>
