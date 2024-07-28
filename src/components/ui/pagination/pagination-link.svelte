<script lang="ts">
  import { Pagination as PaginationPrimitive } from 'bits-ui';

  import { type Props, buttonVariants } from '$components/ui/button/index';
  import { cn } from '$lib/client/utils';

  type $$Props = PaginationPrimitive.PageProps &
    Props & {
      isActive: boolean;
    };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = PaginationPrimitive.PageEvents;

  let className: $$Props['class'] = undefined;
  export let page: $$Props['page'];
  export let size: $$Props['size'] = 'icon';
  export let isActive: $$Props['isActive'] = false;

  export { className as class };
</script>

<PaginationPrimitive.Page
  class={cn(
    buttonVariants({
      variant: isActive ? 'outline' : 'ghost',
      size,
    }),
    className,
  )}
  bind:page
  {...$$restProps}
  on:click
>
  <slot>{page.value}</slot>
</PaginationPrimitive.Page>
