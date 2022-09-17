import { fade, fly } from 'svelte/transition';

export const inAnimation = fly;

export const outAnimation = fade;

export const inConfig = { x: -32, duration: 350 };

export const outConfig = { duration: 350 };
