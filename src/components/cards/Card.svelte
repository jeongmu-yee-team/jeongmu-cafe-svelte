<script lang="ts">
  import type { TProducts } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';
  import { selectedProductTypeId } from '$lib/store';

  interface ProductItem {
    status: number;
    message: string;
    products: TProducts;
  }

  const { data: productsData, isLoading, error } = useSWR<ProductItem>(`/api/products`);
</script>

<div class="card-display bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    {#if $productsData}
      <div
        class="card-container grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8"
      >
        {#each $productsData.products[0] as item}
          {#if item.product_type_id === $selectedProductTypeId}
            <div class="active:transtion group duration-75 ease-out active:scale-90 active:shadow-2xl">
              <div
                class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200"
              >
                <img
                  src={item.product_thumbnail_url}
                  alt={'사진'}
                  class="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 class="mt-4 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-gray-700">
                {item.product_name}
              </h3>
              <p class="mt-1 font-semibold text-orange-600">{item.product_price}원</p>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
