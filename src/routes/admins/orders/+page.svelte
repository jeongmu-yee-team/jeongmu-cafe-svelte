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
    // 초기 마운트 시 URL에 따라 선택된 네비게이션 항목 설정
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
    // 네비게이션 항목이 변경될 때 URL 업데이트
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
  </nav>

  <div class="w-4/5 p-8">
    <div class="mb-8 bg-gray-800 p-4 text-white">
      <h1 class="text-3xl font-semibold">관리자 페이지</h1>
    </div>

    <!-- 메인 콘텐츠 영역 -->
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
</main>
