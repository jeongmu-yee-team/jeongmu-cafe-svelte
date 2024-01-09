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
  <h1>Navigation Bar</h1>
  {#if $navData}
    {#each $navData.productType as item}
      <button>{item.type_name}</button>
    {/each}
  {/if}
</nav>
