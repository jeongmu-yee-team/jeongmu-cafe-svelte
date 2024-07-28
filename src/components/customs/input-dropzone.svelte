<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';

  import { cn } from '$lib/client/utils';

  export let src: string;
  export let alt: string;
  export let className: string = '';
  export let onChange: ChangeEventHandler<HTMLInputElement> | undefined | null;

  let hover: boolean;
</script>

<figure
  class={cn('relative inline-block min-h-10 min-w-10 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-400', className)}
  on:mouseenter={() => (hover = true)}
  on:mouseleave={() => (hover = false)}
>
  {#if src}
    <img class="absolute z-0 h-full w-full" {alt} {src} />
  {/if}
  {#if hover}
    <div class="absolute h-full w-full bg-gray-300 opacity-50" />
  {/if}
  {#if !src || hover}
    <div class="absolute flex h-full w-full items-center justify-center">
      <span class="text-xl">파일 드롭</span>
    </div>
  {/if}
  <input
    id="dropzone"
    class="absolute left-0 top-0 h-full w-full cursor-pointer bg-slate-100 opacity-0"
    accept=".jpeg, .jpg, .png, .gif .webp"
    type="file"
    on:change={onChange}
  />
</figure>
