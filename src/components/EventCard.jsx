import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EventCard({ event, featured = false }) {
  return (
    <article className={`event-card ${featured ? 'event-card-featured' : ''}`}>
      <Link to={`/event/${event.id}`} className="event-image-wrap" aria-label={`View ${event.shortTitle}`}>
        <img src={event.image} alt="" className="event-image" loading="lazy"/>
        <span className="event-index">{event.number} / 06</span>
        <span className="event-tag">{event.tag}</span>
        <span className="image-arrow"><ArrowUpRight size={20}/></span>
      </Link>
      <div className="event-meta">
        <span>{event.dateLabel}</span>
        <span className="meta-dot">✳</span>
        <span>{event.category}</span>
      </div>
      <div className="event-title-row">
        <Link to={`/event/${event.id}`}><h3>{event.shortTitle}</h3></Link>
        <span className="event-price">{event.priceLabel}</span>
      </div>
      <div className="event-location"><MapPin size={13}/>{event.venue}</div>
    </article>
  )
}
