# bysking-pages

bysking 的个人主页 —— React + Vite + TypeScript，构建产物部署到 GitHub Pages。

线上地址：https://bysking.github.io/bysking-pages/

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:5173/bysking-pages/
pnpm build      # tsc -b && vite build && 生成 dist/404.html
pnpm preview    # 本地预览构建产物
pnpm lint
```

## 目录

```
.github/workflows/deploy.yml   流水线：构建 -> 上传 artifact -> 发布 Pages
scripts/spa-fallback.mjs       构建后把 dist/index.html 复制成 dist/404.html
vite.config.ts                 base 路径（GitHub Pages 子路径）
src/main.tsx                   BrowserRouter，basename 由 BASE_URL 推导
src/App.tsx                    布局 + 路由表
src/pages/                     Home / About / NotFound
src/components/Nav.tsx         导航
```

## 首次部署前必须做的一步

仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。

选默认的 "Deploy from a branch" 时，`deploy-pages` 找不到可用的 Pages 站点，流水线会在部署步骤失败（403 / artifact not found）。这一步只能手动点，代码里改不了。

之后推 `main` 就会自动部署，也可以在 Actions 页面点 `workflow_dispatch` 手动触发。

## 两个容易踩的点（代码里已处理）

1. **base 路径**。仓库名不是 `<user>.github.io` 时站点挂在 `/bysking-pages/` 子路径下。base 错了的表现是页面白屏、控制台里 `/assets/xxx.js` 404。流水线里 `configure-pages` 把真实 `base_path` 通过 `VITE_BASE_PATH` 传给 vite，所以改仓库名或绑定自定义域名都不用改代码。

2. **深链 404**。GitHub Pages 是纯静态托管，没有服务端 rewrite，访问 `/bysking-pages/about` 会去找真实文件。构建脚本把 `index.html` 复制成 `404.html`，Pages 用它在未知路径上兜底返回，前端路由接管后正常渲染。注意必须"构建后"复制：`public/404.html` 拿到的是构建前的 HTML，没有带 hash 的 script 标签，会白屏。
