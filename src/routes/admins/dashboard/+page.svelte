<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Chart } from 'chart.js/auto';
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

  let salesChart: Chart<'bar', number[], unknown> | undefined;
  let monthlySalesData: { kioskName: string; monthlySales: number }[] = [];
  let salesChartCanvas: HTMLCanvasElement | undefined;

  let selectedNavItem = 'dashboard'; // 초기 선택 항목을 설정

  onMount(() => {});

  let products: Product[] = kioskList[0].products; // 추가

  function calculateTotalSales(kiosk: Kiosk): number {
    return kiosk.products.reduce((total, product) => total + product.price * (product.category || 0), 0);
  }
  kioskList.forEach((kiosk) => {
    kiosk.totalSales = calculateTotalSales(kiosk);
  });

  function calculateSalesByPeriod(products: Product[], period: string, currentDate: Date): number {
    return products.reduce((totalSales, product) => {
      const productDate = new Date(product.date);

      if (
        (period === 'day' &&
          productDate.getDate() === currentDate.getDate() &&
          productDate.getMonth() === currentDate.getMonth() &&
          productDate.getFullYear() === currentDate.getFullYear()) ||
        (period === 'month' &&
          productDate.getMonth() === currentDate.getMonth() &&
          productDate.getFullYear() === currentDate.getFullYear()) ||
        (period === 'year' && productDate.getFullYear() === currentDate.getFullYear())
      ) {
        totalSales += product.price * (product.category || 1);
      }

      return totalSales;
    }, 0);
  }

  let currentDate = new Date();

  onMount(() => {
    if (salesChartCanvas) {
      const ctx = salesChartCanvas.getContext('2d');

      if (ctx) {
        // 기존 차트가 있으면 파괴
        if (salesChart) {
          salesChart.destroy();
        }

        // 그래프 데이터 준비
        monthlySalesData = kioskList.map((kiosk) => {
          return {
            kioskName: kiosk.name,
            monthlySales: calculateSalesByPeriod(kiosk.products, 'month', currentDate),
          };
        });

        // 새로운 차트 생성
        salesChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: monthlySalesData.map((data) => data.kioskName),
            datasets: [
              {
                label: '월별 매출',
                data: monthlySalesData.map((data) => data.monthlySales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
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

    <div class="w-4/5 p-8">
      {#if selectedNavItem === 'dashboard'}
        <!-- 대시보드 콘텐츠 -->
        <h2 class="mb-4 text-2xl font-semibold">키오스크 판매 금액</h2>
        <ul>
          {#each kioskList as { id, name, totalSales }, _ (id)}
            <div class="mt-4">
              <p>일 매출: {calculateSalesByPeriod(products, 'day', currentDate)}원</p>
              <p>월 매출: {calculateSalesByPeriod(products, 'month', currentDate)}원</p>
              <p>연 매출: {calculateSalesByPeriod(products, 'year', currentDate)}원</p>

              <!-- 월별 매출 그래프 -->
              <canvas bind:this={salesChartCanvas} width="400" height="200"></canvas>
            </div>
          {/each}
        </ul>
        <section>
          <h2 class="mb-4 text-2xl font-semibold">키오스크 상태</h2>
          {#each kioskList as { id, name, status, products }, i (id)}
            <section class="mb-8" transition:fade>
              <h3 class="mb-4 text-xl font-semibold">{name}</h3>
              <p>상태: {status}</p>
            </section>
          {/each}
        </section>
      {/if}
    </div>
  </div>
</main>
