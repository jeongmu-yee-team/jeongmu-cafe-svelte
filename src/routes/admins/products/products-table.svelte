<script lang="ts">
  import { createMutation, type CreateQueryResult } from '@tanstack/svelte-query';
  import ChevronLeft from 'lucide-svelte/icons/chevron-left';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';
  import { toasts } from 'svelte-toasts';

  import ProductsDialog from './products-dialog.svelte';

  import type { IPATCHProductsSchema } from '$lib/schemas/product-schema';
  import type { IProductsWithTypeBySearchProps, ProductOrderByType, ProductSortType } from '$lib/server/modules/products';
  import type { TAdminProductsGET } from '$routes/api/admins/products/+server';
  import type { TAdminProductPATCH, TAdminProductDELETE } from '$routes/api/admins/products/[id]/+server';
  import type { ProductsServerSideProps } from './+page.server';
  import type { Selected } from 'bits-ui';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, buttonVariants } from '$components/ui/button';
  import * as Pagination from '$components/ui/pagination';
  import { Switch } from '$components/ui/switch';
  import * as Table from '$components/ui/table';
  import queryFunction from '$lib/client/query-function';
  import { dateToString, numberToPrice } from '$lib/shared/utils';

  export let SSR_data: ProductsServerSideProps;
  export let products: CreateQueryResult<TAdminProductsGET, Error>;
  export let productTypes: Selected<number>[];

  const searchQuery: IProductsWithTypeBySearchProps = {
    keyword: SSR_data.keyword,
    size: Number(SSR_data.size),
    page: Number(SSR_data.page),
    orderby: SSR_data.orderby as ProductOrderByType,
    sort: SSR_data.sort as ProductSortType,
  };
  let isDisplayState: boolean[] = [];
  let patchForm: IPATCHProductsSchema;
  let toggleState: boolean = false;
  let selectedProductId: number;

  let endpoint = '/api/admins/products';
  const { patchFetch, deleteFetch } = queryFunction<TAdminProductPATCH>(endpoint);
  const patchProduct = createMutation<TAdminProductPATCH>({
    mutationKey: [endpoint],
    mutationFn: () => patchFetch(patchForm, endpoint),
  });
  const deleteProduct = createMutation<TAdminProductDELETE>({
    mutationKey: [endpoint],
    mutationFn: () => deleteFetch(patchForm, endpoint),
  });

  $: if ($products.data && $products.data.products) {
    isDisplayState = $products.data.products.map((product) => {
      return product.is_display;
    });
  }

  $: {
    if ($patchProduct.data) {
      if ($patchProduct.data.ok) {
        toasts.success({ title: '상품 관리', description: $patchProduct.data.message });
      } else {
        toasts.error({ title: '상품 관리', description: $patchProduct.data.message });
      }
    }
    if ($deleteProduct.data) {
      if ($deleteProduct.data.ok) {
        toasts.success({ title: '상품 관리', description: $deleteProduct.data.message });
      } else {
        toasts.error({ title: '상품 관리', description: $deleteProduct.data.message });
      }
    }
  }

  async function SubmitQuery() {
    const newUrl = new URL($page.url.pathname, $page.url.origin);
    newUrl.searchParams.set('keyword', SSR_data.keyword);
    newUrl.searchParams.set('type', String(searchQuery.type || '') || SSR_data.type);
    newUrl.searchParams.set('size', SSR_data.size);
    newUrl.searchParams.set('page', String(searchQuery.page || '') || SSR_data.page);
    newUrl.searchParams.set('orderby', SSR_data.orderby);
    newUrl.searchParams.set('sort', SSR_data.sort);
    newUrl.searchParams.sort();
    await goto(newUrl, { replaceState: true, noScroll: true });
    await $products.refetch();
  }

  function handleOnClickPageButton(page: number | undefined, buttonType?: 'prev' | 'next') {
    if (page) {
      if (buttonType) {
        searchQuery.page = buttonType === 'prev' ? page - 1 : page + 1;
      } else {
        searchQuery.page = page;
      }
      SubmitQuery();
    }
  }

  function handleOnClickIsDisplay(productId: number, isDisplay: boolean) {
    if ($patchProduct.isPending) {
      return;
    }
    endpoint = `/api/admins/products/${productId}`;
    patchForm = { is_display: !isDisplay };
    $patchProduct.mutate();
    setTimeout(() => $products.refetch(), 500);
  }

  function handleOnClickDelete(productId: number) {
    if ($patchProduct.isPending) {
      return;
    }
    if (window.confirm('상품을 삭제하시겠습니까?')) {
      endpoint = `/api/admins/products/${productId}`;
      $deleteProduct.mutate();
      setTimeout(() => $products.refetch(), 500);
    }
  }

  function handleOnClickToggle(toggle: boolean, productId?: number) {
    if (productId) {
      selectedProductId = productId;
    }
    toggleState = toggle;
  }
