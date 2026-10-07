import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import Reveal from "./Reveal";

export default function Hero() {
  const bannerRef = useRef(null);
  const [bannerReady, setBannerReady] = useState(false);
  const navigate = useNavigate();

  // Fade the banner model in on load. No scroll-based movement —
  // the image stays fixed in place while the page scrolls.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setBannerReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="nx-hero-wrap">
      <div className="nx-hero-top">
        <Reveal as="div" variant="up" className="nx-hero-left">
          <Reveal as="h1" variant="text">
            <span>Crafted For</span>
            <span className="nx-accent">LIFE</span>
          </Reveal>
          <div className="nx-swirl"></div>
          <div className="nx-swirl two"></div>
        </Reveal>

        <Reveal as="div" variant="up" delay={120} className="nx-hero-right">
          <Reveal as="h1" variant="text" delay={80}>
            <span>Carry Your</span>
            <span className="nx-accent">STORY</span>
          </Reveal>
          <svg className="nx-spark" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2 10 10 2-10 2-2 10-2-10L0 12l10-2z" />
          </svg>
        </Reveal>
      </div>

      <img
        ref={bannerRef}
        src="/imgs/banner-girl.png"
        alt="Banner model"
        className={`nx-banner-girl${bannerReady ? " is-ready" : ""}`}
      />

      <Reveal as="section" variant="scale" className="nx-panel">
        <div className="nx-blob" aria-hidden="true"></div>

        <div className="nx-panel-left">
          <Reveal as="div" variant="fade" delay={80} className="nx-badge">
            ＋ New Arrivals
          </Reveal>

          <Reveal as="h2" variant="text" delay={140}>
            <span>Where Craftsmanship Meets Character</span>
          </Reveal>

          <Reveal as="p" variant="up" delay={220}>
            Full-grain leather bags built by hand, made to age beautifully and last a lifetime.
          </Reveal>

          <Reveal as="button" variant="up" delay={280} className="nx-cta" onClick={() => navigate("/product")}>
            Shop Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Reveal>

          <Reveal as="div" variant="up" delay={340} className="nx-social-proof">
            <div className="nx-stack">
              <div className="nx-a"></div>
              <div className="nx-a"></div>
              <div className="nx-a"></div>
            </div>
            <span className="nx-txt">
              Trusted by 50k+
              <br />
              Happy Carriers
            </span>
          </Reveal>
        </div>

        <div className="nx-panel-right">
          <div className="nx-features">
            <Reveal as="div" variant="up" delay={160} className="nx-feature">
              <div className="nx-fi">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M16 4l4 4-4 12H8L4 8l4-4" />
                  <path d="M9 4a3 3 0 0 0 6 0" />
                </svg>
              </div>
              Full-Grain Leather
            </Reveal>

            <Reveal as="div" variant="up" delay={250} className="nx-feature">
              <div className="nx-fi">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M11 20A7 7 0 0 1 4 13V7a7 7 0 0 1 7-6c4 0 9 3 9 12a9 9 0 0 1-9 7z" />
                </svg>
              </div>
              Ethically Sourced
            </Reveal>

            <Reveal as="div" variant="up" delay={340} className="nx-feature">
              <div className="nx-fi">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <path d="M6 3h12l4 6-10 12L2 9z" />
                </svg>
              </div>
              Handcrafted
            </Reveal>
          </div>

          <Reveal as="div" variant="blur" delay={420} className="nx-featured" onClick={() => navigate("/product")} style={{ cursor: "pointer" }}>
            <div className="nx-flabel">Bestseller</div>
            <div className="nx-product-img" role="img" aria-label="Leather backpack"></div>
            <div className="nx-product-name">Voyager Backpack</div>
            <div className="nx-product-sub">Full-Grain Leather</div>
            <div className="nx-buy-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              $149.99
            </div>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}