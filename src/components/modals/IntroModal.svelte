<script lang="ts">
  import IntroImage from '$assets/no-image.png';
  export let toggleModal: () => void;
  export let modalStatus: boolean;
</script>

<button
  on:click={toggleModal}
  disabled={modalStatus}
  class=" absolute flex h-[100vh] w-full items-center justify-center bg-gray-500 disabled:hidden"
>
  <img src={IntroImage} alt="IntroImage" />
</button>
