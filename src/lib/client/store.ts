import { writable } from 'svelte/store';

export const selectedProductTypeId = writable<number>(-1);
