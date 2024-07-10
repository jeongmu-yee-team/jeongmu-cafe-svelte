<script lang="ts">
  import clsx from 'clsx';

  const COLORS = {
    red: 'bg-red-500 hover:bg-red-600',
    green: 'bg-green-500 hover:bg-green-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
    fuchsia: 'bg-fuchsia-500 hover:bg-fuchsia-600',
    cyan: 'bg-cyan-500 hover:bg-cyan-600',
    oragne: 'bg-orange-500 hover:bg-orange-600',
    gray: 'bg-gray-500 hover:bg-gray-600',
  } as const;

  const TEXTCOLORS = {
    black: 'text-black',
    white: 'text-white',
  };

  export let color: 'red' | 'green' | 'blue' | 'yellow' | 'fuchsia' | 'cyan' | 'oragne' | 'gray';
  export let textcolor: 'black' | 'white' = 'black';
  export let className: string = '';
</script>

<button class={clsx('rounded-lg p-2 duration-200 active:scale-95', COLORS[color], TEXTCOLORS[textcolor], className)} on:click {...$$restProps}>
  <slot>Button</slot>
</button>
