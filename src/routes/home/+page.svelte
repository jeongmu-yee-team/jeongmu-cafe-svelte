<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';

  import type { IProductsGET } from '$src/routes/api/products/+server';
  import type { ICartItem } from '$src/routes/home/+page';

  import HomeMenu from '$src/components/layouts/home/home-menu.svelte';
  import HomeNavbar from '$src/components/layouts/home/home-navbar.svelte';
  import HomeOrder from '$src/components/layouts/home/home-order.svelte';
  import queryFunction from '$src/lib/client/query-function';

  let productsData: IProductsGET;
  let selectedProductType: number;
  let cart: ICartItem[] = [];

  const endpoint = '/api/products';
  const { getFetch } = queryFunction<IProductsGET>(endpoint);
  const queryData = createQuery<IProductsGET>({
    queryKey: [endpoint],
    queryFn: () => getFetch(),
  });

  $: if ($queryData.data) {
    selectedProductType = $queryData.data.product_type[0].id;
    productsData = $queryData.data;
  }

  function handleTypeChange(typeId: number) {
    selectedProductType = typeId;
  }

  function handleOnAddItem(product: ICartItem) {
    let updated = false;
    const updatedCart = cart.map((item) => {
      if (item.product_name === product.product_name) {
        updated = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!updated) {
      cart = [...updatedCart, { ...product, quantity: 1 }];
    } else {
      cart = updatedCart;
    }
  }

  function handleOnRemoveItem(productName: string) {
    cart = cart.filter((item) => item.product_name !== productName);
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  {#if productsData}
    <div class="flex h-full flex-col">
      <HomeNavbar onClickTypeChange={handleTypeChange} productTypeList={productsData.product_type} selectedType={selectedProductType} />
      <HomeMenu onApplyItem={handleOnAddItem} productList={productsData.products} selectedType={selectedProductType} />
      <HomeOrder onRemoveItem={handleOnRemoveItem} selectedCartItem={cart} />
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</section>
