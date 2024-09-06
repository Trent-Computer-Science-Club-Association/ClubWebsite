import withYaml from 'next-plugin-yaml';

/** @type {import('next').NextConfig} */
const nextConfig = withYaml({
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  optimizeFonts: true,
  // output: 'export',
  experimental: {
    workerThreads: true,
    optimizeCss: true,
  },
});

export default nextConfig;
