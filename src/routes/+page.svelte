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

  let selectedProducts: TProducts = []; // 선택된 상품을 저장할 배열

  function handleProductSelect(id: number) {
    selectedProducts = []; // 선택된 상품 추가
  }
</script>

<!-- 키오스크 화면 임의로 조정 실제 키오스크에서 사용시 style삭제 -->
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
    <!-- 데이터 로딩이 완료된 경우에만 내부 컴포넌트 렌더링 -->
    <IntroModal toggleModal={handleIntroModal} modalStatus={introModalToggle} />
    <div class="mx-auto flex h-full flex-col justify-center">
      <NavBar navProductsData={$productsData.product_type} navProductTypeId={selectedType} {handleTypeChange} />
      <Menu pageSize={6} menuProductsData={$productsData.products} menuProductTypeId={selectedType} />
      <Order className="flex-grow bg-gray-100" orderProductsData={$productsData.products} />
    </div>
  {:else}
    <!-- 데이터 로딩 중 표시 -->
    <p>Loading...</p>
  {/if}
</main>
