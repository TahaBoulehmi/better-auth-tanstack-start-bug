import { createServerFn } from '@tanstack/react-start';
import { createMiddleware } from '@tanstack/react-start';

import { getRequestHeaders } from '@tanstack/react-start/server';

import { auth } from '@/server/auth';

const myMiddleware = createMiddleware().server(async (ctx) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  console.log('session:', !!session?.user);
  const member = await auth.api.getActiveMember({ headers });
  console.log('member:', !!member);
  return ctx.next({ context: { member } });
});

export const getItems = createServerFn({ method: 'POST' })
  .middleware([myMiddleware])
  .handler(async () => {
    return await [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ];
  });
