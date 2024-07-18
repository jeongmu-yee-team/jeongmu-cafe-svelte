<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { onMount } from 'svelte';

  import ProductsDialog from './products-dialog.svelte';
  import ProductsTable from './products-table.svelte';

  import type { ProductOrderByType, ProductSortType } from '$lib/server/modules/products';
  import type { IProductsWithTypeBySearchProps } from '$lib/server/modules/products';
  import type { TAdminProductsGET } from '$routes/api/admins/products/+server';
  import type { Selected } from 'bits-ui';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SearchForm from '$components/customs/search-form.svelte';
  import ErrorMessage from '$components/layouts/error-message.svelte';
  import Loading from '$components/layouts/loading.svelte';
  import * as Select from '$components/ui/select';
  import queryFunction from '$lib/client/query-function';

  export let data;

  const orderByArray: Selected<string>[] = [
    { value: 'product_name', label: '상품명 기준' },
    { value: 'created_at', label: '등록일 기준' },
  ] as const;

  let pageLoading: boolean = true;
  let productTypes: Selected<number>[] = [];
  let searchQuery: IProductsWithTypeBySearchProps = {
    keyword: data.keyword,
    size: Number(data.size),
    page: Number(data.page),
    orderby: data.orderby as ProductOrderByType,
    sort: data.sort as ProductSortType,
  };
  let toggleState: boolean = false;

  // eslint-disable-next-line max-len
  $: endpoint = `/api/admins/products?keyword=${data.keyword}&type=${data.type}&size=${data.size}&page=${data.page}&orderby=${data.orderby}&sort=${data.sort}`;
  const { getFetch } = queryFunction<TAdminProductsGET>(endpoint);
  const products = createQuery<TAdminProductsGET>({
    queryKey: [endpoint],
    queryFn: () => getFetch(endpoint),
  });

  $: if ($products.data) {
    if ($products.data.product_type) {
      productTypes = $products.data.product_type.map((item) => {
        return { value: item.id, label: item.type_name };
      });
    }
  }

  onMount(() => {
    pageLoading = false;
  });

  async function SubmitQuery() {
    const newUrl = new URL($page.url.pathname, $page.url.origin);
    newUrl.searchParams.set('keyword', data.keyword);
    newUrl.searchParams.set('type', String(searchQuery.type || '') || data.type);
    newUrl.searchParams.set('size', data.size);
    newUrl.searchParams.set('page', String(searchQuery.page || '') || data.page);
    newUrl.searchParams.set('orderby', data.orderby);
    newUrl.searchParams.set('sort', data.sort);
    newUrl.searchParams.sort();
    await goto(newUrl, { replaceState: true, noScroll: true });
    await $products.refetch();
  }

  function handleOnTypeSelectedChange(event: Selected<string> | undefined) {
    if (event) {
      searchQuery.type = Number(event.value) || 'none';
      searchQuery.page = 1;
      SubmitQuery();
    }
  }

  function handleOnClickToggle(toggle: boolean) {
    toggleState = toggle;
  }
</script>

{#if $products.data && $products.data.products && !pageLoading}
  <article>
    <h1 class="text-2xl font-semibold">상품 관리</h1>
  </article>
  <SearchForm inputPlaceholder="상품명 검색" orderBySelect={orderByArray} refetch={$products.refetch}>
    <Select.Root slot="select_add1" onSelectedChange={handleOnTypeSelectedChange} selected={{ value: 'none', label: '상품 유형 선택' }}>
      <Select.Trigger class="w-[8rem] whitespace-nowrap">
        <Select.Value placeholder="상품 유형 선택" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Item label="선택 없음" value="none">선택 없음</Select.Item>
          {#each productTypes as productType}
            <Select.Item class="whitespace-nowrap" label={productType.label} value={productType.value}>{productType.label}</Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </SearchForm>
  <ProductsTable SSR_data={data} {productTypes} {products} />
  <ProductsDialog dialogType="post" onClickDialog={handleOnClickToggle} {productTypes} tableProducts={products} toggle={toggleState} />
{:else if $products.isPending || $products.isFetching}
  <div class="flex h-full w-full items-center justify-center">
    <div class="h-20 w-20">
      <Loading />
    </div>
  </div>
{:else if !$products.data?.ok}
  <div class="relative h-full w-full">
    <ErrorMessage>
      <h1 slot="title" class="text-xl font-bold">잘못된 쿼리 요청</h1>
      <p slot="description">쿼리 요청을 수정하거나 제거 후 시도하십시오.</p>
    </ErrorMessage>
  </div>
{/if}
