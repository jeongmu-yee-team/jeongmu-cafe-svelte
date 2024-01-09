<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex h-[100vh] w-[100w] flex-col flex-wrap items-center justify-center bg-gray-200">
  <h1 class="m-2 text-3xl font-bold">{$page.status} : Page Load Error</h1>
  <p>{$page.error?.message}</p>
  <p><span class="font-bold">code:</span>&#60;{$page.error?.code}&#62;</p>
  <a class="m-10 rounded-md border-2 border-red-500 p-2 font-bold hover:bg-gray-300 active:bg-gray-400" href="/"
    >홈 페이지로 돌아가기</a
  >
</div>
