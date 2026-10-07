import { Link } from "react-router-dom";
import "./Story.css";
import Reveal from "./Reveal";

const points = [
  "Full-grain hides, hand-selected before every cut",
  "Solid brass hardware that won't rust or fade",
  "Every seam saddle-stitched twice for strength",
];

export default function Story() {
  return (
    <section className="nx-story-wrap">
      <Reveal as="div" variant="left" className="nx-story-left">
        <div className="nx-story-badge">Our Craft</div>

        <Reveal as="h2" variant="text" className="nx-story-heading">
          <span>Every Bag Has A</span>
          <span className="nx-accent">Story To Tell</span>
        </Reveal>

        <p className="nx-story-text">
          Behind every Nexora piece is a small workshop of leatherworkers who
          still cut, stitch and finish by hand. We chose slow craftsmanship
          over mass production — so what you carry feels personal, holds up
          for years, and only gets better with every mile.
        </p>

        <ul className="nx-story-points">
          {points.map((p) => (
            <li key={p}>
              <span className="nx-story-check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>

        <Link to="/about" className="nx-story-cta">
          Learn Our Story
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </Reveal>

      <Reveal as="div" variant="right" delay={100} className="nx-story-right">
        <div className="nx-story-media">
          <img src="/imgs/bag1.jpg" alt="Handcrafted leather duffel" className="nx-story-img" />
          <div className="nx-story-ring" aria-hidden="true"></div>

          <div className="nx-story-floatcard">
            <span className="nx-story-float-value">12+</span>
            <span className="nx-story-float-label">Years of Craft</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
