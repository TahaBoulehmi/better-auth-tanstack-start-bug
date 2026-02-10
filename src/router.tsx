import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

export function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultPendingMs: 500, // Show pending after 500ms
    defaultPendingMinMs: 1000, // Show pending for at least 1000ms
    scrollRestoration: true,
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
