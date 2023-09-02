import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        port: "",
        pathname: "/f/172250/**",
      },
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false,
});

export default withBundleAnalyzer(nextConfig);
