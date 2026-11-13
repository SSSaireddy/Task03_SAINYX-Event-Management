import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import MyEvents from './pages/MyEvents'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop/>
      <div className="site-shell">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/event/:id" element={<EventDetails/>}/>
          <Route path="/my-events" element={<MyEvents/>}/>
          <Route path="*" element={<main className="not-found"><h1>404 / WRONG TURN.</h1><a href="/">Back home ↗</a></main>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}
