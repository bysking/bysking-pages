import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

/**
 * basename 从 Vite 的 BASE_URL 推导，避免 vite.config.ts 的 base 和路由各写一份、
 * 改一处忘另一处（漏改的后果是部署后深链 404 / 白屏）。
 *
 * 根路径部署时 BASE_URL 是 '/'，去掉尾斜杠会得到空串；空串不是合法 basename，
 * 会让所有路由都匹配不上，所以必须转成 undefined（表示"没有 base 前缀"）。
 */
const rawBase = import.meta.env.BASE_URL.replace(/\/$/, '')
const basename = rawBase === '' ? undefined : rawBase

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
