import { useEffect, useRef, useState } from "react";
import "./Testimonials.css";
import Reveal from "./Reveal";

const testimonials = [
  {
    id: "t1",
    initials: "AK",
    name: "Ayesha K.",
    role: "Verified Buyer",
    text: "The Voyager Backpack has survived two years of daily commutes and it still looks better than the day I got it.",
  },
  {
    id: "t2",
    initials: "DR",
    name: "Daniyal R.",
    role: "Verified Buyer",
    text: "Handmade quality you can actually feel — the stitching, the leather, the hardware, all genuinely top notch.",
  },
  {
    id: "t3",
    initials: "SM",
    name: "Sarah M.",
    role: "Verified Buyer",
    text: "Ordered the Travel Pro for one trip and it's now my everyday bag. Worth absolutely every penny.",
  },
  {
    id: "t4",
    initials: "HB",
    name: "Hamza B.",
    role: "Verified Buyer",
    text: "Gifted the City Essentials tote to my wife — the leather smell and finish feel genuinely premium.",
  },
  {
    id: "t5",
    initials: "ZN",
    name: "Zara N.",
    role: "Verified Buyer",
    text: "Customer support was fantastic and the bag arrived faster than expected. Already eyeing my next one.",
  },
];

function Stars() {
  return (
    <div className="nx-test-stars" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

// How many cards are visible at once, based on viewport width.
function getPerView() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 700) return 1;
  if (window.innerWidth < 1020) return 2;
  return 3;
}

export default function Testimonials() {
  const [perView, setPerView] = useState(getPerView);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  const maxIndex = Math.max(0, testimonials.length - perView);

  useEffect(() => {
    function onResize() {
      setPerView(getPerView());
      setIndex((i) => Math.min(i, Math.max(0, testimonials.length - getPerView())));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Gentle autoplay, paused on hover/touch.
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 4500);
    return () => clearInterval(id);
  }, [maxIndex]);

  function goTo(i) {
    setIndex(Math.max(0, Math.min(i, maxIndex)));
  }

  function prev() {
    goTo(index === 0 ? maxIndex : index - 1);
  }

  function next() {
    goTo(index >= maxIndex ? 0 : index + 1);
  }

  const cardPct = 100 / perView;

  return (
    <section
      className="nx-test-wrap"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="nx-test-head">
        <Reveal as="h2" variant="text" className="nx-test-heading">
          <span>What Our</span>
          <span className="nx-accent">Carriers Say</span>
        </Reveal>
        <div className="nx-test-headright">
          <p className="nx-test-sub">
            Real stories from people who carry Nexora every single day.
          </p>
          <div className="nx-test-arrows">
            <button className="nx-test-arrow" aria-label="Previous testimonial" onClick={prev}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="nx-test-arrow" aria-label="Next testimonial" onClick={next}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="nx-test-viewport">
        <div
          className="nx-test-track"
          ref={trackRef}
          style={{ transform: `translateX(-${index * cardPct}%)` }}
        >
          {testimonials.map((t) => (
            <div
              className="nx-test-card"
              style={{ flex: `0 0 ${cardPct}%` }}
              key={t.id}
            >
              <Stars />
              <p className="nx-test-text">&ldquo;{t.text}&rdquo;</p>
              <div className="nx-test-person">
                <div className="nx-test-avatar">{t.initials}</div>
                <div>
                  <div className="nx-test-name">{t.name}</div>
                  <div className="nx-test-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nx-test-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`nx-test-dot${i === index ? " is-active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
