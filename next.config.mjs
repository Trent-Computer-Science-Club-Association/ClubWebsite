/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  output: 'export',
  experimental: {
    workerThreads: true,
    optimizeCss: true,
  }
};

export default nextConfig;
