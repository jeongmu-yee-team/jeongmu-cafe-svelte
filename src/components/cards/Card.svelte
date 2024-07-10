<script lang="ts">
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';

  import NoImage from '$assets/no-image.png';

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
  class={clsx('group rounded-lg border-2 text-center duration-75 ease-out active:scale-95 active:shadow-2xl active:transition-all', className)}
  role="button"
  tabindex="0"
  on:click={handleClick}
  on:keydown={handleKeydown}>
  <div class="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-b-lg bg-gray-200">
    <img class="h-full w-full object-cover object-center p-2 group-hover:opacity-75" alt={cardImageAlt} src={cardImage || NoImage} />
  </div>
  <div class="m-2">
    <slot name="title" />
    <slot name="content" />
  </div>
</div>
