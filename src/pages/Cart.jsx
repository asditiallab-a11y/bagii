import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

import { TAX_RATE, FREE_SHIPPING_FROM, SHIPPING_FEE, PROMO, INITIAL_ITEMS, money } from "../lib/cart";

// Card body colours cycle for a bit of variety.
const PIECE_COLORS = ["#ffffff", "#f1ecfb", "#e6ddf9"];

function Icon({ name, size = 16 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "trash":
      return (
        <svg {...p}>
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      );
    case "minus":
      return (
        <svg {...p} strokeWidth={2.5}>
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p} strokeWidth={2.5}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "lock":
      return (
        <svg {...p}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    default:
      return null;
  }
}

function CartItem({ item, index, onQty, onRemove, onWish, wished }) {
  return (
    <article className="nx-ci" style={{ "--piece": PIECE_COLORS[index % PIECE_COLORS.length] }}>
      <div className="nx-ci-main">
        <span className="nx-ci-num">{index + 1}.</span>

        <div className="nx-ci-media">
          <img
            src={item.image}
            alt={item.name}
            className={item.fit === "contain" ? "is-contain" : ""}
            loading="lazy"
          />
        </div>

        <div className="nx-ci-info">
          <h3 className="nx-ci-name">{item.name}</h3>
          <p className="nx-ci-meta">{item.meta}</p>
        </div>

        <div className="nx-ci-side">
          <div className="nx-ci-top">
            <span className="nx-ci-price">{money(item.price * item.qty)}</span>
            <button
              type="button"
              className="nx-ci-icon is-danger"
              aria-label={`Remove ${item.name}`}
              onClick={() => onRemove(item.id)}
            >
              <Icon name="trash" />
            </button>
          </div>

          <div className="nx-ci-bottom">
            <div className="nx-qty" role="group" aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={item.qty <= 1}
                onClick={() => onQty(item.id, -1)}
              >
                <Icon name="minus" size={13} />
              </button>
              <span aria-live="polite">{item.qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => onQty(item.id, 1)}
              >
                <Icon name="plus" size={13} />
              </button>
            </div>
            <button
              type="button"
              className={`nx-ci-icon${wished ? " is-on" : ""}`}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wished}
              onClick={() => onWish(item.id)}
            >
              <Icon name="heart" />
            </button>
          </div>
        </div>
      </div>

      <div className="nx-ci-foot">
        <button type="button" className="nx-ci-move" onClick={() => onWish(item.id, true)}>
          <Icon name="heart" size={15} />
          Move to Wishlist
        </button>
      </div>
    </article>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [wished, setWished] = useState([]);
  const [notice, setNotice] = useState("");
  const [ship, setShip] = useState("");
  const [shipMsg, setShipMsg] = useState("");
  const [code, setCode] = useState("");
  const [promo, setPromo] = useState(null); // { rate } | null
  const [promoMsg, setPromoMsg] = useState({ ok: true, text: "" });
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function flash(text) {
    setNotice(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(""), 2400);
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = promo ? subtotal * promo.rate : 0;
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
    const tax = (subtotal - discount) * TAX_RATE;
    return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax };
  }, [items, promo]);

  const count = items.reduce((s, i) => s + i.qty, 0);

  function changeQty(id, d) {
    setItems((list) =>
      list.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i))
    );
  }

  function removeItem(id) {
    setItems((list) => list.filter((i) => i.id !== id));
  }

  function toggleWish(id, move = false) {
    const item = items.find((i) => i.id === id);
    if (move) {
      setWished((w) => (w.includes(id) ? w : [...w, id]));
      removeItem(id);
      flash(`${item.name} moved to wishlist`);
      return;
    }
    setWished((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }

  function estimateShipping(e) {
    e.preventDefault();
    if (!ship.trim()) return;
    setShipMsg(
      totals.subtotal >= FREE_SHIPPING_FROM
        ? `Free delivery to ${ship.trim()} · 3–5 business days`
        : `${money(SHIPPING_FEE)} delivery to ${ship.trim()} · 3–5 business days`
    );
  }

  function applyCode(e) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    if (c === PROMO.code) {
      setPromo({ rate: PROMO.rate });
      setPromoMsg({ ok: true, text: "Code applied — 10% off your order." });
    } else {
      setPromo(null);
      setPromoMsg({ ok: false, text: "That code isn't valid." });
    }
  }

  return (
    <main className="nx-cart">
      <div className="nx-cart-head">
        <h1 className="nx-cart-title">
          Shopping <span className="nx-accent">Cart</span>
          {count > 0 && <small>{count} {count === 1 ? "item" : "items"}</small>}
        </h1>
      </div>

      {notice && (
        <div className="nx-cart-notice" role="status">
          {notice}
        </div>
      )}

      <div className="nx-cart-layout">
        {/* ---------- Items ---------- */}
        <section className="nx-cart-list" aria-label="Cart items">
          {items.length === 0 ? (
            <div className="nx-cart-empty">
              <div className="nx-cart-empty-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="14" rx="3" />
                  <path d="M8 7V5a4 4 0 0 1 8 0v2" />
                </svg>
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything yet.</p>
              <Link to="/shop" className="nx-cart-btn">Browse Collection</Link>
            </div>
          ) : (
            items.map((item, i) => (
              <CartItem
                key={item.id}
                item={item}
                index={i}
                wished={wished.includes(item.id)}
                onQty={changeQty}
                onRemove={removeItem}
                onWish={toggleWish}
              />
            ))
          )}
        </section>

        {/* ---------- Summary ---------- */}
        <aside className="nx-cart-side">
          {/* Summary */}
          <div className="nx-sum">
            <h2>Order Summary</h2>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(totals.subtotal)}</dd>
              </div>
              {promo && (
                <div className="is-good">
                  <dt>Discount (10%)</dt>
                  <dd>−{money(totals.discount)}</dd>
                </div>
              )}
              <div>
                <dt>{totals.shipping === 0 ? "Free Shipping" : "Shipping"}</dt>
                <dd className={totals.shipping === 0 ? "is-good" : ""}>
                  {totals.shipping === 0 ? "Free" : money(totals.shipping)}
                </dd>
              </div>
              <div>
                <dt>Estimated Tax</dt>
                <dd>{money(totals.tax)}</dd>
              </div>
              <div className="nx-sum-total">
                <dt>Total</dt>
                <dd>{money(totals.total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="nx-cart-btn nx-cart-btn-lg"
              disabled={items.length === 0}
              onClick={() => navigate("/checkout", { state: { items, promoRate: promo ? promo.rate : 0 } })}
            >
              <Icon name="lock" size={16} />
              Secure Checkout · {money(totals.total)}
            </button>
            <Link to="/shop" className="nx-cart-continue">Continue Shopping</Link>
          </div>

          {/* Extras — shipping estimate + discount code */}
          <div className="nx-cart-extras">
          <form className="nx-cart-block" onSubmit={estimateShipping}>
            <label className="nx-cart-block-label" htmlFor="nx-ship">Estimate shipping</label>
            <div className="nx-cart-row">
              <input
                id="nx-ship"
                type="text"
                placeholder="Country or ZIP code"
                value={ship}
                onChange={(e) => setShip(e.target.value)}
              />
              <button type="submit" className="nx-cart-btn nx-cart-btn-sm">Estimate</button>
            </div>
            {shipMsg && <p className="nx-cart-hint">{shipMsg}</p>}
          </form>

          <form className="nx-cart-block" onSubmit={applyCode}>
            <label className="nx-cart-block-label" htmlFor="nx-code">Discount code</label>
            <div className="nx-cart-row">
              <input
                id="nx-code"
                type="text"
                placeholder="Got a discount code?"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="nx-cart-btn nx-cart-btn-sm">Apply</button>
            </div>
            {promoMsg.text && (
              <p className={`nx-cart-hint${promoMsg.ok ? " is-good" : " is-bad"}`}>{promoMsg.text}</p>
            )}
          </form>
          </div>

          {/* Payment — payment methods */}
          <div className="nx-cart-pay">
            <h3>Accepted Payment Methods</h3>
            <div className="nx-cart-pay-row">
              <span className="nx-pay nx-pay-paypal">PayPal</span>
              <span className="nx-pay nx-pay-visa">VISA</span>
              <span className="nx-pay nx-pay-mc" aria-label="Mastercard">
                <i /><i />
              </span>
              <span className="nx-pay">COD</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
