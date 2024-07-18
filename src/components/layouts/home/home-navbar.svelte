<script lang="ts">
  import type { TReadAllProductType } from '$lib/server/modules/products';

  export let productTypeList: TReadAllProductType;
  export let selectedType: number;
  export let onClickTypeChange: (typeId: number) => void;
</script>

<nav class="w-full">
  {#if productTypeList}
    <div class="m-1 flex h-14 justify-around rounded-lg bg-yellow-200">
      {#each productTypeList as productType}
        <button class="whitespace-nowrap text-xl font-bold" on:click={() => onClickTypeChange(productType.id)}>
          <div class={`${selectedType === productType.id && 'scale-110 border-b-4 border-black duration-200'}`}>
            {productType.type_name}
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <p>Menu Loading</p>
  {/if}
</nav>
