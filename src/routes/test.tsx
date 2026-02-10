// src/routes/test.tsx
import { createFileRoute } from '@tanstack/react-router';
import { getItems } from '@/server/getItems';

export const Route = createFileRoute('/test')({
  loader: async () => {
    const items = await getItems();
    console.log('loader received:', items);
    return { items };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { items } = Route.useLoaderData();
  return (
    <div>
      <h1>Test</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
