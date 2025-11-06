import type { NextConfig } from "next";
import {domain} from "./src/app/lib/constant";
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
