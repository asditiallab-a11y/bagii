import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Shop.css";
import Reveal from "../components/Reveal";

const PAGE_SIZE = 4;
const SLOTS = ["a", "b", "c", "e"];
// Puzzle-joint tabs each card pushes into its neighbour's notch (desktop only).
const TABS = {
  a: ["nx-tab-a-r"],
  b: ["nx-tab-b-r", "nx-tab-b-b"],
  c: ["nx-tab-c-r"],
};
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

// Replace / extend this list with your real products. Items without an
// `image` get a clean placeholder tile automatically.
const products = [
  {
    id: "executive-briefcase",
    name: "The Executive Briefcase",
    price: 299.99,
    image: "/imgs/bag2.jpg",
    bestSeller: true,
  },
  {
    id: "voyager-backpack",
    name: "The Voyager Backpack",
    price: 149.99,
    image: "/imgs/banner-girl.png",
    fit: "contain",
    href: "/product",
  },
  {
    id: "globetrotter-duffle",
    name: "The Globetrotter Duffle",
    price: 399.99,
    image: "/imgs/bag1.jpg",
  },
  {
    id: "city-crossbody",
    name: "The City Crossbody",
    price: 119.99,
    image: "/imgs/bag3.jpg",
  },
];

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Media({ p }) {
  return (
    <div className="nx-sc-media">
      {p.image ? (
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className={p.fit === "contain" ? "is-contain" : ""}
        />
      ) : (
        <div className="nx-sc-fallback" aria-hidden="true">
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="7" width="18" height="14" rx="3" />
            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
          </svg>
        </div>
      )}
    </div>
  );
}

function ProductCard({ p, slot, puzzle, added, onAdd }) {
  const price = `$${p.price.toFixed(2)}`;
  const title = p.href ? (
    <Link to={p.href} className="nx-sc-name">
      {p.name}
    </Link>
  ) : (
    <span className="nx-sc-name">{p.name}</span>
  );

  const view = (
    <Link
      to={p.href || "/product"}
      className="nx-sc-view"
      aria-label={`View details of ${p.name}`}
      title="View Details"
    >
      <EyeIcon />
    </Link>
  );

  const addBtn = (
    <button
      className={`nx-sc-add${added ? " is-added" : ""}`}
      onClick={() => onAdd(p.id)}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );

  const text = (
    <div className="nx-sc-text">
      {title}
      <span className="nx-sc-price">{price}</span>
    </div>
  );

  return (
    <div className="nx-shadow">
    <article className={`nx-sc nx-sc-${slot}`}>
      <Media p={p} />
      {p.bestSeller && slot === "a" && (
        <span className="nx-sc-best">Best Seller</span>
      )}

      <div className="nx-sc-body">
        {text}
        <div className="nx-sc-actions">
          {addBtn}
          {view}
        </div>
      </div>
    </article>
    {puzzle &&
      (TABS[slot] || []).map((cls) => (
        <span key={cls} className={`nx-tab ${cls}`} aria-hidden="true"></span>
      ))}
    </div>
  );
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORTS.find((s) => s.value === value) || SORTS[0];

  // Close on outside click / Escape.
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`nx-sort${open ? " is-open" : ""}`} ref={ref}>
      <span className="nx-shop-label">Sort By:</span>
      <button
        type="button"
        className="nx-sort-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{current.label}</span>
        <svg className="nx-sort-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <ul className="nx-sort-menu" role="listbox" aria-label="Sort products">
        {SORTS.map((s) => (
          <li key={s.value} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={s.value === value}
              className={`nx-sort-opt${s.value === value ? " is-selected" : ""}`}
              onClick={() => {
                onChange(s.value);
                setOpen(false);
              }}
            >
              <span>{s.label}</span>
              {s.value === value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Shop() {
  const [sort, setSort] = useState("featured");
  const [addedId, setAddedId] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const list = useMemo(() => {
    const out = [...products];
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    return out;
  }, [sort]);

  const blocks = [];
  for (let i = 0; i < list.length; i += PAGE_SIZE) {
    blocks.push(list.slice(i, i + PAGE_SIZE));
  }

  function handleAdd(id) {
    setAddedId(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAddedId(null), 1600);
  }

  return (
    <main className="nx-shop">
      <div className="nx-shop-head">
        <Reveal as="h1" variant="text" className="nx-shop-title">
          <span>Shop All</span>
          <span className="nx-accent">Collections</span>
        </Reveal>

        <Reveal as="div" variant="up" delay={120} className="nx-shop-filters">
          <SortDropdown value={sort} onChange={setSort} />
        </Reveal>
      </div>

      {blocks.map((block, bi) => {
        const puzzle = block.length === PAGE_SIZE;
        return (
          <div
            className={`nx-shop-grid${puzzle ? " nx-puzzle" : ""}`}
            key={bi}
          >
            {block.map((p, i) => (
              <Reveal
                as="div"
                variant="up"
                delay={i * 90}
                className={`nx-slot nx-slot-${SLOTS[i]}`}
                key={p.id}
              >
                <ProductCard
                  p={p}
                  slot={SLOTS[i]}
                  puzzle={puzzle}
                  added={addedId === p.id}
                  onAdd={handleAdd}
                />
              </Reveal>
            ))}
          </div>
        );
      })}
    </main>
  );
}
