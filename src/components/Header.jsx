import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Ticket } from 'lucide-react'

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="SAINYX home">
        <span className="wordmark-symbol">S<span>.</span></span>
        <span>SAINYX</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLink to="/" end>Discover</NavLink>
        <a href="/#categories">Categories</a>
        <NavLink to="/my-events">My events</NavLink>
      </nav>
      <Link className="header-cta" to="/#events">
        Find your event <ArrowUpRight size={15} />
      </Link>
      <Link className="mobile-ticket" to="/my-events" aria-label="My events"><Ticket size={19}/></Link>
    </header>
  )
}
