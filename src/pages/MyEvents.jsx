import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, MapPin, Ticket, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRegistrations, removeRegistration } from '../utils/storage'

export default function MyEvents() {
  const [registrations, setRegistrations] = useState([])
  const [cancelId, setCancelId] = useState(null)

  useEffect(() => setRegistrations(getRegistrations()), [])
  const cancel = id => {
    const next = removeRegistration(id)
    setRegistrations(next)
    setCancelId(null)
  }

  return (
    <main className="my-events-page">
      <div className="my-events-heading"><span className="eyebrow">YOUR PERSONAL LINE-UP / 04</span><h1>YOUR PLANS.<br/><em>YOUR PEOPLE.</em></h1><p>Every good story starts with showing up.</p></div>
      <div className="my-events-count"><span>YOUR REGISTRATIONS</span><strong>{String(registrations.length).padStart(2,'0')}</strong></div>
      {registrations.length ? <div className="registrations-list">{registrations.map(item => (
        <article className="registration-card" key={item.registrationId}>
          <img src={item.eventImage} alt=""/>
          <div className="registration-main"><span className="eyebrow">CONFIRMED INTEREST · {item.registrationId}</span><h2>{item.eventTitle}</h2><div className="registration-facts"><span><CalendarDays size={14}/>{item.eventDate}</span><span><MapPin size={14}/>{item.eventVenue}</span><span><Ticket size={14}/>{item.tickets} {item.tickets===1?'ticket':'tickets'}</span></div></div>
          <div className="registration-side"><strong>₹{item.total.toLocaleString('en-IN')}</strong><button className="cancel-button" onClick={() => setCancelId(item.registrationId)}><Trash2 size={14}/> Cancel</button></div>
          {cancelId === item.registrationId && <div className="cancel-confirm"><span>Remove this registration?</span><button onClick={() => cancel(item.registrationId)}>Yes, remove</button><button onClick={() => setCancelId(null)}>Keep it</button></div>}
        </article>
      ))}</div> : <div className="my-events-empty"><div className="empty-orbit">S<span>.</span></div><span className="eyebrow">NOTHING BOOKED. YET.</span><h2>YOUR NEXT<br/><em>STORY AWAITS.</em></h2><p>Find something that feels like you. Your registrations will live here.</p><Link to="/#events" className="solid-button">Explore events <ArrowUpRight size={16}/></Link></div>}
    </main>
  )
}
