/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.mostcomputers.bg",
        pathname: "/upload/**",
      },
      {
        protocol: "http",
        hostname: "www.mostcomputers.bg",
        pathname: "/primotionupload/**",
      },
      {
        protocol: "http",
        hostname: "www.mostcomputers.bg",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
};

export default nextConfig;
