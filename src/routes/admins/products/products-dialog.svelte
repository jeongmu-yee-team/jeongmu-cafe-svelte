<script lang="ts">
  import { createMutation, type CreateQueryResult } from '@tanstack/svelte-query';
  import { toasts } from 'svelte-toasts';

  import type { IProductSchema } from '$lib/schemas/product-schema';
  import type { TAdminProductsGET, TAdminProductsPOST } from '$routes/api/admins/products/+server';
  import type { TAdminProductGET, TAdminProductPATCH, TAdminProductPUT } from '$routes/api/admins/products/[id]/+server';
  import type { CustomEventHandler, Selected } from 'bits-ui';

  import InputDropzone from '$components/customs/input-dropzone.svelte';
  import { Button, buttonVariants } from '$components/ui/button';
  import * as Dialog from '$components/ui/dialog';
  import Input from '$components/ui/input/input.svelte';
  import * as Select from '$components/ui/select';
  import queryFunction from '$lib/client/query-function';
  import { fileToDataUrl } from '$lib/shared/utils';

  export let productId: number | null = null;
  export let tableProducts: CreateQueryResult<TAdminProductsGET, Error>;
  export let productTypes: Selected<number>[];
  export let dialogType: 'post' | 'put' = 'post';
  export let toggle: boolean = false;
  export let onClickDialog: (toggle: boolean, productId?: number) => void;

  let initDefault: boolean = false;
  let imagePreview: string = '';
  const formData: IProductSchema = {
    product_name: '',
    product_thumbnail_data_url: '',
    product_price: 0,
    product_type_id: 0,
  };

  $: endpoint = productId ? `/api/admins/products/${productId}` : '/api/admins/products';
  const { getFetch, postFetch, putFetch } = queryFunction<TAdminProductGET | TAdminProductsPOST | TAdminProductPATCH>(endpoint);
  const products = createMutation<TAdminProductGET>({
    mutationKey: [endpoint, 'get', 'id'],
    mutationFn: () => getFetch<TAdminProductGET>(endpoint),
  });

  const postProducts = createMutation<TAdminProductsPOST>({
    mutationKey: [endpoint, 'post'],
    mutationFn: () => postFetch<TAdminProductsPOST>(formData, endpoint),
  });
  const putProducts = createMutation<TAdminProductPUT>({
    mutationKey: [endpoint, 'put'],
    mutationFn: () => putFetch<TAdminProductPATCH>(formData, endpoint),
  });

  $: {
    if (toggle && !initDefault) {
      $products.mutate();
      initDefault = true;
    }
    if (!toggle) {
      initDefault = false;
    }
  }

  $: {
    if ($products.data && $products.data.product) {
      formData.product_name = $products.data.product.product_name;
      formData.product_thumbnail_data_url = $products.data.product.product_thumbnail_url || '';
      formData.product_price = $products.data.product.product_price;
      formData.product_type_id = $products.data.product.product_type?.id || 0;
      imagePreview = $products.data.product.product_thumbnail_url || '';
    }

    if ($postProducts.data) {
      if ($postProducts.data.ok) {
        toasts.success({ title: '상품 관리', description: $postProducts.data.message });
        setTimeout(() => $tableProducts.refetch(), 500);
      } else {
        toasts.error({ title: '상품 관리', description: $postProducts.data.message });
      }
      $postProducts.reset();
    }

    if ($putProducts.data) {
      if ($putProducts.data.ok) {
        toasts.success({ title: '상품 관리', description: $putProducts.data.message });
        setTimeout(() => $tableProducts.refetch(), 500);
      } else {
        toasts.error({ title: '상품 관리', description: $putProducts.data.message });
      }
      $putProducts.reset();
    }
  }

  function handleOnSubmit(event: CustomEventHandler<MouseEvent, HTMLButtonElement>) {
    if ($postProducts.isPending || $putProducts.isPending) {
      event.preventDefault();
      return;
    }

    if (formData.product_name === '') {
      toasts.warning({ title: '상품 관리', description: '상품명을 입력해주세요.' });
      event.preventDefault();
      return;
    }

    if (formData.product_name.length < 2) {
      toasts.warning({ title: '상품 관리', description: '상품명은 최소 2글자 이상입니다.' });
      event.preventDefault();
      return;
    }

    if (formData.product_price < 1) {
      toasts.warning({ title: '상품 관리', description: '상품 가격은 0원보다 작은 수 없습니다.' });
      event.preventDefault();
      return;
    }

    if (formData.product_type_id === 0) {
      toasts.warning({ title: '상품 관리', description: '상품 유형은 선택해주세요.' });
      event.preventDefault();
      return;
    }

    if (formData.product_thumbnail_data_url === '') {
      toasts.warning({ title: '상품 관리', description: '상품 이미지를 설정해주세요.' });
      event.preventDefault();
      return;
    }

    if (dialogType === 'post') {
      $postProducts.mutate();
    } else {
      $putProducts.mutate();
    }

    imagePreview = '';
    onClickDialog(false);
  }

  async function handleOnChangeImage(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    const file = event.currentTarget.files?.item(0);
    if (!file) {
      return;
    }

    fileToDataUrl(file, (result) => (formData.product_thumbnail_data_url = result));

    if (imagePreview.length > 1) {
      URL.revokeObjectURL(imagePreview);
    }
    const fileUrl = URL.createObjectURL(file);
    imagePreview = fileUrl;
  }

  function handleOnClickDialogClose() {
    URL.revokeObjectURL(formData.product_thumbnail_data_url);
    formData.product_name = '';
    formData.product_thumbnail_data_url = '';
    formData.product_price = 0;
    formData.product_type_id = 0;
    imagePreview = '';
    onClickDialog(false);
  }
