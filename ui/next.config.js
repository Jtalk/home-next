import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false,
});

export default withBundleAnalyzer(nextConfig);
