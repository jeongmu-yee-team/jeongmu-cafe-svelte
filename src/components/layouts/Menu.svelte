<script lang="ts">
  import type { TProducts } from '$lib/server/modules/products';
  import Card from '$components/cards/Card.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css/sea-green';

  export let pageSize: number;
  export let menuProductsData: TProducts | undefined;
  export let menuProductTypeId: number;

  let productSlide: TProducts[] = [];

  $: if (menuProductsData) {
    productSlide = [];
    const filteredData = menuProductsData.filter((item) => item.product_type_id === menuProductTypeId);
    for (let pageIndex = 0; pageIndex < Math.ceil(filteredData.length / pageSize); pageIndex++) {
      productSlide.push([]);
      for (
        let itemIndex = 0;
        itemIndex < pageSize && pageIndex * pageSize + itemIndex < filteredData.length;
        itemIndex++
      ) {
        productSlide[pageIndex].push(filteredData[pageIndex * pageSize + itemIndex]);
      }
    }
  }

  export let addToCart: (product: {
    product_thumbnail_url: string | null;
    product_name: string;
    product_price: number;
  }) => void;
</script>

<div class="border-b-4 bg-white">
  <div class="mx-auto max-w-3xl">
    {#if productSlide}
      <Splide aria-label="Menu Slide" options={{ drag: false }}>
        {#each productSlide as pageProduct}
          <SplideSlide>
            <div class="grid grid-flow-row grid-cols-3 gap-2">
              {#each pageProduct as product}
                <Card
                  on:click={() => addToCart(product)}
                  cardImage={product.product_thumbnail_url}
                  cardImageAlt="상품 사진"
                >
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
