<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';

  import type { TAuthGET } from '$routes/api/auth/+server';

  import { page } from '$app/stores';
  import Loading from '$components/layouts/loading.svelte';
  import { Button, buttonVariants } from '$components/ui/button';
  import { Separator } from '$components/ui/separator';

  type MenuSelectType = '/admins' | '/admins/products' | '/admins/orders' | '/admins/settings';

  let selectedMenu: MenuSelectType;

  const useSignOut = createMutation<TAuthGET>({
    mutationFn: async () => await fetch('/api/auth?action=signout').then((res) => res.json()),
  });

  $: {
    if ($useSignOut.data) {
      if ($useSignOut.data.ok) {
        window.location.replace('/login');
      }
    }

    if ($page) {
      selectedMenu = $page.url.pathname as MenuSelectType;
    }
  }

  async function onClickSignOut() {
    $useSignOut.mutate();
  }
</script>

{#if $useSignOut.isPending || $useSignOut.isSuccess}
  <div class="fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-10 bg-white">
    <div class="h-20 w-20">
      <Loading />
    </div>
    <span>로그아웃 중...</span>
  </div>
{/if}
<aside class="fixed z-10 h-full w-[15%] whitespace-nowrap bg-gray-800 text-white">
  <div class="relative h-[85%] w-full">
    <ul class="flex flex-col gap-2 p-8">
      <li>
        <a class={`block rounded px-2 py-2 hover:bg-gray-600 ${selectedMenu === '/admins' && 'text-yellow-500'}`} href="/admins">대시보드</a>
      </li>
      <li>
        <a class={`block rounded px-2 py-2 hover:bg-gray-600 ${selectedMenu === '/admins/products' && 'text-yellow-500'}`} href="/admins/products">
          상품 관리
        </a>
      </li>
      <li>
        <a class={`block rounded px-2 py-2 hover:bg-gray-600 ${selectedMenu === '/admins/orders' && 'text-yellow-500'}`} href="/admins/orders">
          주문 내역
        </a>
      </li>
      <li>
        <a class={`block rounded px-2 py-2 hover:bg-gray-600 ${selectedMenu === '/admins/settings' && 'text-yellow-500'}`} href="/admins/settings">
          키오스크 설정
        </a>
      </li>
      <li>
        <Separator class="my-2 w-full bg-gray-500" />
      </li>
      <li>
        <Button class={buttonVariants({ color: 'red', size: 'sm', className: 'w-32' })} on:click={onClickSignOut}>로그아웃</Button>
      </li>
    </ul>
  </div>
</aside>
