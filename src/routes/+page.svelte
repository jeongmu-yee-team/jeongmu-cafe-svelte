<script lang="ts">
  import IntroModal from '$components/modals/IntroModal.svelte';
  import NavBar from '$components/layouts/NavBar.svelte';
  import Menu from '$components/layouts/Menu.svelte';

  let introModalToggle: boolean = false;
  function handleIntroModal() {
    introModalToggle = !introModalToggle;
  }
</script>

<svelte:head>
  <title>Intro</title>
</svelte:head>

<main class="font-cafe">
  <IntroModal toggleModal={handleIntroModal} modalStatus={introModalToggle} />
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <NavBar />
      <Menu />
    </div>
  </div>
</main>
