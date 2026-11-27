import { Link } from 'react-router'

export default function NotFound() {
  return (
    <section className="page">
      <h1>404</h1>
      <p className="lead">这个路径没有对应的页面。</p>
      <Link to="/" className="nav-link">
        回到首页
      </Link>
    </section>
  )
}
