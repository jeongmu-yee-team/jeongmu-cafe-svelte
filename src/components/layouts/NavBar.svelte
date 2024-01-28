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

<nav>
  {#if $navData}
    <div class="ml-2 mr-2 mt-2 flex flex-row justify-around rounded-lg bg-yellow-200 py-3">
      {#each $navData.productType as item}
        <button
          on:click={() => handleButtonClick(item.id)}
          class="mb-1 border-black text-xl font-bold
          {`${$selectedProductTypeId === item.id ? 'scale-110 transform border-b-4 duration-200' : ''}`}"
        >
          {item.type_name}
        </button>
      {/each}
    </div>
  {/if}
</nav>
