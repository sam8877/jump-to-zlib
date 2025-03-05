export interface ZLibraryLink {
  name: string;
  url: string;
  description: string;
}

export const texts = {
  title: 'Z-Library 跳转链接',
  subtitle: '世界最大的电子书库和文章数据库',
  disclaimer: '声明：本网站仅提供信息性质的链接，不对内容负责。请遵守当地法律法规。',
  error: '获取域名失败，请稍后重试',
  updateInterval: '链接每小时自动更新一次',
  visitButton: '访问链接'
} as const;