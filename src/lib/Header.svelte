<script>
    import NavBar from '../lib/NavBar.svelte';
    export let title;
    export let routes;

    const options = [];
    for (const key of Object.keys(routes)) {
        options.push({ title: key, path: routes[key] });
    }
</script>

<header>
    <section class="container">
        <img src="pepe.png" alt="Pepe the frog" />
        <section class="title-nav">
            <h1>{title}</h1>
            <NavBar {options} />
        </section>
    </section>
</header>

<style>
    header {
        width: 100%;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        gap: 1.5rem;
        margin-left: 1rem;
    }

    .title-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        gap: 1.5rem;
        margin-top: 1.2rem;
    }

    h1 {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: 0.2rem;
        color: #49ebb1;
    }

    img {
        width: 8rem;
        background-color: #785d4a;
        border-radius: 4rem;
    }
</style>
