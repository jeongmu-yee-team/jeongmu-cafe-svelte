<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';

  import type { IAuthGET } from '$routes/api/auth/+server';

  import Button from '$components/button.svelte';
  import Loading from '$components/loading.svelte';

  const useSignOut = createMutation<IAuthGET>({
    mutationFn: async () => await fetch('/api/auth?action=signout').then((res) => res.json()),
  });

  $: {
    if ($useSignOut.data) {
      if ($useSignOut.data.message === 'Y') {
        window.location.replace('/login');
      }
    }
  }

  async function onClickSignOut() {
    $useSignOut.mutate();
  }
</script>

{#if $useSignOut.isPending || $useSignOut.isSuccess}
  <div class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-10 bg-white">
    <div class="h-20 w-20">
      <Loading />
    </div>
    <span>로그아웃 중...</span>
  </div>
{/if}
<aside class="w-1/5 min-w-60 bg-gray-800 p-8 text-white">
  <ul>
    <li class="mb-4">
      <a class="rounded px-2 py-1 hover:bg-gray-600" href="/admins">대시보드</a>
    </li>
    <li class="mb-4">
      <a class="rounded px-2 py-1 hover:bg-gray-600" href="/admins/products">상품관리</a>
    </li>
    <li class="mb-4">
      <a class="rounded px-2 py-1 hover:bg-gray-600" href="/admins/orders">고객 주문 조회</a>
    </li>
    <li class="mb-4">
      <a class="rounded px-2 py-1 hover:bg-gray-600" href="/admins/settings">키오스크 화면 설정</a>
    </li>
  </ul>
  <Button color="red" textcolor="white" on:click={onClickSignOut}>로그아웃</Button>
</aside>
