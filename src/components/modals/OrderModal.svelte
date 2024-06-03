<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let product: {
    id: number;
    product_thumbnail_url: string;
    product_name: string;
    product_price: number;
  };

  export let modalStatus: boolean;
  export let toggleModal: () => void;

  const dispatch = createEventDispatcher();

  function handleConfirm() {
    dispatch('confirm', product);
    toggleModal();
  }
</script>

{#if modalStatus}
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="rounded bg-white p-4 shadow-lg">
      <h2 class="mb-4 text-2xl font-bold">제품 정보</h2>
      <img src={product.product_thumbnail_url} alt="상품 사진" class="mb-4 h-48 w-full object-cover" />
      <p class="text-lg font-bold">{product.product_name}</p>
      <p class="text-orange-600">{product.product_price}원</p>
      <div class="mt-4 flex justify-end space-x-2">
        <button on:click={toggleModal} class="rounded bg-gray-300 px-4 py-2">취소</button>
        <button on:click={handleConfirm} class="rounded bg-blue-500 px-4 py-2 text-white">확인</button>
      </div>
    </div>
  </div>
{/if}
