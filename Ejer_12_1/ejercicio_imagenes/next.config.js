/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.filebase.io' },
      { protocol: 'https', hostname: 's3.filebase.io' }
    ],
  },
};

export default nextConfig;