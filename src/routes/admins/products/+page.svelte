<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

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

  let newProductName = '';
  let newProductPrice: number | undefined;
  let newProductCategory: number | undefined;
  let selectedImage: File | undefined;

  let selectedNavItem = 'productList'; // 초기 선택 항목을 설정

  function removeProduct(kioskIndex: number, productIndex: number) {
    kioskList[kioskIndex].products.splice(productIndex, 1);
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
      date: new Date(),
    };

    kioskList[kioskIndex].products.push(newProduct);

    newProductName = '';
    newProductPrice = undefined;
    newProductCategory = undefined;
    selectedImage = undefined;
  }

  onMount(() => {});

  let searchText = '';

  let myAddedProducts: Product[] = kioskList[0].products;
  let filteredMyAddedProducts: Product[] = myAddedProducts;

  $: filteredMyAddedProducts = myAddedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  function editProduct(product: Partial<Product>) {
    // 여기에 제품 수정에 대한 로직
    // console.log('Editing product:', product);
  }

  let products: Product[] = kioskList[0].products;

  function saveChanges() {
    // 여기에 "저장" 버튼을 클릭했을 때 수행할 작업
    // console.log('Changes saved');
  }

  function cancelChanges() {
    // 여기에 "취소" 버튼을 클릭했을 때 수행할 작업
    // console.log('Changes canceled');
  }

  function calculateTotalSales(data: Kiosk | Product[]): number {
    return (data as Product[]).reduce((total, product) => total + product.price * (product.category || 0), 0);
  }

  kioskList.forEach((kiosk) => {
    kiosk.totalSales = calculateTotalSales(kiosk.products);
  });

  function handleSearch() {
    // 여기에 검색 기능 로직을 추가
    // 예: searchText를 사용하여 필터링된 제품 목록을 업데이트
    filteredMyAddedProducts = myAddedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  let isAddProductView = false;

  function toggleAddProductView() {
    isAddProductView = !isAddProductView;
  }

  function selectNavItem(item: string) {
    selectedNavItem = item;
    goto(`/admins/${item}`);
  }

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
      {#if selectedNavItem === 'products'}
        <!-- 상품 추가 콘텐츠 -->
        <h2 class="mb-4 text-2xl font-semibold">상품 추가</h2>
        <form class="flex items-center" on:submit|preventDefault={() => addProduct(0)}>
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
            on:click={() => addProduct(0)}
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
        <!-- 상품 목록 콘텐츠 -->
        <h2 class="mb-4 text-2xl font-semibold">{kioskList[0].name} 상품 목록</h2>
        <input
          type="text"
          bind:value={searchText}
          placeholder="검색어 입력"
          class="mb-4 border p-2"
          on:input={handleSearch}
        />
        {#each filteredMyAddedProducts as product (product.id)}
          <div class="mb-4 border p-6">
            <p class="text-lg font-semibold">{product.name}</p>
            <p class="text-gray-500">가격: {product.price}원</p>
            <p class="text-gray-500">카테고리: {product.category}</p>
            <button
              class="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
              on:click={() => editProduct(product)}
            >
              수정
            </button>
            <button
              class="rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
              on:click={() => removeProduct(0, 0)}
            >
              삭제
            </button>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</main>
