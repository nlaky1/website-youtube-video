/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["flowbite.s3.amazonaws.com", "images.unsplash.com"],
  },
  // Security review 2026-10-14 (M4), modeled on smart_contracts/next.config.ts.
  // CSP is frame-ancestors only so GA / Stripe / fonts are unaffected. HSTS keeps the
  // current max-age without includeSubDomains until www.soluqube.com serves a valid cert (M3/L5).
  async headers() {
    return [
      // Removed 2026-10-29: page cited a sample (120+ contracts) with no data behind it.
      {
        source: "/benchmarks/asc-606-saas-audit-report",
        destination: "/blog/ssp-disclosure-study-public-saas-10k-2026",
        permanent: true,
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // SEO audit 2026-10-15 (M3): /book duplicated /book-demo with canonical -> home.
      {
        source: "/book",
        destination: "/book-demo",
        permanent: true,
      },
      {
        source: "/onboarding",
        destination: "https://app.soluqube.com/onboarding",
        permanent: true,
      },
      {
        source: "/client",
        destination: "https://client.soluqube.com/",
        permanent: true,
      },
      {
        source: "/login",
        destination: "https://app.soluqube.com/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
