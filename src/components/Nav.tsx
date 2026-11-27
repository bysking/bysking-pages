import { NavLink } from 'react-router'

const links = [
  { to: '/', label: '首页', end: true },
  { to: '/about', label: '关于', end: false },
]

export default function Nav() {
  return (
    <nav className="nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
