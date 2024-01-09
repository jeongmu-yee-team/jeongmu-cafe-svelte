<script lang="ts">
  import CoffeeItemCard from "./CoffeeItemCard.svelte";
  import AdeItemCard from "./AdeItemCard.svelte";
  import SmoothieItemCard from "./SmoothieItemCard.svelte";
  import DessertItemCard from "./DessertItemCard.svelte";

  let active: string = "커피";

  function handleItemClick(category: string) {
    active = category;
  }

  function handleItemKeyDown(event: KeyboardEvent, category: string) {
    if (event.key === "Enter" || event.key === " ") {
      handleItemClick(category);
    }
  }
</script>

<div class="md:container md:mx-auto p-4">
  <div class="banner p-4 text-center bg-yellow-400 text-black fixed left-0 top-0 w-full overflow-y-hidden z-10">
    JungmuCafe
  </div>

  <div class="tab-bar bg-yellow-400 text-black w-full fixed left-0 top-10 z-10">
    <div class="flex justify-around justify-items-center">
      <div
        role="button"
        class="text-lg font-semibold cursor-pointer p-2 hover:bg-blue-300"
        on:click={() => (active = "커피")}
        on:keydown={(e) => handleItemKeyDown(e, "커피")}
        tabindex="0"
      >
        커피
      </div>
      <div
        role="button"
        class="text-lg font-semibold cursor-pointer p-2 hover:bg-blue-300"
        on:click={() => (active = "에이드")}
        on:keydown={(e) => handleItemKeyDown(e, "에이드")}
        tabindex="0"
      >
        에이드
      </div>
      <div
        role="button"
        class="text-lg font-semibold cursor-pointer p-2 hover:bg-blue-300"
        on:click={() => (active = "스무디")}
        on:keydown={(e) => handleItemKeyDown(e, "스무디")}
        tabindex="0"
      >
        스무디
      </div>
      <div
        role="button"
        class="text-lg font-semibold cursor-pointer p-2 hover:bg-blue-300"
        on:click={() => (active = "디저트")}
        on:keydown={(e) => handleItemKeyDown(e, "디저트")}
        tabindex="0"
      >
        디저트
      </div>
    </div>
  </div>

  <div class="text-center flex justify-around justify-items-center">
    <div class="md:container md:mx-auto p-4 flex flex-wrap gap-4">
      {#if active === "커피"}
        <div class="flex flex-col h-full">
          <div class="flex flex-wrap gap-4">
            <CoffeeItemCard />
          </div>
        </div>
      {:else if active === "에이드"}
        <div class="flex flex-col h-full">
          <div class="flex flex-wrap gap-4">
            <AdeItemCard />
          </div>
        </div>
      {:else if active === "스무디"}
        <div class="flex flex-col h-full">
          <div class="flex flex-wrap gap-4">
            <SmoothieItemCard />
          </div>
        </div>
      {:else if active === "디저트"}
        <div class="flex flex-col h-full">
          <div class="flex flex-wrap gap-4">
            <DessertItemCard />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
