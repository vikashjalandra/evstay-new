'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let locomotiveScroll: any;
    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            smoothWheel: true,
          },
        });
      } catch (e) {
        console.error('SmoothScroll error:', e);
      }
    })();

    return () => {
      if (locomotiveScroll) {
        try {
          locomotiveScroll.destroy();
        } catch (e) {}
      }
    };
  }, []);

  return <>{children}</>;
}
