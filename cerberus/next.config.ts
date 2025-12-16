import path from "path";
import type { NextConfig } from "next";

// Ensure Turbopack / Next uses this directory as the workspace root.
// This removes ambiguity when there are multiple lockfiles in the repo
// (for example a parent folder with a package-lock.json). It helps
// avoid 'Next.js inferred your workspace root' warnings and makes
// CI/deploys deterministic.
const nextConfig: NextConfig = {
  // Explicitly point Turbopack to the current directory as the project root
  turbopack: {
    // Use absolute path for reliability in different environments
    root: path.resolve(__dirname),
  },

  // When Next bundles server output tracing, ensure tracing root is
  // the app directory so outputFileTracing doesn't walk up to the repo root.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
