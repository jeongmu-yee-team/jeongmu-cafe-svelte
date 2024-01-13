<script lang="ts">
  import IntroModal from '$components/modals/IntroModal.svelte';
  import NavBar from '$components/layouts/NavBar.svelte';

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
  <NavBar />
</main>
