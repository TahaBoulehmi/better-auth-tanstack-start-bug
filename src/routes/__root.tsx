import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';

import appCss from '../styles.css?url';

import { queryOptions, type QueryClient } from '@tanstack/react-query';
import { getItems } from '@/server/getItems';

export const rootQueryOptions = () =>
  queryOptions({
    queryKey: ['root-data'],
    queryFn: () => getItems(),
  });

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  // beforeLoad: async ({ context }) => {
  //   const data = await context.queryClient.fetchQuery(rootQueryOptions());
  //   context.queryClient.setQueryData(['root-data'], data);
  //   return { items: data };
  // },
  // loader: async ({ context }) => {
  //   return { items: context.items };
  // },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <Scripts />
      </body>
    </html>
  );
}
