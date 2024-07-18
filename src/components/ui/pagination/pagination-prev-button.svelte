<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import ChevronLeft from 'lucide-svelte/icons/chevron-left';

  import { Button } from '$components/ui/button/index';
  import { cn } from '$lib/client/utils';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = PaginationPrimitive.PrevButtonEvents;
  type $$Props = PaginationPrimitive.PrevButtonProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<PaginationPrimitive.PrevButton asChild let:builder>
  <Button class={cn('gap-1 pl-2.5', className)} builders={[builder]} variant="ghost" on:click {...$$restProps}>
    <slot>
      <ChevronLeft class="h-4 w-4" />
      <span>Previous</span>
    </slot>
  </Button>
</PaginationPrimitive.PrevButton>
