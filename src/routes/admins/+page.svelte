<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  import { goto } from '$app/navigation';

  let selectedNavItem = '/';

  function selectNavItem(item: string) {
    selectedNavItem = item;
    goto(`/admins/${item}`);
  }
  onMount(() => {});

  onMount(() => {
    const path = window.location.pathname;
    if (path.includes('/admins/dashboard')) {
      selectedNavItem = 'dashboard';
    } else if (path.includes('/admins/options')) {
      selectedNavItem = 'options';
    } else if (path.includes('/admins/products')) {
      selectedNavItem = 'products';
    } else if (path.includes('/admins/orders')) {
      selectedNavItem = 'orders';
    } else if (path.includes('/admins/category')) {
      selectedNavItem = 'category';
    }
  });

  afterUpdate(() => {
    switch (selectedNavItem) {
      case 'dashboard':
        goto('/admins/dashboard');
        break;
      case 'options':
        goto('/admins/options');
        break;
      case 'products':
        goto('/admins/products');
        break;
      case 'orders':
        goto('/admins/orders');
        break;
      case 'category':
        goto('/admins/category');
        break;
    }
  });

  function logout() {
    const confirmLogout = confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      goto('/login');
    }
  }
</script>

<main class="flex min-h-screen bg-gray-200">
  <nav class="w-1/5 bg-gray-800 p-8 text-white">
    <ul>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => console.log('object')}> 대시보드 </button>
      </li>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('options')}> 키오스크 설정 </button>
      </li>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('product')}> 상품 관리 </button>
      </li>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('orders')}> 주문 목록 </button>
      </li>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('category')}> 카테고리 추가 </button>
      </li>
    </ul>
    <button class="mt-4 rounded bg-red-500 p-2 text-white hover:text-gray-300" on:click={logout}> 로그아웃 </button>
  </nav>
  <div class="w-4/5 p-8">
    <div class="mb-8 bg-gray-800 p-4 text-white">
      <h1 class="text-3xl font-semibold">관리자 페이지</h1>
    </div>
  </div>
</main>
