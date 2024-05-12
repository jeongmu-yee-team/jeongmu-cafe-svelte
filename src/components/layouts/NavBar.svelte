<script lang="ts">
  import type { TProductType } from '$lib/server/modules/products';

  export let navProductsData: TProductType | undefined;
  export let navProductTypeId: number;
  export let handleTypeChange: (id: number) => void;
</script>

<nav>
  {#if navProductsData}
    <div class="m-1 flex h-14 justify-around rounded-lg bg-yellow-200">
      {#each navProductsData as item}
        <button on:click={() => handleTypeChange(item.id)} class="text-xl font-bold">
          <div class={`${navProductTypeId === item.id && 'scale-110 border-b-4 border-black duration-200'}`}>
            {item.type_name}
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <p>Menu Loading</p>
  {/if}
</nav>
