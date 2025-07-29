import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  assetPrefix: isProd
    ? 'https://tyvation.github.io/'
    : undefined
};

export default nextConfig;
