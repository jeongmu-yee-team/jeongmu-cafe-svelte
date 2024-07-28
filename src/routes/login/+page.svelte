<script lang="ts">
  import { createMutation } from '@tanstack/svelte-query';
  import { Eye, EyeOff } from 'lucide-svelte';
  import { onMount } from 'svelte';

  import type { IAuthSchema } from '$lib/schemas/auth-schema';
  import type { TAuthPOST } from '$routes/api/auth/+server';

  import { goto } from '$app/navigation';
  import Loading from '$components/layouts/loading.svelte';
  import queryFunction from '$lib/client/query-function';
  import { cn } from '$lib/client/utils';

  export let data;

  let formData: IAuthSchema = { user_id: '', password: '' };
  let showPassword: boolean = false;
  let showPasswordIcons: boolean = false;
  let errorMessage: string = '';

  const endpoint = '/api/auth';
  const { postFetch } = queryFunction<TAuthPOST>(endpoint);
  const useSginIn = createMutation<TAuthPOST>({ mutationKey: [endpoint], mutationFn: () => postFetch(formData) });

  $: {
    if ($useSginIn.data) {
      if ($useSginIn.data.ok) {
        goto('/admins', { replaceState: true });
      } else {
        errorMessage = $useSginIn.data.message || '';
      }
    }

    if (formData.password.length > 0) {
      showPasswordIcons = true;
    } else {
      showPasswordIcons = false;
    }
  }

  onMount(() => {
    if (!data.session) {
      goto('/admins', { replaceState: true });
    }
  });

  function onSubmit() {
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
            placeholder="관리자 ID"
            required
            type="text"
            on:input={onInputForm}
            bind:value={formData.user_id}
          />
        </div>
        <div class="mb-4">
          <label class="mb-2 block text-sm font-medium text-gray-600" for="password">Password</label>
          <div class="relative flex items-center">
            {#if showPassword}
              <input
                id="password"
                class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
                autocomplete="off"
                minlength={8}
                placeholder="Password"
                required
                type="text"
                on:input={onInputForm}
                bind:value={formData.password}
              />
              {#if showPasswordIcons}
                <button class="absolute right-0 rounded p-2" type="button" on:click={() => (showPassword = !showPassword)}>
                  <Eye class="text-gray-400" />
                </button>
              {/if}
            {:else}
              <input
                id="password"
                class="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
                autocomplete="off"
                minlength={8}
                placeholder="Password"
                required
                type="password"
                on:input={onInputForm}
                bind:value={formData.password}
              />
              {#if showPasswordIcons}
                <button class="absolute right-0 rounded p-2" type="button" on:click={() => (showPassword = !showPassword)}>
                  <EyeOff class="text-gray-400" />
                </button>
              {/if}
            {/if}
          </div>
        </div>
        {#if errorMessage !== ''}
          <div class="my-2 text-red-500">{errorMessage}</div>
        {/if}
        <button
          class={cn(
            'item flex h-12 w-full items-center justify-center gap-2 rounded-md',
            'bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300',
          )}
          disabled={$useSginIn.isPending}
          type="submit"
        >
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
