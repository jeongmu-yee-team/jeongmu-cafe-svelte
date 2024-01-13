<script lang="ts">
  import { createDefaultSWR } from 'sswr';

  const options = {
    fetcher: (url: string) => fetch(url).then((res) => res.json()),
    focusThrottleInterval: 3000,
  };
  createDefaultSWR(options);
</script>

<div class="font-admin">
  <slot>Admin Contents</slot>
</div>
