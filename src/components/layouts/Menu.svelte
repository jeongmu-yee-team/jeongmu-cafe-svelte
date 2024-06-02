<script lang="ts">
  import type { TProducts } from '$lib/server/modules/products';
  import Card from '$components/cards/Card.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css/sea-green';

  export let pageSize: number;
  export let menuProductsData: TProducts | undefined;
  export let menuProductTypeId: number;
  export let handleProductSelect: (id: number) => void;

  let productSlide: TProducts[] = [];

  $: if (menuProductsData) {
    productSlide = [];
    const filteredData = menuProductsData.filter((item) => item.product_type_id === menuProductTypeId);
    for (let pageIndex = 0; pageIndex < Math.ceil(filteredData.length / pageSize); pageIndex++) {
      productSlide.push([]);
      for (let itemIndex = 0; itemIndex < pageSize; itemIndex++) {
        if (pageIndex * pageSize + itemIndex > filteredData.length - 1) {
          break;
        }
        productSlide[pageIndex].push(filteredData[pageIndex * pageSize + itemIndex]);
      }
    }
  }
</script>

<div class="border-b-4 bg-white">
  <div class="mx-auto max-w-3xl">
    {#if productSlide}
      <Splide aria-label="Menu Slide" options={{ drag: false }}>
        {#each productSlide as pageProduct}
          <SplideSlide class="p-4">
            <div class="grid grid-flow-row grid-cols-3 gap-2">
              {#each pageProduct as products}
                <Card
                  on:click={() => handleProductSelect(products.id)}
                  cardImage={products.product_thumbnail_url}
                  cardImageAlt="상품 사진"
                >
                  <p slot="title" class="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
                    {products.product_name}
                  </p>
                  <p slot="content" class="p-2 font-bold text-orange-600">{products.product_price}원</p>
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
