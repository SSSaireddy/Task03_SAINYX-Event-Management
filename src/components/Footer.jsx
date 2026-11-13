import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-wordmark">SAINYX<span>®</span></div>
          <p>Find the moments worth<br/>showing up for.</p>
        </div>
        <div className="footer-right">
          <span className="eyebrow">YOUR NEXT STORY STARTS HERE</span>
          <Link to="/#events" className="footer-link">Explore events <ArrowUpRight size={17}/></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SAINYX STUDIO</span>
        <span>MADE FOR THE OUT THERE.</span>
        <a href="mailto:hello@sainyx.example">SAY HELLO ↗</a>
      </div>
    </footer>
  )
}
