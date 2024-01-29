<script lang="ts">
  import IntroModal from '$components/modals/IntroModal.svelte';
  import NavBar from '$components/layouts/NavBar.svelte';
  import Menu from '$src/components/layouts/Menu.svelte';

  let introModalToggle: boolean = false;
  function handleIntroModal() {
    introModalToggle = !introModalToggle;
  }
</script>

<!-- 키오스크 화면 임의로 조정 실제 키오스크에서 사용시 style삭제 -->
<style>
  main {
    width: 768px;
    max-width: 100%;
    height: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<svelte:head>
  <title>Intro</title>
</svelte:head>

<main class="border-black-500 relative border-4 font-cafe">
  <IntroModal toggleModal={handleIntroModal} modalStatus={introModalToggle} />
  <div class="mx-auto justify-center">
    <NavBar />
    <Menu />
  </div>
</main>
