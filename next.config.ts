import { env } from "./src/env";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
