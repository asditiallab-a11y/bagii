import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import "./About.css";

// Placeholder numbers — swap in your real ones.
const STATS = [
  { value: "12+", label: "Years of Craft" },
  { value: "50k+", label: "Bags Delivered" },
  { value: "4.9", label: "Average Rating" },
];

const VALUES = [
  {
    title: "Full-Grain Only",
    text: "We hand-select every hide before it is cut. No bonded scraps, no shortcuts — just leather that ages beautifully.",
    icon: <path d="M12 3c4 3 6 6 6 9a6 6 0 0 1-12 0c0-3 2-6 6-9z M12 21v-9" />,
  },
  {
    title: "Made By Hand",
    text: "A small workshop of leatherworkers cuts, stitches and finishes each piece, saddle-stitching every seam twice.",
    icon: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" />
    ),
  },
  {
    title: "Built To Last",
    text: "Solid brass hardware and a lifetime repair promise. Our bags only get better with every mile you carry them.",
    icon: (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
        <polyline points="9 12 11 14 15 10" />
      </>
    ),
  },
];

function ValueIcon({ children }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export default function About() {
  return (
    <main className="nx-about">
      <div className="nx-about-head">
        <Reveal as="h1" variant="text" className="nx-about-title">
          <span>About</span>
          <span className="nx-accent">Nexora</span>
        </Reveal>
        <Reveal as="p" variant="up" delay={120} className="nx-about-lead">
          We make leather bags the slow way — by hand, in small batches, and
          built to be carried for a lifetime.
        </Reveal>
      </div>

      {/* ---------- Story + stats ---------- */}
      <div className="nx-about-story">
        <Reveal as="div" variant="up" className="nx-ab-photo">
          <img src="/imgs/bag1.jpg" alt="Handcrafted leather duffel" loading="lazy" />
        </Reveal>

        <div className="nx-ab-col">
          <Reveal as="div" variant="up" delay={90} className="nx-ab-card nx-ab-story">
            <span className="nx-ab-badge">Our Story</span>
            <h2>
              Every bag has a <span className="nx-accent">story to tell</span>
            </h2>
            <p>
              Nexora started in a tiny workshop with one belief: a good bag
              shouldn't be disposable. We chose slow craftsmanship over mass
              production, so what you carry feels personal, holds up for
              years, and picks up character along the way.
            </p>
            <p>
              Today the same hands still cut, stitch and finish every piece —
              we've just grown the workshop, not the shortcuts.
            </p>
          </Reveal>

          <Reveal as="div" variant="up" delay={180} className="nx-ab-card nx-ab-stats">
            {STATS.map((s) => (
              <div key={s.label} className="nx-ab-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* ---------- Values ---------- */}
      <Reveal as="h2" variant="text" className="nx-about-sub">
        <span>What We</span>
        <span className="nx-accent">Stand For</span>
      </Reveal>

      <div className="nx-about-values">
        {VALUES.map((v, i) => (
          <Reveal as="div" variant="up" delay={i * 90} className="nx-ab-card nx-ab-value" key={v.title}>
            <span className="nx-ab-icon">
              <ValueIcon>{v.icon}</ValueIcon>
            </span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </Reveal>
        ))}
      </div>

      {/* ---------- CTA ---------- */}
      <Reveal as="div" variant="up" className="nx-ab-card nx-ab-cta">
        <div>
          <h2>Find the bag that's meant for you</h2>
          <p>Browse the full collection — every piece handmade and built to last.</p>
        </div>
        <Link to="/shop" className="nx-ab-btn">
          Shop Collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </Reveal>
    </main>
  );
}
