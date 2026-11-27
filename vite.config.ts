import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * 站点挂在根路径 https://bysking.github.io/ 下，所以 base 恒为 '/'，
 * 产物里的资源是绝对路径 /assets/xxx.js。
 *
 * 注意「源码仓库名」与「站点 URL」在这里是脱钩的：源码仓库叫 bysking-pages，
 * 但 .github/workflows/deploy.yml 把构建产物推给 bysking.github.io 仓库，
 * 由那个仓库发布根路径。只有 bysking.github.io 这个特定名字能占用根路径。
 *
 * 若以后改挂到 /bysking-pages/ 子路径，必须同时改两处：这里 base，以及
 * deploy.yml 里的部署目标仓库。
 */
export default defineConfig({
  base: '/',
  plugins: [react()],
})
