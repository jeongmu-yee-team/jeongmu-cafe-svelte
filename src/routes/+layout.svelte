<script lang="ts">
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';

  import { browser } from '$app/environment';
  import '../app.css';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: false,
        refetchOnMount: 'always',
        retryDelay: 2000,
        refetchInterval: 10000,
        staleTime: 5000,
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
