<script lang="ts">
  import { onMount } from 'svelte';

  import type { ICartItem } from '$src/routes/home/+page';

  export let selectedCartItem: ICartItem[];
  export let onRemoveItem: (productName: string) => void;

  let padding = 'p-16'; // 기본값

  onMount(() => {
    function updatePadding() {
      const width = window.innerWidth;

      if (width < 640) {
        padding = 'p-4';
      } else if (width >= 640 && width < 768) {
        padding = 'p-8';
      } else {
        padding = 'p-16';
      }
    }

    window.addEventListener('resize', updatePadding);
    updatePadding(); // 초기 설정

    return () => {
      window.removeEventListener('resize', updatePadding);
    };
  });
</script>

<div class="h-[20vh] max-h-96 overflow-y-auto px-4">
  {#if selectedCartItem.length > 0}
    <ul>
      {#each selectedCartItem as { product_name, product_price, product_thumbnail_url, quantity }, index (index)}
        <li class="flex items-center justify-between p-2">
          <div class="mr-4">
            <img class="h-20 w-20 object-cover" alt={product_name} src={product_thumbnail_url} />
          </div>
          <div class="flex w-1/3 flex-col items-center justify-center text-center">
            <p>{product_name}</p>
          </div>
          <div class="flex w-1/3 flex-col items-center justify-center text-center">
            <p>{product_price}원</p>
          </div>
          <div class="flex w-1/3 flex-col items-center justify-center text-center">
            <p>수량: {quantity}</p>
          </div>
          <button class="rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-red-700" on:click={() => onRemoveItem(product_name)}> x </button>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="flex flex-col items-center justify-center {padding}">
      <svg class="h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-5 4a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 11-4 0 2 2 0 014 0zm6-16V5m0 0V1m0 4h2m-2 0H9m2 0c0 1.105-.895 2-2 2H5a2 2 0 01-2-2V1h6z"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2" />
      </svg>
      <p class="mt-2 text-lg font-semibold text-gray-700">장바구니가 비어 있습니다.</p>
    </div>
  {/if}
</div>
