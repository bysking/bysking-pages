import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

/**
 * basename 直接从 Vite 的 BASE_URL 推导，避免 vite.config.ts 的 base 和路由
 * 各写一份、改一处忘另一处（漏改的后果是部署后深链 404 / 白屏）。
 * BASE_URL 形如 '/bysking-pages/'，去掉尾斜杠才是合法 basename。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
