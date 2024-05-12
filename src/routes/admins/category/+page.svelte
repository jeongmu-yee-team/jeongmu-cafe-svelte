<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
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

  interface Category {
    name: string;
  }

  let kioskList: Kiosk[] = [{ id: 1, name: 'Jeongmu Cafe', status: 'Active', products: [] }];

  let newProductName = '';
  let newProductPrice: number | undefined;
  let newProductCategory: number | undefined;
  let selectedImage: File | undefined;

  let selectedNavItem = 'category'; // 초기 선택 항목을 설정

  function addProduct(kioskIndex: number) {
    const newProduct: Product = {
      name: newProductName,
      price: newProductPrice || 0,
      category: newProductCategory || 1,
      image: selectedImage,
      date: new Date(), // 현재 날짜 정보 추가
    };

    kioskList[kioskIndex].products.push(newProduct);

    newProductName = '';
    newProductPrice = undefined;
    newProductCategory = undefined;
    selectedImage = undefined;
  }
  onMount(() => {});

  function calculateTotalSales(kiosk: Kiosk): number {
    return kiosk.products.reduce((total, product) => total + product.price * (product.category || 0), 0);
  }
  kioskList.forEach((kiosk) => {
    kiosk.totalSales = calculateTotalSales(kiosk);
  });

  let newCategoryName = '';
  let categories: Category[] = [];

  function addCategory() {
    if (newCategoryName.trim() !== '') {
      categories.push({ name: newCategoryName });
      newCategoryName = ''; // 추가 후 입력 필드 초기화
    }
  }

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
        <button on:click={() => selectNavItem('dashboard')} class="block rounded px-2 py-1 hover:bg-gray-600">
          대시보드
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('options')} class="block rounded px-2 py-1 hover:bg-gray-600">
          키오스크 설정
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('products')} class="block rounded px-2 py-1 hover:bg-gray-600">
          상품 관리
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('orders')} class="block rounded px-2 py-1 hover:bg-gray-600">
          주문 목록
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('category')} class="block rounded px-2 py-1 hover:bg-gray-600">
          카테고리 추가
        </button>
      </li>
    </ul>
    <button on:click={logout} class="mt-4 rounded bg-red-500 p-2 text-white hover:text-gray-300"> 로그아웃 </button>
  </nav>

  <div class="w-4/5 p-8">
    <div class="mb-8 bg-gray-800 p-4 text-white">
      <h1 class="text-3xl font-semibold">관리자 페이지</h1>
    </div>

    <div class="w-4/5 p-8">
      {#if selectedNavItem === 'category'}
        <section class="mb-8">
          <h2 class="mb-4 text-2xl font-semibold">카테고리 추가</h2>
          <form class="flex items-center">
            <input type="text" bind:value={newCategoryName} class="mr-2 border p-4" placeholder="카테고리 이름" />
            <button
              class="transform rounded bg-green-500 px-6 py-3 text-lg text-white transition duration-300 hover:scale-105 hover:shadow-md"
              on:click={addCategory}
            >
              추가
            </button>
          </form>
        </section>
      {/if}
    </div>
  </div>
</main>
