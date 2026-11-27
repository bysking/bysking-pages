export default function Home() {
  return (
    <section className="page">
      <h1>bysking</h1>
      <p className="lead">前端 / 全栈，喜欢把东西拆开看它是怎么跑起来的。</p>
      <div className="cards">
        <a className="card" href="https://github.com/bysking" target="_blank" rel="noreferrer">
          <h2>GitHub</h2>
          <p>开源项目与实验</p>
        </a>
        <a className="card" href="https://github.com/bysking/bysking-pages" target="_blank" rel="noreferrer">
          <h2>本站源码</h2>
          <p>React + Vite + GitHub Pages</p>
        </a>
      </div>
    </section>
  )
}
