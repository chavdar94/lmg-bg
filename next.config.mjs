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
  },
};

export default nextConfig;
