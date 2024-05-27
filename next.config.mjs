/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "images.clerk.dev",
      "img.freepik.com",
      "uploadthing.com",
      "n4lth2-3000.csb.app",
      "*",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    config.module.rules.push({
      test: /\.(pdf)$/,
      type: "asset/resource",
    });
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
