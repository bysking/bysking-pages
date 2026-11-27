export default function About() {
  return (
    <section className="page">
      <h1>关于</h1>
      <p className="lead">这个页面用来占位，验证多路由与深链回退是否正常工作。</p>
      <p>
        构建完成后 <code>dist/404.html</code> 是 <code>index.html</code> 的副本，GitHub Pages
        遇到不存在的路径会返回它，前端路由接管后就能渲染正确的页面。
      </p>
    </section>
  )
}
