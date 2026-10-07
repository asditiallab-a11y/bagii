import { useState } from "react";
import Reveal from "../components/Reveal";
import "./Contact.css";

const TOPICS = ["Order Help", "Product Question", "Wholesale", "Something Else"];
const MAX_MSG = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Placeholder contact details — replace with your real ones.
const INFO = [
  {
    key: "email",
    title: "Email Us",
    main: "hello@nexora.com",
    href: "mailto:hello@nexora.com",
    note: "We usually reply within 24 hours.",
    color: "#f1ecfb",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </>
    ),
  },
  {
    key: "phone",
    title: "Call Or WhatsApp",
    main: "+92 300 000 0000",
    href: "tel:+923000000000",
    note: "Mon – Sat, 10am to 7pm.",
    color: "#e6ddf9",
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    ),
  },
  {
    key: "visit",
    title: "Visit The Workshop",
    main: "12 Leather Lane, Craft District",
    note: "Open Mon – Sat, by appointment.",
    color: "#151222",
    dark: true,
    icon: (
      <>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
];

function Svg({ children, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState(TOPICS[0]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function setField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    // No backend yet — hook your API / email service in here.
    setSent(true);
  }

  function reset() {
    setValues({ name: "", email: "", message: "" });
    setTopic(TOPICS[0]);
    setErrors({});
    setSent(false);
  }

  return (
    <main className="nx-contact">
      <div className="nx-ct-head">
        <Reveal as="h1" variant="text" className="nx-ct-title">
          <span>Get In</span>
          <span className="nx-accent">Touch</span>
        </Reveal>
        <Reveal as="p" variant="up" delay={120} className="nx-ct-lead">
          Questions about an order, a bag, or a custom piece? Send us a note —
          a real person from the workshop will get back to you.
        </Reveal>
      </div>

      <div className="nx-ct-grid">
        {/* ---------- Form piece ---------- */}
        <Reveal as="div" variant="up" className="nx-ct-slot">
          <div className="nx-ct-piece nx-ct-form-piece">
              {sent ? (
                <div className="nx-ct-done" role="status">
                  <span className="nx-ct-done-icon">
                    <Svg size={34}>
                      <polyline points="20 6 9 17 4 12" />
                    </Svg>
                  </span>
                  <h2>Message sent!</h2>
                  <p>
                    Thanks, {values.name.trim().split(" ")[0]}. We'll reply to{" "}
                    <strong>{values.email.trim()}</strong> within 24 hours.
                  </p>
                  <button type="button" className="nx-ct-btn" onClick={reset}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2>Send us a message</h2>

                  <fieldset className="nx-ct-topics">
                    <legend>What's it about?</legend>
                    <div role="radiogroup" className="nx-ct-chips">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={topic === t}
                          className={`nx-ct-chip${topic === t ? " is-on" : ""}`}
                          onClick={() => setTopic(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="nx-ct-row">
                    <div className={`nx-ct-field${errors.name ? " has-error" : ""}`}>
                      <label htmlFor="ct-name">Your name</label>
                      <input
                        id="ct-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={values.name}
                        onChange={(e) => setField("name", e.target.value)}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <span className="nx-ct-err">{errors.name}</span>}
                    </div>

                    <div className={`nx-ct-field${errors.email ? " has-error" : ""}`}>
                      <label htmlFor="ct-email">Email address</label>
                      <input
                        id="ct-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={(e) => setField("email", e.target.value)}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <span className="nx-ct-err">{errors.email}</span>}
                    </div>
                  </div>

                  <div className={`nx-ct-field${errors.message ? " has-error" : ""}`}>
                    <label htmlFor="ct-msg">Your message</label>
                    <textarea
                      id="ct-msg"
                      rows={5}
                      maxLength={MAX_MSG}
                      placeholder="How can we help?"
                      value={values.message}
                      onChange={(e) => setField("message", e.target.value)}
                      aria-invalid={!!errors.message}
                    />
                    <div className="nx-ct-meta">
                      {errors.message ? (
                        <span className="nx-ct-err">{errors.message}</span>
                      ) : (
                        <span />
                      )}
                      <span className="nx-ct-count">
                        {values.message.length}/{MAX_MSG}
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="nx-ct-btn nx-ct-btn-lg">
                    Send Message
                    <Svg size={16}>
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </Svg>
                  </button>
                </form>
              )}
          </div>
        </Reveal>

        {/* ---------- Info pieces ---------- */}
        <div className="nx-ct-col">
          {INFO.map((item, i) => (
            <Reveal as="div" variant="up" delay={(i + 1) * 90} className="nx-ct-slot" key={item.key}>
              <div
                className={`nx-ct-piece nx-ct-info${item.dark ? " is-dark" : ""}`}
                style={{ "--piece": item.color }}
              >
                  <span className="nx-ct-icon">
                    <Svg>{item.icon}</Svg>
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="nx-ct-main">{item.main}</a>
                    ) : (
                      <span className="nx-ct-main">{item.main}</span>
                    )}
                    <p>{item.note}</p>
                  </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
