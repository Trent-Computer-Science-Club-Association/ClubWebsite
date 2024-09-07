import Head from 'next/head';
// Components
import ErrorLayout from '../layouts/Error';
import { website_config } from '../config';

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title key='title'>{`404 | ${website_config.meta.title}`}</title>
      </Head>
      <ErrorLayout>
        <p>
          404 - Page not found <br />
          This page may be in development or may not exist at this time
        </p>
      </ErrorLayout>
    </>
  );
}
