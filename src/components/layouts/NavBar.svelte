<script lang="ts">
  import type { TProductType } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';
  import { selectedProductTypeId } from '$lib/store';
  interface IResponse {
    status: number;
    message: string;
    productType: TProductType;
  }
  const { data: navData, isLoading, error } = useSWR<IResponse>('/api/products-type');

  function handleButtonClick(productTypeId: number) {
    selectedProductTypeId.set(productTypeId);
  }
</script>

<style>
  .selected {
    border-bottom: 4px solid black;
    transform: scale(1.1);
  }
</style>

<nav>
  {#if $navData}
    <div class="ml-2 mr-2 mt-2 flex flex-row justify-around rounded-lg bg-yellow-200 py-3">
      {#each $navData.productType as item}
        <button
          on:click={() => handleButtonClick(item.id)}
          class="mb-1 border-black text-xl font-bold"
          class:selected={$selectedProductTypeId === item.id}
        >
          {item.type_name}
        </button>
      {/each}
    </div>
  {/if}
</nav>
