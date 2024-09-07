import withYaml from 'next-plugin-yaml';

/** @type {import('next').NextConfig} */
const nextConfig = withYaml({
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  experimental: {
    bundlePagesExternals: true,
    workerThreads: true,
    optimizeCss: true,
  },
});

export default nextConfig;
