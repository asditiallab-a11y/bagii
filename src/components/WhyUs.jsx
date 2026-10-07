import "./WhyUs.css";
import Reveal from "./Reveal";

const features = [
  {
    id: "durable",
    title: "Built To Last",
    text: "Full-grain leather that ages beautifully — stronger and more characterful every year.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
  {
    id: "handmade",
    title: "Handcrafted",
    text: "Every bag is cut, stitched and finished by hand — never mass-produced on a line.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3h12l4 6-10 12L2 9z" />
      </svg>
    ),
  },
  {
    id: "sourced",
    title: "Ethically Sourced",
    text: "Leather tanned and traced through responsible, sustainable partners we trust.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 20A7 7 0 0 1 4 13V7a7 7 0 0 1 7-6c4 0 9 3 9 12a9 9 0 0 1-9 7z" />
      </svg>
    ),
  },
  {
    id: "shipping",
    title: "Free Shipping",
    text: "Fast, tracked delivery on every order, with easy returns if it's not the perfect fit.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="7" width="15" height="11" rx="2" />
        <path d="M16 10h3.5L23 14v4h-7" />
        <circle cx="6" cy="19.5" r="1.6" />
        <circle cx="18" cy="19.5" r="1.6" />
      </svg>
    ),
  },
];

const stats = [
  { id: "s1", value: "50k+", label: "Happy Carriers" },
  { id: "s2", value: "12+", label: "Years Crafting" },
  { id: "s3", value: "100%", label: "Full-Grain Leather" },
  { id: "s4", value: "30-Day", label: "Easy Returns" },
];

export default function WhyUs() {
  return (
    <section className="nx-why-wrap">
      <div className="nx-why-head">
        <Reveal as="h2" variant="text" className="nx-why-heading">
          <span>Why Choose</span>
          <span className="nx-accent">NEXORA</span>
        </Reveal>

        <Reveal as="p" variant="up" delay={100} className="nx-why-sub">
          We don't just make bags — we craft companions built to carry every
          chapter of your story, made to last for years to come.
        </Reveal>
      </div>

      <div className="nx-why-grid">
        {features.map((f, i) => (
          <Reveal
            as="div"
            variant="up"
            delay={i * 110}
            className="nx-why-card"
            key={f.id}
          >
            <div className="nx-why-icon">{f.icon}</div>
            <h3 className="nx-why-card-title">{f.title}</h3>
            <p className="nx-why-card-text">{f.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="div" variant="scale" delay={120} className="nx-why-stats">
        <div className="nx-why-stats-blob" aria-hidden="true"></div>
        {stats.map((s) => (
          <div className="nx-why-stat" key={s.id}>
            <span className="nx-why-stat-value">{s.value}</span>
            <span className="nx-why-stat-label">{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
