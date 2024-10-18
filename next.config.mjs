/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
