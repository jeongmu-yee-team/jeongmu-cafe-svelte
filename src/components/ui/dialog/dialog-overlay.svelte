<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import { fade } from 'svelte/transition';

  import { cn } from '$lib/client/utils';

  type $$Props = DialogPrimitive.OverlayProps;

  let className: $$Props['class'] = undefined;
  export let transition: $$Props['transition'] = fade;
  export let transitionConfig: $$Props['transitionConfig'] = {
    duration: 150,
  };
  export { className as class };
</script>

<DialogPrimitive.Overlay
  class={cn('fixed inset-0 z-50 bg-gray-300/70 backdrop-blur-sm', className)}
  {transition}
  {transitionConfig}
  {...$$restProps}
/>
