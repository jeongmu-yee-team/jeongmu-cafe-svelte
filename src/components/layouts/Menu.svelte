<script lang="ts">
  import type { TProducts } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';
  import { selectedProductTypeId } from '$lib/client/store';
  import { derived } from 'svelte/store';
  import Card from '$components/cards/Card.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css/sea-green';

  export let pageSize: number = 9;

  interface IResponse {
    status: number;
    message: string;
    productsWithCount: TProducts;
  }

  const { data: productsData } = useSWR<IResponse>(`/api/products`);

  const filteredData = derived([productsData, selectedProductTypeId], ([$productsData, $selectedProductTypeId]) =>
    $productsData
      ? $productsData.productsWithCount.products.filter((item) => item.product_type_id === $selectedProductTypeId)
      : [],
  );

  let productList: Pick<
    TProducts['products'][0],
    'product_name' | 'product_thumbnail_url' | 'product_price' | 'product_type_id'
  >[][] = [];
  filteredData.subscribe((data) => {
    if (data) {
      productList = [];
      for (let pageIndex = 0; pageIndex < Math.ceil(data.length / pageSize); pageIndex++) {
        productList.push(data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
      }
    }
  });
</script>

<div class="border-b-4 bg-white">
  <div class="mx-auto max-w-3xl">
    {#if $filteredData}
      <Splide aria-label="Menu Slide" options={{ drag: false }}>
        {#each productList as products}
          <SplideSlide class="p-4">
            <div class="grid grid-flow-row grid-cols-3 gap-2">
              {#each products as product}
                <Card cardImage={product.product_thumbnail_url} cardImageAlt="상품 사진">
                  <p slot="title" class="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
                    {product.product_name}
                  </p>
                  <p slot="content" class="p-2 font-bold text-orange-600">{product.product_price}원</p>
                </Card>
              {/each}
            </div>
          </SplideSlide>
        {/each}
      </Splide>
    {:else}
      <div>Loading...</div>
    {/if}
  </div>
</div>
