<script lang="ts">
  import type { TProductType } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';

  interface IResponse {
    status: number;
    message: string;
    productType: TProductType;
  }

  const { data: navData, isLoading, error } = useSWR<IResponse>('/api/products-type');
</script>

<nav>
  {#if $navData}
    <div class="ml-2 mr-2 mt-2 flex flex-col items-center justify-between rounded-lg bg-yellow-200 py-3">
      <div class="ml-2 flex space-x-5">
        {#each $navData.productType as item}
          <button class="mb-1 border-black text-xl font-bold duration-300 hover:scale-105 hover:border-b-4">
            {item.type_name}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</nav>
