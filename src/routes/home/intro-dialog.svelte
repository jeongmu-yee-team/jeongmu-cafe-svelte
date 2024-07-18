<script lang="ts">
  import IntroImage from '$assets/no-image.png';
  export let toggleDialog: () => void;
  export let dialogStatus: boolean;
</script>

<button
  class="absolute inset-0 left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-500 disabled:hidden"
  disabled={dialogStatus}
  on:click={toggleDialog}
>
  <img alt="IntroImage" src={IntroImage} />
</button>
