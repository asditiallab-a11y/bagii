import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // One-time gentle entrance on page load (not scroll-based — the navbar
  // is already in view), skipped automatically for reduced-motion via CSS.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Add a subtle floating/shadow state once the page has scrolled a bit.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Collection", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <div className={`nx-nav-outer${scrolled ? " is-scrolled" : ""}`}>
      <nav className={`nx-nav${loaded ? " is-loaded" : ""}`}>
        <button
          className="nx-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nx-bar ${open ? "top" : ""}`}></span>
          <span className={`nx-bar ${open ? "mid" : ""}`}></span>
          <span className={`nx-bar ${open ? "bot" : ""}`}></span>
        </button>

        <ul className={`nx-nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link.label} onClick={() => setOpen(false)}>
              <Link
                to={link.href}
                className={
                  link.href !== "/" && location.pathname === link.href
                    ? "is-active"
                    : ""
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/" className="nx-brand">
          <svg className="nx-brand-spark" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2 10 10 2-10 2-2 10-2-10L0 12l10-2z" />
          </svg>
          NEXORA
        </Link>

        <div className="nx-nav-right">
          {searchOpen && (
            <form className="nx-search-form" onSubmit={handleSearchSubmit}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="nx-search-input"
                type="text"
                autoFocus
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          )}

          <button
            className={`nx-icon-btn${searchOpen ? " is-active" : ""}`}
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button className="nx-avatar-btn" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <Link to="/cart" className="nx-cart-pill" aria-label="Open cart">
            <span className="nx-cart-icon-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="nx-cart-count">1</span>
            </span>
            <span className="nx-cart-label">Cart</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
