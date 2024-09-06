import Head from 'next/head';
import { website_config } from '../config';
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
      {/* Default Head */}
      <Head>
        <title key='title'>{website_config.meta.title}</title>
        <meta
          name='description'
          content={website_config.meta.description}
          key='desc'
        ></meta>
      </Head>
      {/* Next Speed Vitals */}
      <SpeedInsights />
      <Analytics />
      {/* Page Body */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
