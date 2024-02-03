<script lang="ts">
  import type { TProductType } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';
  import { selectedProductTypeId } from '$lib/client/store';

  interface IResponse {
    status: number;
    message: string;
    productType: TProductType;
  }

  const { data: navData } = useSWR<IResponse>('/api/products-type');

  navData.subscribe((data) => {
    if (data) {
      selectedProductTypeId.set(data.productType[0].id);
    }
  });

  function handleButtonClick(productTypeId: number) {
    selectedProductTypeId.set(productTypeId);
  }
</script>

<nav>
  {#if $navData}
    <div class="m-1 flex h-14 justify-around rounded-lg bg-yellow-200">
      {#each $navData.productType as item}
        <button on:click={() => handleButtonClick(item.id)} class="text-xl font-bold">
          <div class={`${$selectedProductTypeId === item.id && 'scale-110 border-b-4 border-black duration-200'}`}>
            {item.type_name}
          </div>
        </button>
      {/each}
    </div>
  {/if}
</nav>
