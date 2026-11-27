/**
 * GitHub Pages 没有服务端 rewrite：任何不存在的路径都直接 404。
 * 这里把 index.html 复制成 404.html，Pages 在遇到未知路径时返回它，
 * 浏览器拿到 index.html 的副本后由前端路由接管，深链（/about 等）才能正常渲染。
 *
 * 为什么不放 public/404.html：public 里是构建前就复制的静态副本，
 * 拿不到构建后真实带 hash 的 script 标签，会导致 404 页白屏。必须构建后再复制。
 */
import { copyFile } from 'node:fs/promises'
import path from 'node:path'

const dist = path.resolve(import.meta.dirname, '../dist')
const from = path.join(dist, 'index.html')
const to = path.join(dist, '404.html')

await copyFile(from, to)
console.log('[spa-fallback] dist/index.html -> dist/404.html')
