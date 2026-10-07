import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import Reveal from "../components/Reveal";

// Swap this for a transparent backpack PNG (e.g. /imgs/voyager-backpack.png)
// to get the floating "cut-out" look from the reference design.
const PRODUCT_IMAGE = "/imgs/bag2.jpg";

const product = {
  name: ["The Voyager", "Backpack"],
  price: "$149.99",
  features: [
    {
      label: "Full-Grain Leather",
      icon: <path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />,
    },
    {
      label: "Brass Hardware",
      icon: <path d="M6 3h12l4 6-10 12L2 9z" />,
    },
    {
      label: "Laptop Sleeve",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </>
      ),
    },
    {
      label: "Carry-on Size",
      icon: (
        <>
          <rect x="6" y="7" width="12" height="14" rx="2" />
          <path d="M9 7V4h6v3" />
        </>
      ),
    },
  ],
  brand:
    "NEXORA was founded with a mission to create exceptional leather goods that merge timeless style with modern functionality. Each piece is handcrafted with meticulous attention to detail, using only the finest materials. We believe in quality that endures, reflecting a dedication to craftsmanship and sustainability. Join us in carrying your story with a NEXORA bag.",
  review:
    "The Full-Grain Leather is exquisite, developing a beautiful patina over time. The Brass Hardware is robust and adds a touch of class. The design is thoughtful, with a dedicated Laptop Sleeve and a perfect Carry-on Size. Highly recommended!",
  reviewer: "Alex R. (Verified Customer)",
  why: [
    {
      title: "Built to Last",
      text: "Premium full-grain leather that ages beautifully, becoming stronger and more characterful over years. A bag for life.",
    },
    {
      title: "Handcrafted",
      text: "Every bag is meticulously cut, stitched, and finished by hand — never mass-produced on a line. Master craftsmanship.",
    },
    {
      title: "Ethically Sourced",
      text: "Leather sourced only through responsible, sustainable partners with high ethical and environmental standards. Traceable and transparent.",
    },
    {
      title: "Free Shipping",
      text: "Fast tracked delivery on every order, with easy returns if it's not the perfect fit. Shop with confidence.",
    },
  ],
};

export default function ProductDetail() {
  const [added, setAdded] = useState(false);
  const [panel, setPanel] = useState(null); // "360" | "materials" | null

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function togglePanel(name) {
    setPanel((p) => (p === name ? null : name));
  }

  return (
    <main className="nx-pd">
      <div className="nx-pd-deco nx-pd-deco-l" aria-hidden="true"></div>
      <div className="nx-pd-deco nx-pd-deco-r" aria-hidden="true"></div>

      <section className="nx-pd-hero">
        <Reveal as="div" variant="left" className="nx-pd-info">
          <Link to="/" className="nx-pd-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>

          <h1 className="nx-pd-title">
            <span>{product.name[0]}</span>
            <span className="nx-accent">{product.name[1]}</span>
          </h1>
          <div className="nx-pd-price">{product.price}</div>

          <h2 className="nx-pd-sub">Product Features</h2>
          <div className="nx-pd-features">
            {product.features.map((f) => (
              <div className="nx-pd-feature" key={f.label}>
                <span className="nx-pd-feature-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {f.icon}
                  </svg>
                </span>
                {f.label}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" variant="scale" delay={100} className="nx-pd-media">
          <div className="nx-pd-glow" aria-hidden="true"></div>
          <img src={PRODUCT_IMAGE} alt="The Voyager Backpack" className="nx-pd-img" />
        </Reveal>

        <Reveal as="div" variant="right" delay={160} className="nx-pd-actions">
          <button
            className={`nx-pd-btn${panel === "360" ? " is-on" : ""}`}
            onClick={() => togglePanel("360")}
          >
            360° View
          </button>
          <button
            className={`nx-pd-btn${panel === "materials" ? " is-on" : ""}`}
            onClick={() => togglePanel("materials")}
          >
            Materials
          </button>

          {panel === "360" && (
            <p className="nx-pd-panel">
              Drag-to-rotate 360° view is coming soon for this product.
            </p>
          )}
          {panel === "materials" && (
            <p className="nx-pd-panel">
              Full-grain vegetable-tanned leather, solid brass buckles and
              waxed cotton stitching.
            </p>
          )}

          <button className="nx-pd-cart" onClick={handleAdd}>
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </Reveal>
      </section>

      <section className="nx-pd-duo">
        <Reveal as="article" variant="up" className="nx-pd-card">
          <h3>About the Brand</h3>
          <p>{product.brand}</p>
        </Reveal>

        <Reveal as="article" variant="up" delay={120} className="nx-pd-card">
          <div className="nx-pd-card-head">
            <h3>Customer Reviews</h3>
            <span className="nx-pd-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z" />
                <circle cx="7" cy="7" r="1.2" fill="currentColor" />
              </svg>
            </span>
          </div>
          <p>{product.review}</p>
          <p className="nx-pd-reviewer">— {product.reviewer}</p>
        </Reveal>
      </section>

      <section className="nx-pd-why">
        <Reveal as="h2" variant="text" className="nx-pd-why-title">
          <span>
            Why Choose <span className="nx-accent">Nexora</span>
          </span>
        </Reveal>

        <div className="nx-pd-why-grid">
          {product.why.map((w, i) => (
            <Reveal
              as="div"
              variant="up"
              delay={i * 110}
              className="nx-pd-why-card"
              key={w.title}
            >
              <h4>{w.title}</h4>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
