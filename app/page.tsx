'use client';

import { useEffect, useState } from 'react';
import { texts, type ZLibraryLink } from './config/links';

interface DomainsResponse {
  success: boolean;
  data?: ZLibraryLink[];
  error?: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DomainsResponse>({
    success: false,
    error: '正在加载...'
  });

  useEffect(() => {
    async function fetchDomains() {
      try {
        const response = await fetch('/api/domains');
        if (!response.ok) {
          throw new Error(`请求失败: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('获取域名失败:', error);
        setData({
          success: false,
          error: '网络请求失败，请稍后重试'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDomains();
    const interval = setInterval(fetchDomains, 3600000); // 每小时更新一次
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {texts.title}
          </h1>
          <p className="text-lg text-gray-600">
            {texts.subtitle}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">加载中...</p>
            </div>
          ) : data.success && data.data ? (
            <div className="divide-y divide-gray-200">
              {data.data.map((link: ZLibraryLink, index: number) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {link.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {texts.visitButton}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-red-600 text-lg">
                {data.error || texts.error}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>{texts.disclaimer}</p>
          <p className="mt-2 text-sm">
            {texts.updateInterval}
          </p>
        </div>
      </div>
    </main>
  );
} 