<script lang="ts">
  import { cn } from '$lib/client/utils';

  export let className: string = '';
</script>

<div class={cn('absolute flex h-full w-full items-center justify-center', className)}>
  <div class="flex flex-col items-center gap-2">
    <slot name="title">Error Title</slot>
    <slot name="description">Error Description</slot>
  </div>
</div>
