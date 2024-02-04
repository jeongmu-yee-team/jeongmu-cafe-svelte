<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import { Chart } from 'chart.js/auto';

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

  interface Category {
    name: string;
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
      products: [{ name: 'Product 1', price: 100, category: 1, date: new Date() }],
    },
  ];

  let newProductName = '';
  let newProductPrice: number | undefined;
  let newProductCategory: number | undefined;
  let selectedImage: File | undefined;
  let salesChart: Chart<'bar', number[], unknown> | undefined;
  let monthlySalesData: { kioskName: string; monthlySales: number }[] = [];
  let salesChartCanvas: HTMLCanvasElement | undefined;

  let settings: Settings = {
    language: '한국어',
    theme: '기본 테마',
  };

  let selectedLanguage = writable(settings.language);
  let selectedTheme = writable(settings.theme);

  let selectedNavItem = 'dashboard'; // 초기 선택 항목을 설정

  function selectNavItem(item: string) {
    selectedNavItem = item;
  }

  const availableLanguages = ['한국어', 'English', 'Español'];
  const availableThemes = ['기본 테마', '어두운 테마'];

  function removeProduct(kioskIndex: number, productIndex: number) {
    kioskList[kioskIndex].products.splice(productIndex, 1);
  }
  function changeLanguage(newLanguage: string) {
    settings.language = newLanguage;
    selectedLanguage.set(newLanguage);
  }

  function changeTheme(newTheme: string) {
    settings.theme = newTheme;
    selectedTheme.set(newTheme);
  }

  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedImage = input.files[0];
    }
  }

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

  let searchText = '';

  let filteredProducts: Product[] = [];

  let myAddedProducts: Product[] = kioskList[0].products;
  let filteredMyAddedProducts: Product[] = myAddedProducts;

  let order: Product[] = kioskList[0].products;
  let filteredOrders: Product[] = order;

  $: filteredMyAddedProducts = myAddedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  function editProduct(product: Partial<Product>) {
    // 여기에 제품 수정에 대한 로직
    //console.log('Editing product:', product);
  }
  let products: Product[] = kioskList[0].products; // 추가

  function saveChanges() {
    // 여기에 "저장" 버튼을 클릭했을 때 수행할 작업
    //console.log('Changes saved');
  }

  function cancelChanges() {
    // 여기에 "취소" 버튼을 클릭했을 때 수행할 작업
    //console.log('Changes canceled');
  }

  function calculateTotalSales(kiosk: Kiosk): number {
    return kiosk.products.reduce((total, product) => total + product.price * (product.category || 0), 0);
  }
  kioskList.forEach((kiosk) => {
    kiosk.totalSales = calculateTotalSales(kiosk);
  });
  let status = writable('Active');
  let isStatusActive = $status === 'Active';

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

  function calculateTotalSalesByPeriod(period: string): number {
    const currentDate = new Date();

    return kioskList.reduce((totalSales, kiosk) => {
      const kioskSales = calculateSalesByPeriod(kiosk.products, period, currentDate);
      return totalSales + kioskSales;
    }, 0);
  }
  let currentDate = new Date();

  $: filteredMyAddedProducts = myAddedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  function handleSearch() {
    // 여기에 추가적인 검색 기능 로직을 추가할 수 있습니다.
  }

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

  let newCategoryName = '';
  let categories: Category[] = [];

  function addCategory() {
    if (newCategoryName.trim() !== '') {
      categories.push({ name: newCategoryName });
      newCategoryName = ''; // 추가 후 입력 필드 초기화
    }
  }
</script>

