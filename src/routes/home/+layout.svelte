<script lang="ts">
  import IntroModal from '$src/components/modals/IntroModal.svelte';
  import '@splidejs/svelte-splide/css/sea-green';

  let introModalToggle: boolean = false;
  function handleIntroModal() {
    introModalToggle = !introModalToggle;
  }
</script>

<main class="m-auto h-[100vh] font-cafe max-sm:w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
  <IntroModal modalStatus={introModalToggle} toggleModal={handleIntroModal} />
  <slot>Cafe Home</slot>
</main>
