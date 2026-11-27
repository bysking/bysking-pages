# bysking-pages

bysking 的个人主页 —— React + Vite + TypeScript，构建产物发布到 GitHub Pages 根路径。

线上地址：https://bysking.github.io/

## 部署结构（容易误解，先看这里）

源码仓库是 `bysking-pages`，但**站点由另一个仓库 `bysking.github.io` 发布**。

GitHub 的规则：根路径 `https://<user>.github.io/` 只能由名为 `<user>.github.io` 的仓库占用，
仓库叫 `bysking-pages` 的话只能挂在 `/bysking-pages/` 子路径下。所以流水线采用跨仓库推送：
`bysking-pages` 构建 → 把 `dist/` force-push 到 `bysking.github.io` 的 `master` 分支 → 推送即发布。

因此 `bysking.github.io` 是纯产物仓库（每次部署只有一次提交，没有源码），不要直接在里面改东西。

## 首次部署前必须做的两件事

1. **建 PAT**：GitHub → Settings → Developer settings → Personal access tokens →
   选 `repo` 权限（细粒度 token 则给 `bysking.github.io` 仓库的 Contents: Read and write），
   然后把 token 存到 `bysking-pages` 仓库的 Secret，名字必须是 **`PAGES_DEPLOY_TOKEN`**。
   （内置的 `GITHUB_TOKEN` 无权写入其它仓库，只能用 PAT。）

2. **确认 `bysking.github.io` 的发布源**：Settings → Pages → Build and deployment →
   Source 选 **Deploy from a branch**，分支 `master`、目录 `/ (root)`。
   （不要选 GitHub Actions，否则会跟本流水线抢着发布。）

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:5173/
pnpm build      # tsc -b && vite build && 生成 dist/404.html
pnpm preview    # 本地预览构建产物
pnpm lint
```

## 目录

```
.github/workflows/deploy.yml   流水线：构建 -> force-push dist 到 bysking.github.io
scripts/spa-fallback.mjs       构建后把 dist/index.html 复制成 dist/404.html
vite.config.ts                 base = '/'（根路径部署）
src/main.tsx                   BrowserRouter，basename 由 BASE_URL 推导（根路径时为 undefined）
src/App.tsx                    布局 + 路由表
src/pages/                     Home / About / NotFound
src/components/Nav.tsx         导航
```

## 两个容易踩的点（代码里已处理）

1. **根路径下的 basename**。`BASE_URL` 在根路径部署时是 `/`，去掉尾斜杠会得到**空串**，
   而空串不是合法 `basename`，会让所有路由都匹配不上（页面白屏）。`src/main.tsx:15`
   把空串转成 `undefined`，表示"没有 base 前缀"。

2. **深链 404**。GitHub Pages 是纯静态托管，没有服务端 rewrite，访问 `/about` 会去找真实文件。
   构建脚本把 `index.html` 复制成 `404.html`，Pages 用它在未知路径上兜底返回（HTTP 404 +
   前端接管渲染）。注意必须"构建后"复制：`public/404.html` 拿到的是构建前的 HTML，
   没有带 hash 的 script 标签，会白屏。

