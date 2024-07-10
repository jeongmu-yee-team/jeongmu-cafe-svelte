<script lang="ts">
  import { createMutation, createQuery } from '@tanstack/svelte-query';

  import type { IProductSchema } from '$lib/schemas/product-schema';
  import type { IAdminProductsGET, IAdminProductsUnified } from '$src/routes/api/admins/products/+server';

  import Button from '$components/button.svelte';
  import Loading from '$components/loading.svelte';
  import SearchForm from '$components/search-form.svelte';
  import TableView from '$components/table-view.svelte';

  let method: 'POST' | 'PUT' | 'DELETE' = 'POST';
  let endpoint = '/api/admins/products';

  let formData: IProductSchema = {
    product_id: -1,
    product_name: '',
    product_thumbnail_url: '',
    product_price: -1,
    product_type_id: -1,
  };

  let selectedProductId: number = -1;

  const products = createQuery<IAdminProductsGET>({
    queryKey: ['products'],
    queryFn: async () => await fetch(endpoint).then((res) => res.json()),
  });
  const useProducts = createMutation<IAdminProductsUnified>({
    mutationFn: async () =>
      await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json()),
  });

  // 검색 컴포넌트 만들기
  // 키(검색key): 값(key에 대한 한글명)
  // ex) created_at: '등록일순'

  // 테이블 컴포넌트
</script>

{#if $products.data}
  <article>
    <h1 class="text-2xl font-semibold">상품 관리</h1>
  </article>
  <div class="flex flex-col gap-4 p-10">
    <div>
      <span class="mr-4 text-xl font-bold">상품 보기창</span>
      <Button color="green" textcolor="white">상품 등록</Button>
    </div>
    <div class="border border-gray-300 p-5">
      <form class="flex gap-5">
        <div>
          <label class="block" for="product_name">상품명</label>
          <input
            id="product_name"
            class="rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-400"
            minlength={2}
            placeholder="상품명"
            required
            type="text" />
        </div>
        <div>
          <label class="block" for="product_type">상품유형</label>
          <select
            id="product_type"
            class="rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-400"
            placeholder="상품유형"
            required
            bind:value={formData.product_type_id}>
            {#each $products.data.product_types as product_type}
              <option value={product_type.id}>{product_type.type_name}</option>
            {/each}
          </select>
        </div>
      </form>
    </div>
  </div>
  <div>{$products.data.message}</div>
  <SearchForm />
  <TableView />
{:else}
  <div class="flex h-full w-full items-center justify-center">
    <div class="h-20 w-20">
      <Loading />
    </div>
  </div>
{/if}
