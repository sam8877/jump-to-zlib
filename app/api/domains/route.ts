import { NextResponse } from 'next/server';
import type { ZLibraryLink } from '@/app/config/links';

async function fetchWikipedia(): Promise<string> {
  const urls = [
    'https://zh.wikipedia.org/wiki/Z-Library',
    'https://en.wikipedia.org/wiki/Z-Library'
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        console.error(`维基百科请求失败: ${url}, 状态码: ${response.status}`);
        continue;
      }

      const html = await response.text();
      if (html.includes('Z-Library') && html.includes('z-library.')) {
        return html;
      }
    } catch (error) {
      console.error(`请求 ${url} 失败:`, error);
    }
  }

  throw new Error('所有维基百科源都无法访问');
}

export async function GET() {
  try {
    const html = await fetchWikipedia();
    
    // 使用更精确的正则表达式匹配域名
    const domainPattern = /(?:https?:\/\/)?(?:www\.)?(z-library\.[a-z]+)/gi;
    const matches = html.matchAll(domainPattern);
    const domains = Array.from(matches, m => m[1]?.toLowerCase() || '').filter(Boolean);
    const uniqueDomains = [...new Set(domains)];

    if (uniqueDomains.length === 0) {
      throw new Error('未找到有效的域名');
    }
    
    const links: ZLibraryLink[] = uniqueDomains.map(domain => ({
      name: "Z-Library 主域名",
      url: `https://${domain}`,
      description: "Z-Library 的主要域名（可能需要代理访问）"
    }));

    return NextResponse.json(
      { success: true, data: links },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('获取域名失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : '未知错误'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  }
} 