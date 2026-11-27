import { Link, Route, Routes } from 'react-router'
import About from './pages/About.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import Nav from './components/Nav.tsx'

// 提到模块作用域：组件渲染期间调 new Date() 会被 React Compiler 判为 impure
const YEAR = new Date().getFullYear()

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="brand">
          bysking
        </Link>
        <Nav />
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* 404 兜底：必须放在最后，否则会吞掉后面的路由 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>© {YEAR} bysking</span>
        <a href="https://github.com/bysking" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  )
}
