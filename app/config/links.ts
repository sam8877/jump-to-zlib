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

export const zLibraryLinks: ZLibraryLink[] = [
  {
    name: "Z-Library 主域名",
    url: "https://z-lib.org",
    description: "Z-Library 的主要域名（可能需要代理访问）"
  },
  {
    name: "Z-Library Tor 地址",
    url: "http://zlibrary24tuxziyiyfr7zd46ytefdqbqd2axkmxm4o5374ptpc52fad.onion",
    description: "通过 Tor 网络访问（需要 Tor 浏览器）"
  },
  {
    name: "Z-Library I2P 地址",
    url: "http://library.i2p",
    description: "通过 I2P 网络访问（需要 I2P 客户端）"
  }
]; 