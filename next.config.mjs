/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  optimizeFonts: true,
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
