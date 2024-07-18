<script lang="ts">
  import { FlatToast, ToastContainer } from 'svelte-toasts';

  import type { ToastProps } from 'svelte-toasts/types/common';

  import AdminsHeader from '$components/layouts/admins/admins-header.svelte';
  import AdminsSidebar from '$components/layouts/admins/admins-sidebar.svelte';

  const toastProps: Partial<ToastProps> = {
    placement: 'bottom-right',
    theme: 'dark',
    showProgress: true,
    duration: 3500,
  };
</script>

<svelte:head>
  <title>정무카페 관리</title>
</svelte:head>

<div class="font-admin">
  <AdminsHeader />
  <main class="flex min-h-screen pt-20">
    <AdminsSidebar />
    <section class="ml-[15%] w-full bg-gray-50 p-10">
      <slot>Admin Contents</slot>
    </section>
    <ToastContainer {...toastProps} let:data>
      <FlatToast {data} />
    </ToastContainer>
  </main>
</div>
