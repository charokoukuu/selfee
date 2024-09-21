/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    output: 'standalone',
    distDir: 'web/.next',
};

export default nextConfig;
