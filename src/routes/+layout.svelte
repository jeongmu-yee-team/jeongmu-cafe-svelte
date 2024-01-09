<script lang="ts">
  import { createDefaultSWR } from 'sswr';
  import '$src/app.css';

  const options = {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
    focusThrottleInterval: 10000,
  };
  createDefaultSWR(options);
</script>

<main class="font-cafe">
  <slot>No Contents</slot>
</main>
