<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui';

  import { type Events, type Props, buttonVariants } from './index';

  import { cn } from '$lib/client/utils';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = Events;
  type $$Props = Props;

  let className: $$Props['class'] = undefined;
  export let variant: $$Props['variant'] = 'default';
  export let size: $$Props['size'] = 'default';
  export let color: $$Props['color'] = 'default';
  export let textcolor: $$Props['textcolor'] = 'default';
  export let builders: $$Props['builders'] = [];
  export { className as class };
</script>

<ButtonPrimitive.Root
  class={cn(buttonVariants({ variant, size, color, textcolor, className }))}
  {builders}
  type="button"
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</ButtonPrimitive.Root>
