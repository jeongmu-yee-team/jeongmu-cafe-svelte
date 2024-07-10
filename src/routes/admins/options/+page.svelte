<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';

  import { goto } from '$app/navigation';

  interface Product {
    id?: number;
    name: string;
    price: number;
    category?: number;
    image?: File;
    date: Date;
  }

  interface Kiosk {
    id: number;
    name: string;
    status: string;
    products: Product[];
    totalSales?: number;
  }

  interface Settings {
    language: string;
    theme: string;
  }

  let kioskList: Kiosk[] = [{ id: 1, name: 'Jeongmu Cafe', status: 'Active', products: [] }];

  let settings: Settings = {
    language: '한국어',
    theme: '기본 테마',
  };

  let selectedLanguage = writable(settings.language);
  let selectedTheme = writable(settings.theme);

  let selectedNavItem = 'options';

  const availableLanguages = ['한국어', 'English', 'Español'];
  const availableThemes = ['기본 테마', '어두운 테마'];

  function changeLanguage(newLanguage: string) {
    settings.language = newLanguage;
    selectedLanguage.set(newLanguage);
  }

  function changeTheme(newTheme: string) {
    settings.theme = newTheme;
    selectedTheme.set(newTheme);
  }

  function saveChanges() {
    // 여기에 "저장" 버튼을 클릭했을 때 수행할 작업
    //console.log('Changes saved');
  }

  function cancelChanges() {
    // 여기에 "취소" 버튼을 클릭했을 때 수행할 작업
    //console.log('Changes canceled');
  }
  let status = writable('Active');
  let isStatusActive = $status === 'Active';

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
      selectedNavItem = 'product';
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
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('dashboard')}> 대시보드 </button>
      </li>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('options')}> 키오스크 설정 </button>
      </li>
      <li class="mb-4">
        <button class="block rounded px-2 py-1 hover:bg-gray-600" on:click={() => selectNavItem('products')}> 상품 관리 </button>
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

    <div class="w-4/5 p-8">
      {#if selectedNavItem === 'options'}
        {#each kioskList as { id, name, status, products }, i (id)}
          <section class="mb-8" transition:fade>
            <h2 class="mb-4 text-2xl font-semibold">{name} 키오스크 설정</h2>
            <div class="mb-4">
              <label class="text-lg" for={`language-${id}`}>언어:</label>
              <select id={`language-${id}`} class="ml-2 text-lg" bind:value={selectedLanguage}>
                {#each availableLanguages as lang}
                  <option value={lang}>{lang}</option>
                {/each}
              </select>
            </div>
            <div class="mb-4">
              <label class="text-lg" for={`theme-${id}`}>테마:</label>
              <select id={`theme-${id}`} class="ml-2 text-lg" bind:value={selectedTheme}>
                {#each availableThemes as theme}
                  <option value={theme}>{theme}</option>
                {/each}
              </select>
            </div>
            <div class="mb-4">
              <label for="myCheckbox">판매 여부:</label>
              <input id="myCheckbox" class="ml-2" type="checkbox" bind:checked={isStatusActive} />
            </div>
            <div class="mt-4 flex justify-end">
              <button class="mr-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600" on:click={saveChanges}>
                저장
              </button>
              <button class="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600" on:click={cancelChanges}>
                취소
              </button>
            </div>
          </section>
        {/each}
      {/if}
    </div>
  </div>
</main>
