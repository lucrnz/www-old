<script>
    import NavBar from './lib/NavBar.svelte';
</script>

<main>
    <h1>Luc's Website!</h1>
    <NavBar
        options={[
            {
                title: 'Main page',
            },
            {
                title: 'Option2',
            },
            { title: 'Option3' },
        ]}
    />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        /* text-shadow: 0.15rem 0.15rem 0.4rem darkgray; */
    }
</style>