</script>

{#if $products.data && $products.data.products}
  <Table.Root>
    <Table.Header>
      <Table.Row class="bg-slate-100 hover:bg-slate-100">
        <Table.Head class="w-14 whitespace-nowrap text-center">No.</Table.Head>
        <Table.Head class="w-32 whitespace-nowrap text-center">상품 유형</Table.Head>
        <Table.Head class="w-48 whitespace-nowrap text-center">상품 이미지</Table.Head>
        <Table.Head class="whitespace-nowrap text-left">상품명</Table.Head>
        <Table.Head class="w-32 whitespace-nowrap text-center">상품 가격</Table.Head>
        <Table.Head class="w-32 whitespace-nowrap text-center">판매 상태</Table.Head>
        <Table.Head class="w-48 text-center">등록일시</Table.Head>
        <Table.Head class="w-24 text-center">상품 삭제</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#if $products.data.products.length === 0}
        <Table.Row>
          <Table.Cell colspan={99}>
            <div class="h-24 text-center text-primary">검색된 데이터가 없습니다.</div>
          </Table.Cell>
        </Table.Row>
      {/if}
      {#each $products.data.products as product, index}
        <Table.Row>
          <Table.Cell class="text-center">{index + 1}</Table.Cell>
          <Table.Cell class="text-center">{product.product_type?.type_name}</Table.Cell>
          <Table.Cell class="flex justify-center">
            <figure class="aspect-square max-w-[4rem]">
              <img alt="상품 이미지" src={product.product_thumbnail_url} />
            </figure>
          </Table.Cell>
          <Table.Cell class="cursor-pointer text-left hover:underline" on:click={() => handleOnClickToggle(true, product.id)}>
            {product.product_name}
          </Table.Cell>
          <Table.Cell class="text-center">{numberToPrice(product.product_price)}원</Table.Cell>
          <Table.Cell class="text-center">
            <Switch bind:checked={isDisplayState[index]} on:click={() => handleOnClickIsDisplay(product.id, product.is_display)} />
          </Table.Cell>
          <Table.Cell class="text-center">{dateToString(product.created_at)}</Table.Cell>
          <Table.Cell class="text-center">
            <Button class={buttonVariants({ color: 'gray', size: 'sm' })} on:click={() => handleOnClickDelete(product.id)}>삭제</Button>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
  <Pagination.Root count={$products.data.totalCount} page={Number(SSR_data.page) || 1} perPage={Number(SSR_data.size)} let:currentPage let:pages>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton on:click={() => handleOnClickPageButton(currentPage, 'prev')}>
          <ChevronLeft class="h-4 w-4" />
          <span class="hidden sm:block">이전 페이지</span>
        </Pagination.PrevButton>
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === 'ellipsis'}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link isActive={currentPage === page.value} {page} on:click={() => handleOnClickPageButton(page.value)}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton on:click={() => handleOnClickPageButton(currentPage, 'next')}>
          <span class="hidden sm:block">다음 페이지</span>
          <ChevronRight class="h-4 w-4" />
        </Pagination.NextButton>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
  <ProductsDialog
    dialogType="put"
    onClickDialog={handleOnClickToggle}
    productId={selectedProductId}
    {productTypes}
    tableProducts={products}
    toggle={toggleState}
  />
{/if}
