/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    output: 'export', // 静的出力のために 'export' を使用
    trailingSlash: true, // エクスポートに適した設定
    // 静的ファイルの出力先を変更する場合は、outDir を追加
    outdir: 'web/.vercel/output/static', // Vercel に期待される静的ファイルディレクトリ
};

export default nextConfig;