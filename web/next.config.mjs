/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = withPWA({
    dest: 'public', // Service Workerとキャッシュファイルが出力される場所
    disable: isDev, // 開発中はPWAを無効化
})({
    images: {
        unoptimized: true,
    },
    output: 'export', // 静的出力のために 'export' を使用
    distDir: 'web/.next', // Next.js のビルドディレクトリ
    trailingSlash: true, // エクスポートに適した設定
    // 静的ファイルの出力先を変更する場合は、outDir を追加
    outdir: 'web/.vercel/output/static', // Vercel に期待される静的ファイルディレクトリ
});

export default nextConfig;