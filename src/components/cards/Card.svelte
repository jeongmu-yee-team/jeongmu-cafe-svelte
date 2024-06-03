<script lang="ts">
  import NoImage from '$assets/no-image.png';
  import { twMerge } from 'tailwind-merge';
  import { createEventDispatcher } from 'svelte';

  export let cardImage: string | null;
  export let cardImageAlt: string = '카드 이미지';
  export let className: string = '';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', {});
  }
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  }
</script>

<div
  on:click={handleClick}
  on:keydown={handleKeydown}
  tabindex="0"
  role="button"
  class={twMerge(
    'active:transtion group rounded-lg border-2 text-center duration-75 ease-out active:scale-90 active:shadow-2xl',
    className,
  )}
>
  <div class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-b-lg bg-gray-200">
    <img
      src={cardImage || NoImage}
      alt={cardImageAlt}
      class="h-full w-full object-cover object-center p-2 group-hover:opacity-75"
    />
  </div>
  <div class="m-2">
    <slot name="title" />
    <slot name="content" />
  </div>
</div>
