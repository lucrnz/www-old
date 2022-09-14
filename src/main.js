import './main.css';
import MainPage from './MainPage.svelte';

const app = new MainPage({
    target: document.getElementById('app'),
});

export default app;
