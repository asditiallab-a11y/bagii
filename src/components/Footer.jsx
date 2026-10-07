import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const shopLinks = ["New Arrivals", "Bags", "Collections", "Bestsellers"];
const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Careers" },
  { label: "Blog" },
];
const helpLinks = ["Shipping & Returns", "Track Order", "FAQs", "Size Guide"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="nx-footer">
      <div className="nx-footer-blob" aria-hidden="true"></div>

      <div className="nx-footer-top">
        <div className="nx-footer-brand">
          <div className="nx-footer-logo">NEXORA</div>
          <p className="nx-footer-tag">
            Full-grain leather bags, crafted by hand to age beautifully and
            carry your story for a lifetime.
          </p>
          <div className="nx-footer-social">
            <a href="#" className="nx-social-btn" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" className="nx-social-btn" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V6a2 2 0 0 1 2-2h2V1h-3a5 5 0 0 0-5 5v3H7v3h3v10h4V12h3l1-3h-4z" />
              </svg>
            </a>
            <a href="#" className="nx-social-btn" aria-label="X (Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.7L4.4 22H1.3l8.1-9.3L1 2h7l4.9 6.1L18.9 2z" />
              </svg>
            </a>
            <a href="#" className="nx-social-btn" aria-label="Pinterest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.5 17c1-4 1-7 1-7a2.5 2.5 0 0 1 5 0c0 1.5-1 4-1 4" />
                <path d="M9.5 10a2.5 2.5 0 1 1 5 0" />
              </svg>
            </a>
          </div>
        </div>

        <div className="nx-footer-col">
          <h4>Shop</h4>
          <ul>
            {shopLinks.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nx-footer-col">
          <h4>Company</h4>
          <ul>
            {companyLinks.map((l) => (
              <li key={l.label}>
                {l.to ? <Link to={l.to}>{l.label}</Link> : <a href="#">{l.label}</a>}
              </li>
            ))}
          </ul>
        </div>

        <div className="nx-footer-col">
          <h4>Help</h4>
          <ul>
            {helpLinks.map((l) => (
              <li key={l}>
                <a href="#">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nx-footer-news">
          <h4>Stay In The Loop</h4>
          <p>Get early access to drops, restocks &amp; carrier stories.</p>
          <form className="nx-news-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" aria-label="Subscribe">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
          {subscribed && <span className="nx-news-ok">You're on the list ✓</span>}
        </div>
      </div>

      <div className="nx-footer-bottom">
        <span>© {new Date().getFullYear()} Nexora. All rights reserved.</span>
        <div className="nx-footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
