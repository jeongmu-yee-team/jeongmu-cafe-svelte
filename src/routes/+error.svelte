<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex h-[100vh] w-[100w] flex-col flex-wrap items-center justify-center bg-gray-200">
  <h1 class="text-3xl font-bold">Page Load Error</h1>
  <p>status: {$page.status}</p>
  <p>message: {$page.error?.message}</p>
  <p>code: {$page.error?.code}</p>
</div>
