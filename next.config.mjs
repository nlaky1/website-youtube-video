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
  async redirects() {
    return [
      {
        source: "/onboarding",
        destination: "https://app.soluqube.com/onboarding",
        permanent: false,
      },
      {
        source: "/client",
        destination: "https://app.soluqube.com/client",
        permanent: false,
      },
      {
        source: "/login",
        destination: "https://app.soluqube.com/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
