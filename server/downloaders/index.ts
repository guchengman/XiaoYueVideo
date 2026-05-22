import type { handleDownload as Handler } from './default'

const registry: Record<string, () => Promise<{ handleDownload: typeof Handler }>> = {
  douyin: () => import('./douyin'),
  bilibili: () => import('./bilibili'),
  tiktok: () => import('./tiktok'),
}

const defaultLoader = () => import('./default')

export async function getHandler(host: string): Promise<{ handleDownload: typeof Handler }> {
  const loader = registry[host] || defaultLoader
  return loader()
}
