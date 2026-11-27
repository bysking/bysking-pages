import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * 站点地址由仓库名决定：
 *   - 仓库叫 bysking.github.io  → 站点在根路径，base = '/'
 *   - 仓库叫 <其它名字>          → 站点在 /<仓库名>/ 子路径，base = '/<仓库名>/'
 *
 * 所以 base 不写死，由流水线里 configure-pages 输出的真实 base_path 通过
 * VITE_BASE_PATH 传进来；本地 dev/build 走下面的 DEFAULT_BASE。
 * 这样仓库改名、或绑自定义域名（base_path 为空串）都不用改这里。
 *
 * 注意空串必须归到 '/'：绑自定义域名时 configure-pages 输出就是空串，说明站点
 * 在根路径；把它当成"没传值"而回退到子路径，会导致所有资源 404。
 */
const DEFAULT_BASE = '/'

function normalizeBase(raw: string | undefined): string {
  if (raw === undefined) return DEFAULT_BASE
  const trimmed = raw.replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

// https://vite.dev/config/
export default defineConfig({
  base: normalizeBase(process.env.VITE_BASE_PATH),
  plugins: [react()],
})
