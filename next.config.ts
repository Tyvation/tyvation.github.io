import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // 移除 assetPrefix，讓資源路徑自動對應當前域名
};

export default nextConfig;