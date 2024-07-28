<script generics="T" lang="ts">
  /* eslint-disable no-undef */
  import type { FormInputEvent } from '$components/ui/input';
  import type { QueryObserverResult } from '@tanstack/svelte-query';
  import type { Selected } from 'bits-ui';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, buttonVariants } from '$components/ui/button';
  import Input from '$components/ui/input/input.svelte';
  import * as Select from '$components/ui/select';
  import Separator from '$components/ui/separator/separator.svelte';

  export let refetch: () => Promise<QueryObserverResult<T, Error>>;
  export let inputPlaceholder: string = '검색';
  export let orderBySelect: Selected<string>[] = [{ value: '', label: '' }];

  const sortArray: Selected<string>[] = [
    { value: 'asc', label: '오름차순' },
    { value: 'desc', label: '내림차순' },
  ] as const;
  const sizeArray: Selected<string>[] = [
    { value: '10', label: '10개씩 보기' },
    { value: '20', label: '20개씩 보기' },
    { value: '30', label: '30개씩 보기' },
  ] as const;

  const searchQuery = {
    keyword: $page.url.searchParams.get('keyword') || '',
    size: $page.url.searchParams.get('size') || '',
    page: $page.url.searchParams.get('page') || '',
    orderby: $page.url.searchParams.get('orderby') || '',
    sort: $page.url.searchParams.get('sort') || '',
  };

  async function SubmitQuery() {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('keyword', searchQuery.keyword || '');
    newUrl.searchParams.set('size', searchQuery.size || '');
    newUrl.searchParams.set('page', searchQuery.page || '');
    newUrl.searchParams.set('orderby', searchQuery.orderby || '');
    newUrl.searchParams.set('sort', searchQuery.sort || '');
    newUrl.searchParams.sort();
    await goto(newUrl, { replaceState: true, noScroll: true });
    await refetch();
  }

  function handleOnKeyDown(event: FormInputEvent<KeyboardEvent>) {
    if (event.key === 'Enter') {
      SubmitQuery();
    }
  }

  function handleOrderBySelectedChange(event: Selected<string> | undefined) {
    if (event) {
      searchQuery.orderby = event.value;
      SubmitQuery();
    }
  }

  function handleSortSelectedChange(event: Selected<string> | undefined) {
    if (event) {
      searchQuery.sort = event.value;
      SubmitQuery();
    }
  }

  function handleSizeSelectedChange(event: Selected<string> | undefined) {
    if (event) {
      searchQuery.size = event.value;
      searchQuery.page = '1';
      SubmitQuery();
    }
  }
</script>

<section class="my-4 flex flex-wrap items-center justify-between rounded-md border border-gray-300 p-4 shadow">
  <div class="m-1 flex items-center gap-2">
    <Input
      class="w-[40rem]"
      maxlength={255}
      placeholder={inputPlaceholder}
      required
      type="text"
      on:keydown={handleOnKeyDown}
      bind:value={searchQuery.keyword}
    />
    <Button class={buttonVariants({ variant: 'outline', textcolor: 'black', className: 'shadow' })} on:click={SubmitQuery}>검색</Button>
  </div>
  <div class="flex items-center gap-2">
    <slot name="select_add1" />
    <slot name="select_add2" />
    <slot name="select_add3" />
    <div class="flex items-center gap-1 rounded-lg border px-1 py-2">
      <Select.Root onSelectedChange={handleSizeSelectedChange} selected={{ value: '10', label: '10개씩 보기' }}>
        <Select.Trigger class="w-[8rem]">
          <Select.Value placeholder="보기 개수" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each sizeArray as size}
              <Select.Item label={size.label} value={size.value}>{size.label}</Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Separator class="h-10 bg-gray-300 " orientation="vertical" />
      <Select.Root onSelectedChange={handleOrderBySelectedChange} selected={{ value: orderBySelect[0].value, label: orderBySelect[0].label }}>
        <Select.Trigger class="w-[8rem]">
          <Select.Value placeholder="정렬 기준 설정" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each orderBySelect as orderby}
              <Select.Item label={orderby.label} value={orderby.value}>{orderby.label}</Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Select.Root onSelectedChange={handleSortSelectedChange} selected={{ value: 'asc', label: '오름차순' }}>
        <Select.Trigger class="w-[7rem]">
          <Select.Value placeholder="정렬 순서 설정" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each sortArray as sort}
              <Select.Item label={sort.label} value={sort.value}>{sort.label}</Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  </div>
</section>
