import { useNavigate } from "react-router-dom";
import "./Collections.css";
import Reveal from "./Reveal";

const collections = [
  {
    id: "business",
    image: "/imgs/bag1.jpg",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Business Series",
  },
  {
    id: "travel",
    image: "/imgs/bag2.jpg",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 16l20-8-8 20-2-9-9-3z" />
      </svg>
    ),
    title: "Travel Pro",
  },
  {
    id: "city",
    image: "/imgs/bag3.jpg",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "City Essentials",
  },
];

export default function Collections() {
  const navigate = useNavigate();
  return (
    <section className="nx-coll-wrap">
      <Reveal as="h2" variant="text" className="nx-coll-heading">
        <span>Explore Our</span>
        <span className="nx-accent">Collections</span>
      </Reveal>

      <Reveal as="div" variant="scale" className="nx-coll-banner" aria-hidden="true" />

      <div className="nx-coll-grid">
        {collections.map((c, i) => (
          <Reveal
            as="div"
            variant="blur"
            delay={i * 130}
            className="nx-coll-card"
            key={c.id}
          >
            <Reveal
              as="div"
              variant="clip"
              delay={i * 130 + 90}
              className="nx-coll-media"
            >
              <img src={c.image} alt={c.title} className="nx-coll-img" />
              <button className="nx-coll-zoom" aria-label={`Preview ${c.title}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </Reveal>
            <div className="nx-coll-info">
              <div className="nx-coll-title">
                <span className="nx-coll-icon">{c.icon}</span>
                {c.title}
              </div>
              <button className="nx-coll-cta" onClick={() => navigate("/shop")}>
                View Collection
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}