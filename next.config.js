/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用输出缓存以提高构建性能
  output: 'standalone',
  // 启用 Speed Insights
  experimental: {
    instrumentationHook: true
  }
}

module.exports = nextConfig 