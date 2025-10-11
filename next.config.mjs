/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/notification",
      "@mantine/charts",
      "@mantine/dates",
    ],
  },
};

export default nextConfig;
