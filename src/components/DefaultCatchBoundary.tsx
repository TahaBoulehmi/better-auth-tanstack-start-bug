import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router';
import type { ErrorComponentProps } from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error('DefaultCatchBoundary Error:', error);

  return (
    <div className='min-h-screen bg-[#0B1221] text-white flex flex-col w-full'>
      <div className='flex-1 flex items-center justify-center'>
        <div className='container mx-auto px-6 py-20'>
          <div className='max-w-2xl mx-auto text-center'>
            {/* Error Visual */}
            <div className='relative mb-12'>
              <div className='text-[180px] md:text-[240px] font-bold text-[#EF4444]/10 leading-none select-none'>
                !
              </div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-24 h-24 md:w-32 md:h-32 bg-[#111A2E] border border-[#EF4444]/20 rounded-2xl flex items-center justify-center shadow-2xl'></div>
              </div>
            </div>

            {/* Content */}
            <div className='space-y-6 mb-12'>
              <h1 className='text-4xl md:text-5xl font-bold'>
                Something Went Wrong
              </h1>
              <div className='bg-[#111A2E] border border-white/10 rounded-xl p-6 text-left'>
                <ErrorComponent error={error} />
              </div>
              <p className='text-xl text-white/70 max-w-lg mx-auto'>
                We encountered an unexpected error. Don't worry, your data is
                safe. Try refreshing the page or go back to continue.
              </p>
            </div>

            {/* Actions */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button
                onClick={() => {
                  router.invalidate();
                }}
                className='w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-hover rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer link-button'
              >
                Try Again
              </button>
              {isRoot ? (
                <Link
                  to='/'
                  className='w-full sm:w-auto px-6 py-3 bg-[#111A2E] hover:bg-[#0F1830] border border-white/10 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer'
                >
                  Go Home
                </Link>
              ) : (
                <button
                  onClick={() => window.history.back()}
                  className='w-full sm:w-auto px-6 py-3 bg-[#111A2E] hover:bg-[#0F1830] border border-white/10 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer'
                >
                  Go Back
                </button>
              )}
            </div>

            {/* Helpful Links */}
            <div className='mt-16 pt-8 border-t border-white/10'>
              <p className='text-white/60 mb-4'>Quick Links</p>
              <div className='flex flex-wrap items-center justify-center gap-4'>
                <Link
                  to='/'
                  className='text-primary hover:text-primary-hover transition-colors'
                >
                  My Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
