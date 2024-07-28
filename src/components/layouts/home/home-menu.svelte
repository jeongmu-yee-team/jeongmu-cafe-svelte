<script lang="ts">
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';

  import type { TReadAllProducts } from '$lib/server/modules/products';
  import type { ICartItem } from '$routes/home/home-type';

  import Card from '$components/customs/card.svelte';

  export let productList: TReadAllProducts;
  export let selectedType: number;
  export let onApplyItem: (product: ICartItem) => void;

  let productSlide: TReadAllProducts[] = [];
  let pageSize: number = 9;

  $: if (productList) {
    productSlide = [];
    const productView = productList.filter((product) => product.product_type_id === selectedType);
    for (let pageIndex = 0; pageIndex < Math.ceil(productView.length / pageSize); pageIndex++) {
      productSlide.push([]);
      for (let itemIndex = 0; itemIndex < pageSize && pageIndex * pageSize + itemIndex < productView.length; itemIndex++) {
        productSlide[pageIndex].push(productView[pageIndex * pageSize + itemIndex]);
      }
    }
  }
</script>

<div class="px-[10vw]">
  <div class="h-[70vh] w-full overflow-y-scroll scrollbar-hide">
    {#if productSlide}
      <Splide aria-label="Menu Slide" options={{ drag: false }}>
        {#each productSlide as pageProduct}
          <SplideSlide>
            <div class="mx-5 grid grid-flow-row grid-cols-3 gap-2">
              {#each pageProduct as product}
                <Card cardImage={product.product_thumbnail_url} cardImageAlt="상품 사진" on:click={() => onApplyItem({ ...product, quantity: 1 })}>
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
