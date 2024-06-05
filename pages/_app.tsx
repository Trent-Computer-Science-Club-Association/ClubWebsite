// Styles
import '@/styles/globals.scss';
// Vitals
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
// Types
import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Next Speed Vitals */}
      <SpeedInsights />
      <Analytics />
      {/* Page Body */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
