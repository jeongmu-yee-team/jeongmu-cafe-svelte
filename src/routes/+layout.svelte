<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  import { browser } from '$app/environment';

  import '$src/app.css';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <slot>No Contents</slot>
  </main>
</QueryClientProvider>
