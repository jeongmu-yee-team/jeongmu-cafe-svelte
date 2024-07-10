<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';
  import clsx from 'clsx';

  import type { IPostAuthSchema } from '$lib/schemas/post-auth-schema';
  import type { IAuthPOST } from '$src/routes/api/auth/+server';

  import Loading from '$components/loading.svelte';

  let formData: IPostAuthSchema = { user_id: '', password: '' };
  let errorMessage: string = '';

  const useSginIn = createMutation<IAuthPOST>({
    mutationFn: async () =>
      await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json()),
  });

  $: if ($useSginIn.data) {
    if ($useSginIn.data.success === 'ok') {
      window.location.href = '/admins';
    } else {
      errorMessage = $useSginIn.data.message || '';
    }
  }

  async function onSubmit() {
    $useSginIn.mutate();
  }

  function onInputForm() {
    errorMessage = '';
  }
</script>

<div>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-96 rounded bg-white p-8 shadow-md">
      <h2 class="mb-4 text-2xl font-semibold">관리자 로그인</h2>
      <form on:submit={onSubmit}>
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-600" for="id">ID</label>
          <input
            id="id"
            class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            minlength={5}
            required
            type="text"
            on:input={onInputForm}
            bind:value={formData.user_id} />
        </div>
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-600" for="password">Password</label>
          <input
            id="password"
            class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
            autocomplete="off"
            minlength={8}
            required
            type="password"
            on:input={onInputForm}
            bind:value={formData.password} />
        </div>
        {#if errorMessage !== ''}
          <div class="my-2 text-red-500">{errorMessage}</div>
        {/if}
        <button
          class={clsx(
            'item flex h-12 w-full items-center justify-center gap-2 rounded-md',
            'bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300',
          )}
          disabled={$useSginIn.isPending}
          type="submit">
          <span>로그인</span>
          {#if $useSginIn.isPending}
            <div class="h-8 w-8">
              <Loading />
            </div>
          {/if}
        </button>
      </form>
    </div>
  </div>
</div>
<div>ds</div>
