<script lang="ts">
  import IntroModal from '$components/modals/IntroModal.svelte';
  import NavBar from '$components/layouts/NavBar.svelte';
  import type { TProducts } from '$lib/server/modules/products';
  import { useSWR } from 'sswr';
  import Menu from '$src/components/layouts/Menu.svelte';
  import Order from '$src/components/layouts/Order.svelte';
  import type { IProductsGET } from './api/products/+server';

  let introModalToggle: boolean = false;
  let selectedType: number;

  const { data: productsData } = useSWR<IProductsGET>(`/api/products`);

  $: {
    if ($productsData) {
      selectedType = $productsData.product_type[0].id;
    }
  }

  function handleIntroModal() {
    introModalToggle = !introModalToggle;
  }

  function handleTypeChange(id: number) {
    selectedType = id;
  }

  let cart: Array<{
    product_thumbnail_url: string | null;
    product_name: string;
    product_price: number;
    quantity: number;
  }> = [];

  function addToCart(product: { product_thumbnail_url: string | null; product_name: string; product_price: number }) {
    let updated = false;
    const updatedCart = cart.map((item) => {
      if (item.product_name === product.product_name) {
        updated = true; // 상품을 업데이트 했음을 표시
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

  function removeFromCart(productName: string) {
    cart = cart.filter((item) => item.product_name !== productName);
  }
</script>

<style>
  main {
    width: 768px;
    max-width: 100%;
    height: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<svelte:head>
  <title>Intro</title>
</svelte:head>

<main class="border-black-500 relative border-4 font-cafe">
  {#if $productsData}
    <IntroModal toggleModal={handleIntroModal} modalStatus={introModalToggle} />
    <div class="mx-auto flex h-full flex-col">
      <NavBar navProductsData={$productsData.product_type} navProductTypeId={selectedType} {handleTypeChange} />
      <Menu pageSize={6} menuProductsData={$productsData.products} menuProductTypeId={selectedType} {addToCart} />
      <Order {cart} {removeFromCart} />
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</main>
