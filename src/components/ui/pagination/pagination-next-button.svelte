<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';

  import { Button } from '$components/ui/button/index';
  import { cn } from '$lib/client/utils';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = PaginationPrimitive.NextButtonEvents;
  type $$Props = PaginationPrimitive.NextButtonProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<PaginationPrimitive.NextButton asChild let:builder>
  <Button class={cn('gap-1 pr-2.5', className)} builders={[builder]} variant="ghost" on:click {...$$restProps}>
    <slot>
      <span>Next</span>
      <ChevronRight class="h-4 w-4" />
    </slot>
  </Button>
</PaginationPrimitive.NextButton>
