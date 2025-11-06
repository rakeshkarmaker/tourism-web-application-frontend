import type { NextConfig } from "next";

const domain = process.env.DOMAIN_PRIVATE ||'localhost';
const nextConfig: NextConfig = {
  /* config options here */
  //
  images: {
    domains: [
      domain, // Add this line
      // Add other domains if needed (e.g., your production domain)
    ],
  },
};

export default nextConfig;
