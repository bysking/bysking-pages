# bysking-pages

bysking 的个人主页 —— React + Vite + TypeScript，构建产物部署到 GitHub Pages。

线上地址：https://bysking.github.io/

## 仓库命名要求（改名前先读）

GitHub Pages 的**根路径** `https://<user>.github.io/` 只能由名为 `<user>.github.io` 的仓库发布。
仓库叫别的名字（比如 `bysking-pages`）时，站点只能挂在 `/<仓库名>/` 子路径下。

所以这个仓库的最终名字必须是 **`bysking.github.io`**，站点才能落在根路径。
代码本身不依赖仓库名：`vite.config.ts` 从流水线传入的 `base_path` 推导 base，
仓库改名 / 绑自定义域名都不用改代码。

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:5173/
pnpm build      # tsc -b && vite build && 生成 dist/404.html
pnpm preview    # 本地预览构建产物
pnpm lint
```

## 一次性配置（只需做一次）

仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。

选默认的 "Deploy from a branch" 时，`deploy-pages` 找不到可用的 Pages 站点，
流水线会在发布步骤失败（403 / artifact not found）。这一步只能手动点，代码里改不了。

之后推 `main` 自动部署，也可以在 Actions 页面点 `Deploy to GitHub Pages → Run workflow` 手动触发。

## 目录

```
.github/workflows/deploy.yml   流水线：构建 -> 上传 artifact -> 发布 Pages
scripts/spa-fallback.mjs       构建后把 dist/index.html 复制成 dist/404.html
vite.config.ts                 base 由 VITE_BASE_PATH 决定，本地默认 '/'
src/main.tsx                   BrowserRouter，basename 由 BASE_URL 推导
src/App.tsx                    布局 + 路由表
src/pages/                     Home / About / NotFound
src/components/Nav.tsx         导航
```

## 两个容易踩的点（代码里已处理）

1. **根路径下的 basename**。根路径部署时 `BASE_URL` 是 `/`，去掉尾斜杠会得到**空串**，
   而空串不是合法 `basename`，会让所有路由都匹配不上（页面白屏）。`src/main.tsx:17`
   把空串转成 `undefined`，表示"没有 base 前缀"。

2. **深链 404**。GitHub Pages 是纯静态托管，没有服务端 rewrite，访问 `/about` 会去找真实文件。
   构建脚本把 `index.html` 复制成 `404.html`，Pages 用它在未知路径上兜底返回（HTTP 404 +
   前端接管渲染）。注意必须"构建后"复制：`public/404.html` 拿到的是构建前的 HTML，
   没有带 hash 的 script 标签，会白屏。
