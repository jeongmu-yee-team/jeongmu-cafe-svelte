<script lang="ts">
  import SideBar from '$components/layouts/SideBar.svelte';
</script>

<svelte:head>
  <title>정무카페 관리</title>
</svelte:head>

<div class="font-admin">
  <header class="fixed w-full bg-gray-800 p-6 text-white">
    <h1 class="text-2xl font-semibold">정무 카페 관리</h1>
  </header>
  <main class="flex min-h-screen pt-20">
    <SideBar />
    <section class="w-full bg-gray-100 p-5">
      <slot>Admin Contents</slot>
    </section>
  </main>
</div>
