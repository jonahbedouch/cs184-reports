//@ts-check
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 300,
      static: 600,
    },
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
  },
};

export default withPlaiceholder(nextConfig);
