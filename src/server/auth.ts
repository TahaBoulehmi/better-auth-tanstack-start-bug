import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { organization } from 'better-auth/plugins';
import { prisma } from '@/server/db';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const slug = 'my-workspace-' + user.id;
          await auth.api.createOrganization({
            body: { name: 'My Workspace', slug, userId: user.id },
          });
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: '1234567890',
      clientSecret: '1234567890',
    },
  },
  plugins: [
    organization({
      organizationLimit: 1,
      organizationHooks: {
        beforeUpdateOrganization: async () => {
          throw new Error(
            'Nice try! But you cannot change this organisation ;)',
          );
        },
      },
    }),

    tanstackStartCookies(),
  ], // make sure tanstackStartCookies is the last plugin in the array
});
