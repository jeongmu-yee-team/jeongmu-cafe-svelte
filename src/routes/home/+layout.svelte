<script lang="ts">
  import IntroDialog from '$routes/home/intro-dialog.svelte';
  import '@splidejs/svelte-splide/css/sea-green';

  let introDialogToggle: boolean = false;
  function handleIntroDialog() {
    introDialogToggle = !introDialogToggle;
  }
</script>

<main class="m-auto h-[100vh] font-cafe max-sm:w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
  <IntroDialog dialogStatus={introDialogToggle} toggleDialog={handleIntroDialog} />
  <slot>Cafe Home</slot>
</main>
