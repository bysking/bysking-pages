import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * GitHub Pages 的部署路径。
 *
 * 仓库名不是 `<user>.github.io` 时站点挂在 `/<仓库名>/` 子路径下面，base 必须是该
 * 子路径，否则 dist 里引用的是 /assets/xxx.js，访问时 404、页面全白。
 *
 * 流水线里 configure-pages 会把真实的 base_path 通过 VITE_BASE_PATH 传进来，
 * 所以仓库改名、或绑定自定义域名（base_path 变空串）都不需要改这个文件。
 * 下面的默认值只用于本地 dev / build。
 */
const DEFAULT_BASE = '/bysking-pages/'

/**
 * 统一成 vite 要求的形态：前后都带斜杠；根路径为 '/'。
 *
 * 注意空串要归到 '/'：绑了自定义域名时 configure-pages 输出的 base_path 就是空串
 * （此时站点挂在根路径），把它当成"没传值"回退到默认子路径会导致所有资源 404。
 */
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
