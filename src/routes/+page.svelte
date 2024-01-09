<script lang="ts">
  import NavBar from '$components/layouts/NavBar.svelte';
  import { twMerge } from 'tailwind-merge';

  const astyle = 'rounded-lg';
  const bstyle = 'bg-orange-400 text-5xl';
</script>

<svelte:head>
  <title>Intro</title>
</svelte:head>

<NavBar />

<div class={twMerge(astyle, bstyle)}>Hello world~!</div>
