import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1>Home</h1>
      <Link to='/test' preload={false}>
        Go to Test (client-side nav)
      </Link>
    </div>
  ),
});
