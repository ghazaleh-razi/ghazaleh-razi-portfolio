import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Keep agent instruction scaffolding out of this public portfolio repository.
  agentRules: false,
};

export default nextConfig;
