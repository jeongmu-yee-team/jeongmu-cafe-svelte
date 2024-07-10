<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  import { goto } from '$app/navigation';

  let loggedIn = false;
  let username = '';
  let password = '';

  function handleLogin() {
    if (username === 'asd123' && password === 'asd123') {
      loggedIn = true;
      goto('/admins');
    } else {
      alert('로그인 실패');
    }
  }

  onMount(() => {
    checkLoginStatus();
  });

  afterUpdate(() => {
    checkLoginStatus();
  });

  function checkLoginStatus() {
    if (!loggedIn) {
      const path = window.location.pathname;
      if (path.includes('/admins') && path !== '/') {
        goto('/');
      }
    }
  }
</script>

<div>
  <header class="bg-gray-800 p-4 text-white">
    <h1 class="text-2xl font-semibold">정무 카페</h1>
  </header>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    {#if !loggedIn}
      <div class="w-96 rounded bg-white p-8 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold">관리자 로그인</h2>
        <form>
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-600" for="username">ID</label>
            <input id="username" class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none" type="text" bind:value={username} />
          </div>
          <div class="mb-4">
            <label class="mb-2 block text-sm font-medium text-gray-600" for="password">Password</label>
            <input
              id="password"
              class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="password"
              bind:value={password} />
          </div>
          <button class="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600" type="button" on:click={handleLogin}>로그인</button>
        </form>
      </div>
    {/if}
  </div>
</div>
