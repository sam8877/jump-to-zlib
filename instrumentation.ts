export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 在服务器端初始化 Speed Insights
    require('@vercel/speed-insights');
  }
} 