<main class="flex min-h-screen bg-gray-200">
  <!-- 네비게이션 사이드바 -->
  <nav class="w-1/5 bg-gray-800 p-8 text-white">
    <ul>
      <li class="mb-4">
        <button on:click={() => selectNavItem('dashboard')} class="block rounded px-2 py-1 hover:bg-gray-600">
          대시보드
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('kiosk')} class="block rounded px-2 py-1 hover:bg-gray-600">
          키오스크 설정
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('addProduct')} class="block rounded px-2 py-1 hover:bg-gray-600">
          상품 추가
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('productList')} class="block rounded px-2 py-1 hover:bg-gray-600">
          상품 목록
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('orders')} class="block rounded px-2 py-1 hover:bg-gray-600">
          주문 목록
        </button>
      </li>
      <li class="mb-4">
        <button on:click={() => selectNavItem('addCategory')} class="block rounded px-2 py-1 hover:bg-gray-600">
          카테고리 추가
        </button>
      </li>
    </ul>
  </nav>

  <div class="w-4/5 p-8">
    <!-- 헤더 -->
    <div class="mb-8 bg-gray-800 p-4 text-white">
      <h1 class="text-3xl font-semibold">관리자 페이지</h1>
    </div>

    <!-- 메인 콘텐츠 영역 -->
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

      {#if selectedNavItem === 'kiosk'}
        {#each kioskList as { id, name, status, products }, i (id)}
          <section class="mb-8" transition:fade>
            <h2 class="mb-4 text-2xl font-semibold">{name} 키오스크 설정</h2>
            <div class="mb-4">
              <label for={`language-${id}`} class="text-lg">언어:</label>
              <select bind:value={selectedLanguage} id={`language-${id}`} class="ml-2 text-lg">
                {#each availableLanguages as lang}
                  <option value={lang}>{lang}</option>
                {/each}
              </select>
            </div>
            <div class="mb-4">
              <label for={`theme-${id}`} class="text-lg">테마:</label>
              <select bind:value={selectedTheme} id={`theme-${id}`} class="ml-2 text-lg">
                {#each availableThemes as theme}
                  <option value={theme}>{theme}</option>
                {/each}
              </select>
            </div>
            <div class="mb-4">
              <label for="myCheckbox">판매 여부:</label>
              <input type="checkbox" id="myCheckbox" bind:checked={isStatusActive} class="ml-2" />
            </div>
            <div class="mt-4 flex justify-end">
              <button
                class="mr-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                on:click={saveChanges}
              >
                저장
              </button>
              <button
                class="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
                on:click={cancelChanges}
              >
                취소
              </button>
            </div>
          </section>
        {/each}
      {/if}
      {#if selectedNavItem === 'addProduct'}
        <!-- 상품 추가 콘텐츠 -->
        {#each kioskList as { id, name, status, products }, i (id)}
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold">상품 추가</h2>
            <form class="flex items-center" on:submit|preventDefault={() => addProduct(i)}>
              <input type="text" bind:value={newProductName} class="mr-2 border p-4" placeholder="상품 이름" />
              <input type="number" bind:value={newProductPrice} class="mr-2 border p-4" placeholder="가격" />
              <select bind:value={newProductCategory} class="mr-2 border p-4">
                {#each ['커피', '에이드', '스무디', '디저트'] as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
              <input type="file" on:change={handleFileUpload} accept="image/*" class="mr-2 border p-4" />
              <button
                class="transform rounded bg-green-500 px-6 py-3 text-lg text-white transition duration-300 hover:scale-105 hover:shadow-md"
                on:click={addCategory}
              >
                추가
              </button>
            </form>
            <section transition:fade>
              <div class="mt-4 flex justify-end">
                <button
                  class="mr-2 rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                  on:click={saveChanges}
                >
                  저장
                </button>
                <button
                  class="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
                  on:click={cancelChanges}
                >
                  취소
                </button>
              </div>
            </section>
          </section>
        {/each}
      {/if}

      {#if selectedNavItem === 'productList'}
        <!-- 상품 목록 콘텐츠 -->
        <h2 class="mb-4 text-2xl font-semibold">{name} 상품 목록</h2>
        <input
          type="text"
          bind:value={searchText}
          placeholder="검색어 입력"
          class="mb-4 border p-2"
          on:input={handleSearch}
        />
        {#if filteredMyAddedProducts.length > 0}
          {#each filteredMyAddedProducts as { id: productId, name: productName, price: productPrice, category: newProductCategory, image: productImage }, j}
            <!-- 'kioskIndex'를 블록 내에서 정의 -->
            {#if selectedNavItem === 'productList'}
              {#if filteredMyAddedProducts.length > 0}
                <li class="mb-2 flex items-center justify-between border p-6">
                  <div>
                    <p class="text-lg font-semibold">{productName}</p>
                    <p class="text-gray-500">{productPrice}원 - 카테고리: {newProductCategory}</p>
                    {#if productImage}
                      <img src={URL.createObjectURL(productImage)} alt={productName} class="mt-2 h-auto max-w-full" />
                    {/if}
                  </div>
                  <div class="flex items-center space-x-4">
                    <!-- 여기서 'kioskIndex' 정의 -->
                    {#each kioskList as { products }, kioskIndex}
                      {#if products.includes(filteredMyAddedProducts[j])}
                        <button
                          on:click={() => editProduct({ id: productId, name: productName, price: productPrice })}
                          class="rounded bg-blue-500 px-3 py-2 text-lg text-white">수정</button
                        >
                        <button
                          on:click={() => removeProduct(kioskIndex, j)}
                          class="rounded bg-red-500 px-3 py-2 text-lg text-white">삭제</button
                        >
                      {/if}
                    {/each}
                  </div>
                </li>
              {/if}
            {/if}
          {/each}
        {/if}
      {/if}

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
              <p class="mt-2">총 주문 금액: {calculateTotalSales(orders[0])}원</p>
            </div>
          {/each}
        </section>
      {/if}
      {#if selectedNavItem === 'addCategory'}
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
