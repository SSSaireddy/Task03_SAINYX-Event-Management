import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin, Ticket } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { events } from '../data/events'
import { saveRegistration } from '../utils/storage'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = events.find(item => item.id === id)
  const [form, setForm] = useState({ name: '', email: '', phone: '', tickets: '1' })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  if (!event) return <main className="not-found"><h1>EVENT NOT FOUND.</h1><Link to="/">Back to discovery ↗</Link></main>

  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please complete all fields before continuing.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Enter a valid email address.')
      return
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone)) {
      setError('Enter a valid phone number (8–15 digits).')
      return
    }
    const registration = {
      registrationId: `SX-${Date.now().toString().slice(-8)}`,
      eventId: event.id,
      eventTitle: event.shortTitle,
      eventDate: event.dateLabel,
      eventVenue: event.venue,
      eventImage: event.image,
      price: event.price,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      tickets: Number(form.tickets),
      total: event.price * Number(form.tickets),
      registeredAt: new Date().toISOString(),
    }
    saveRegistration(registration)
    setError('')
    setDone(true)
  }

  return (
    <main className="detail-page">
      <Link to="/" className="back-link"><ArrowLeft size={15}/> BACK TO DISCOVER</Link>
      <div className="detail-hero">
        <img src={event.image} alt=""/>
        <div className="detail-hero-overlay"/>
        <div className="detail-hero-copy"><span className="eyebrow">{event.number} / SAINYX SELECTS — {event.category.toUpperCase()}</span><h1>{event.title.split('\n').map((line,i)=><span key={i}>{line}<br/></span>)}</h1><span className="detail-tag">{event.tag}</span></div>
      </div>
      <div className="detail-layout">
        <section className="detail-info">
          <span className="eyebrow">THE EXPERIENCE</span>
          <h2>SHOW UP.<br/><em>BE PRESENT.</em></h2>
          <p className="detail-description">{event.description}</p>
          <div className="detail-facts">
            <div><CalendarDays/><span>DATE</span><strong>{event.dateLabel}</strong></div>
            <div><Clock3/><span>TIME</span><strong>{event.time}</strong></div>
            <div><MapPin/><span>WHERE</span><strong>{event.venue}</strong></div>
          </div>
          <div className="detail-note"><span>GOOD TO KNOW</span><p>Arrive a little early. Keep your confirmation handy at entry. Tickets are subject to venue capacity.</p></div>
        </section>
        <aside className="booking-panel" id="register">
          {done ? (
            <div className="success-panel">
              <div className="success-icon">✓</div><span className="eyebrow">YOU'RE ON THE LIST</span><h2>IT'S<br/><em>HAPPENING.</em></h2>
              <p>Your demo registration has been saved on this device.</p>
              <button className="solid-button" onClick={() => navigate('/my-events')}>View my events <ArrowUpRight size={16}/></button>
            </div>
          ) : <>
            <div className="booking-head"><span className="eyebrow">CLAIM YOUR SPOT</span><strong>{event.priceLabel}<small> / PERSON</small></strong></div>
            <form onSubmit={submit} className="registration-form">
              <label>FULL NAME<input name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name"/></label>
              <label>EMAIL ADDRESS<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email"/></label>
              <label>PHONE NUMBER<input name="phone" value={form.phone} onChange={update} placeholder="+91 00000 00000" autoComplete="tel"/></label>
              <label>NUMBER OF TICKETS<select name="tickets" value={form.tickets} onChange={update}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?'ticket':'tickets'}</option>)}</select></label>
              <div className="booking-total"><span>ESTIMATED TOTAL</span><strong>₹{(event.price * Number(form.tickets)).toLocaleString('en-IN')}</strong></div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="solid-button" type="submit">Register interest <ArrowUpRight size={17}/></button>
              <p className="form-disclaimer">Demo registration only. No payment is collected.</p>
            </form>
          </>}
        </aside>
      </div>
    </main>
  )
}
