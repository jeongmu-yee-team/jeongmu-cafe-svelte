<script lang="ts">
  import type { TProducts } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';
  import { selectedProductTypeId } from '$lib/store';
  import { derived, get } from 'svelte/store';
  import Card from '$components/cards/Card.svelte';

  interface ProductItem {
    status: number;
    message: string;
    products: TProducts;
  }

  export let currentPage = 1; // 현재 페이지 번호
  export const itemsPerPage = 8; // 페이지 당 상품 카드 수

  const { data: productsData, isLoading, error } = useSWR<ProductItem>(`/api/products`);

  selectedProductTypeId.subscribe((value: number) => {
    currentPage = 1;
  }); // 네비게이션 버튼을 누르면 페이지를 초기화 하는 함수

  function updatePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(get(filteredData).length / itemsPerPage)) {
      currentPage = pageNumber;
    }
  } // 페이지 이동 함수

  export const filteredData = derived(
    [productsData, selectedProductTypeId],
    ([$productsData, $selectedProductTypeId]) =>
      $productsData ? $productsData.products[0].filter((item) => item.product_type_id === $selectedProductTypeId) : [],
  ); // db에서 product_type_id를 필터링 하여 정렬하는 함수
</script>

<div class="card-display relative border-b-4 bg-white">
  <div class="mx-auto max-w-3xl px-8 py-6">
    {#if $filteredData}
      <div class=" card-container grid h-full grid-cols-4 grid-rows-2 gap-x-6 gap-y-10 xl:gap-x-8">
        {#each $filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item}
          <Card {item} />
        {/each}
      </div>
      <div class="mt-4 text-center">
        <p>Page {currentPage} of {Math.ceil($filteredData.length / itemsPerPage)}</p>
      </div>
    {/if}
  </div>
  <button
    on:click={() => updatePage(currentPage - 1)}
    type="button"
    class="absolute left-0 top-1/2 ml-1 inline-flex -translate-y-1/2 scale-x-[-1] transform items-center
    rounded-full bg-blue-500 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800
    focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
    dark:focus:ring-blue-800"
  >
    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
  <button
    on:click={() => updatePage(currentPage + 1)}
    type="button"
    class="absolute right-0 top-1/2 mr-1 inline-flex -translate-y-1/2 transform items-center rounded-full bg-blue-500
    p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
     focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
</div>
