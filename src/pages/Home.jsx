import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, events } from '../data/events'
import EventCard from '../components/EventCard'

export default function Home() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('soonest')

  const filtered = useMemo(() => {
    let list = events.filter(event => {
      const matchesCategory = category === 'All' || event.category === category
      const searchText = `${event.shortTitle} ${event.category} ${event.city} ${event.venue}`.toLowerCase()
      return matchesCategory && searchText.includes(query.toLowerCase().trim())
    })
    if (sort === 'price-low') list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'price-high') list = [...list].sort((a,b) => b.price - a.price)
    if (sort === 'soonest') list = [...list].sort((a,b) => a.date.localeCompare(b.date))
    return list
  }, [category, query, sort])

  const featured = events[0]

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-kicker"><span className="live-dot"/> THE CITY IS YOURS. GO MAKE A MOMENT.</div>
          <div className="hero-heading-wrap">
            <h1>DON'T JUST<br/><span>BE THERE.</span><i> FEEL IT.</i></h1>
            <div className="hero-side-note">
              <span className="eyebrow">A DIFFERENT KIND OF<br/>EVENT DISCOVERY</span>
              <p>Good things happen when you get out there. Find your people, your sound, your next story.</p>
              <a href="#events" className="round-scroll"><ArrowDown size={18}/></a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>CURATED EXPERIENCES / 2026—27</span>
            <span>INDEPENDENTLY FOUND. UNFORGETTABLE TOGETHER.</span>
          </div>
        </section>

        <section className="feature-section">
          <div className="section-label"><span>01 / THE HEADLINER</span><span>DON'T MISS THIS ONE</span></div>
          <div className="feature-card">
            <div className="feature-image">
              <img src={featured.image} alt="Crowd enjoying a live music event"/>
              <span className="feature-image-label">SAINYX SELECTS — NO. 001</span>
            </div>
            <div className="feature-content">
              <div className="feature-topline"><span>{featured.dateLabel}</span><span>✳ {featured.category}</span></div>
              <h2>AFTER<br/><em>GLOW.</em></h2>
              <p>{featured.description}</p>
              <div className="feature-details"><span>{featured.venue}</span><strong>{featured.priceLabel} <small>/ ENTRY</small></strong></div>
              <Link to={`/event/${featured.id}`} className="pill-link">Get into it <ArrowUpRight size={17}/></Link>
              <span className="feature-serial">SX—001</span>
            </div>
          </div>
        </section>

        <section className="events-section" id="events">
          <div className="events-heading">
            <div><span className="eyebrow">02 / THE LINE-UP</span><h2>MAKE A<br/><em>DATE.</em></h2></div>
            <p>From loud nights to slow mornings.<br/>Pick what moves you.</p>
          </div>
          <div className="filter-bar" id="categories">
            <div className="category-list" role="group" aria-label="Filter by category">
              {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`filter-chip ${category === item ? 'active' : ''}`}>{item}</button>)}
            </div>
            <div className="filter-tools">
              <label className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find your thing..." aria-label="Search events"/></label>
              <label className="sort-box"><SlidersHorizontal size={15}/><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort events"><option value="soonest">Soonest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
            </div>
          </div>
          <div className="results-line"><span>{String(filtered.length).padStart(2,'0')} EXPERIENCES FOUND</span><span>SCROLL TO EXPLORE ↓</span></div>
          {filtered.length ? <div className="event-grid">{filtered.map(event => <EventCard key={event.id} event={event}/>)}</div> : (
            <div className="empty-state"><Sparkles size={25}/><h3>Nothing on this frequency.</h3><p>Try another search or category.</p><button className="text-button" onClick={() => {setQuery('');setCategory('All')}}>Reset filters ↗</button></div>
          )}
        </section>
        <section className="manifesto">
          <span className="eyebrow">03 / OUR POINT OF VIEW</span>
          <p>THE BEST PLANS<br/>ARE THE ONES <em>YOU</em><br/>HAVEN'T MADE <span>YET.</span></p>
          <span className="manifesto-mark">S<span>.</span></span>
        </section>
      </main>
    </>
  )
}
