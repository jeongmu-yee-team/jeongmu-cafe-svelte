<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';

  import { browser } from '$app/environment';
  import '$src/app.css';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchInterval: 5000,
        staleTime: 10000,
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
