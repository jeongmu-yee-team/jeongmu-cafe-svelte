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

  let kioskList: Kiosk[] = [{ id: 1, name: 'Jeongmu Cafe', status: 'Active', products: [] }];

  interface Order {
    id: number;
    date: Date;
    products: Product[];
  }

  let orders: Order[] = [
    {
      id: 1,
      date: new Date(),
      products: [{ name: '아메리카노', price: 2000, category: 1, date: new Date() }],
    },
  ];

  let selectedNavItem = 'orders'; // 초기 선택 항목을 설정
  let products: Product[] = kioskList[0].products; // 추가

  onMount(() => {});

  function calculateTotalSales(data: Kiosk | Order): number {
    return (data.products || []).reduce((total, product) => total + product.price * (product.category || 0), 0);
  }
  kioskList.forEach((kiosk) => {
    kiosk.totalSales = calculateTotalSales(kiosk);
  });

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

<div>order</div>

<!-- <main class="flex min-h-screen bg-gray-200">
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

  <div>
    <div class="w-4/5 p-8">
      <div class="w-4/5 p-8">
        {#if selectedNavItem === 'orders'}
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold">주문 목록</h2>
            {#each orders as order (order.id)}
              <div class="mb-4 border p-6">
                <p class="text-lg font-semibold">주문 번호: {order.id}</p>
                <p class="text-gray-500">주문일: {order.date.toLocaleString()}</p>
                <ul>
                  {#each order.products as product}
                    <li>
                      {product.name} - {product.price}원
                    </li>
                  {/each}
                </ul>
                <p class="mt-2">총 주문 금액: {calculateTotalSales(order)}원</p>
              </div>
            {/each}
          </section>
        {/if}
      </div>
    </div>
  </div>
</main> -->
