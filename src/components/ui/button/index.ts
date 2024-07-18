/* eslint-disable max-len */
import { type VariantProps, tv } from 'tailwind-variants';

import Root from './button.svelte';

import type { Button as ButtonPrimitive } from 'bits-ui';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[.97] disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
    color: {
      default: '',
      black: 'bg-black hover:bg-black/90',
      red: 'bg-[#FF0000] hover:bg-[#FF0000]/90',
      green: 'bg-[#008000] hover:bg-[#008000]/90',
      lightgreen: 'bg-[#90EE90] hover:bg-[#90EE90]/90',
      blue: 'bg-[#0000FF] hover:bg-[#0000FF]/90',
      yellow: 'bg-[#FFFF00] hover:bg-[#FFFF00]/90',
      fuchsia: 'bg-[#FF00FF] hover:bg-[#FF00FF]/90',
      cyan: 'bg-[#00FFFF] hover:bg-[#00FFFF]/90',
      orange: 'bg-[#FFA500] hover:bg-[#FFA500]/90',
      gray: 'bg-[#808080] hover:bg-[#808080]/90',
    },
    textcolor: {
      default: '',
      black: 'text-black',
      white: 'text-white',
      red: 'text-[#FF0000]',
      green: 'text-[#00FF00]',
      blue: 'text-[#0000FF]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    color: 'default',
    textcolor: 'default',
  },
});

type Variant = VariantProps<typeof buttonVariants>['variant'];
type Size = VariantProps<typeof buttonVariants>['size'];
type Color = VariantProps<typeof buttonVariants>['color'];
type TextColor = VariantProps<typeof buttonVariants>['textcolor'];

type Props = ButtonPrimitive.Props & {
  variant?: Variant;
  size?: Size;
  color?: Color;
  textcolor?: TextColor;
};

type Events = ButtonPrimitive.Events;

export {
  Root,
  type Props,
  type Events,
  //
  Root as Button,
  type Props as ButtonProps,
  type Events as ButtonEvents,
  buttonVariants,
};
