import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