</script>

<Dialog.Root closeOnEscape={false} closeOnOutsideClick={false} open={toggle}>
  {#if dialogType === 'post'}
    <Dialog.Trigger class={buttonVariants({ color: 'fuchsia' })}>상품 등록</Dialog.Trigger>
  {/if}
  <Dialog.Content class="flex min-h-[50%] min-w-[30%] max-w-[70%] flex-col gap-5 sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>상품 {dialogType === 'post' ? '등록' : '수정'}</Dialog.Title>
    </Dialog.Header>
    <form class="flex flex-col gap-4 whitespace-nowrap" enctype="multipart/form-data">
      <div class="my-10 flex justify-center">
        <InputDropzone alt={formData.product_name} className="w-[50%] aspect-square" onChange={handleOnChangeImage} src={imagePreview} />
      </div>
      <div class="flex w-96 items-center gap-4">
        <label class="text-right" for="product_name">상품명</label>
        <Input
          id="product_name"
          type="text"
          value={$products.data?.product?.product_name}
          on:input={(event) => (formData.product_name = event.currentTarget.value)}
        />
      </div>
      <div class="flex items-center gap-4">
        <label class="text-right" for="product_price">상품 가격</label>
        <Input
          id="product_price"
          class="w-24"
          type="number"
          value={$products.data?.product?.product_price}
          on:input={(event) => (formData.product_price = Number(event.currentTarget.value))}
        />
        <span>원</span>
      </div>
      <div class="flex w-96 items-center gap-4">
        <label class="text-right" for="product_type">상품 유형</label>
        <Select.Root
          onSelectedChange={(event) => (formData.product_type_id = Number(event?.value))}
          selected={{ value: $products.data?.product?.product_type?.id || 0, label: $products.data?.product?.product_type?.type_name || '' }}
        >
          <Select.Trigger id="product_type" class="w-[8.5rem] whitespace-nowrap">
            <Select.Value placeholder="상품 유형 선택" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              {#each productTypes as productType}
                <Select.Item class="whitespace-nowrap" label={productType.label} value={productType.value}>{productType.label}</Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </form>
    <Dialog.Footer>
      <Dialog.Close on:click={handleOnClickDialogClose}>
        <Button class={buttonVariants({ variant: 'outline', textcolor: 'black' })}>취소</Button>
      </Dialog.Close>
      <Dialog.Close type="submit" on:click={handleOnSubmit}>
        <Button class={buttonVariants({ color: 'green' })}>
          {dialogType === 'post' ? '등록' : '수정'} 완료
        </Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
