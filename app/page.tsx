import { texts, type ZLibraryLink } from './config/links';

export const revalidate = 3600; // 每小时重新验证一次

async function getDomains(): Promise<{ success: boolean; data?: ZLibraryLink[]; error?: string }> {
  try {
    // 使用相对协议的完整 URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/domains`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('获取域名失败:', error);
    return { success: false, error: '网络请求失败，请稍后重试' };
  }
}

export default async function Home() {
  const { success, data: links, error } = await getDomains();

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
          {success && links ? (
            <div className="divide-y divide-gray-200">
              {links.map((link: ZLibraryLink, index: number) => (
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
                {error || texts.error}
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