import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "../components/Reveal";
import { INITIAL_ITEMS, PROMO, calcTotals, money } from "../lib/cart";
import "./Checkout.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAYMENTS = [
  { key: "card", label: "Credit / Debit Card" },
  { key: "paypal", label: "PayPal" },
  { key: "cod", label: "Cash on Delivery" },
];

const EMPTY = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
};

function Svg({ children, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const fmtCard = (v) => v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
const fmtExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

function expiryOk(v) {
  const m = /^(\d{2})\/(\d{2})$/.exec(v);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

function validate(v, payment) {
  const e = {};
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right.";
  if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
  if (!v.firstName.trim()) e.firstName = "Required.";
  if (!v.lastName.trim()) e.lastName = "Required.";
  if (v.address.trim().length < 5) e.address = "Please enter your full address.";
  if (!v.city.trim()) e.city = "Required.";
  if (!v.zip.trim()) e.zip = "Required.";
  if (!v.country.trim()) e.country = "Required.";
  if (payment === "card") {
    const digits = v.cardNumber.replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) e.cardNumber = "Enter a valid card number.";
    if (!v.cardName.trim()) e.cardName = "Name on card is required.";
    if (!expiryOk(v.expiry)) e.expiry = "Use a valid MM/YY.";
    if (!/^\d{3,4}$/.test(v.cvc)) e.cvc = "3–4 digits.";
  }
  return e;
}

function Field({ id, label, error, className = "", children }) {
  return (
    <div className={`nx-co-field${error ? " has-error" : ""} ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="nx-co-err">{error}</span>}
    </div>
  );
}

export default function Checkout() {
  const { state } = useLocation();
  const items = state?.items ?? INITIAL_ITEMS;
  const promoRate = state?.promoRate ?? 0;

  const [values, setValues] = useState(EMPTY);
  const [payment, setPayment] = useState("card");
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const totals = useMemo(() => calcTotals(items, promoRate), [items, promoRate]);
  const count = items.reduce((s, i) => s + i.qty, 0);

  function setField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values, payment);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector(".nx-co-field.has-error input")?.focus();
      return;
    }
    // No backend yet — send `values`, `items`, `payment` to your API here.
    // Never store raw card data yourself; use a payment provider (Stripe etc.).
    setOrder({
      id: `NX-${Date.now().toString().slice(-6)}`,
      email: values.email.trim(),
      total: totals.total,
      payment,
    });
    window.scrollTo(0, 0);
  }

  /* ---------- Success ---------- */
  if (order) {
    return (
      <main className="nx-checkout">
        <div className="nx-co-card nx-co-done" role="status">
          <span className="nx-co-done-icon">
            <Svg size={34}><polyline points="20 6 9 17 4 12" /></Svg>
          </span>
          <h1>Order placed!</h1>
          <p>
            Thank you, {values.firstName.trim()}. Your order <strong>{order.id}</strong> is confirmed
            — a receipt is on its way to <strong>{order.email}</strong>.
          </p>
          <p className="nx-co-done-total">
            {order.payment === "cod" ? "Pay on delivery" : "Total paid"}: <strong>{money(order.total)}</strong>
          </p>
          <Link to="/shop" className="nx-co-btn">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  /* ---------- Empty ---------- */
  if (items.length === 0) {
    return (
      <main className="nx-checkout">
        <div className="nx-co-card nx-co-done">
          <h1>Nothing to check out</h1>
          <p>Your cart is empty — add something first.</p>
          <Link to="/shop" className="nx-co-btn">Browse Collection</Link>
        </div>
      </main>
    );
  }

  const inp = (id, field, props = {}) => (
    <input
      id={id}
      value={values[field]}
      onChange={(e) => setField(field, props.format ? props.format(e.target.value) : e.target.value)}
      aria-invalid={!!errors[field]}
      {...props.attrs}
    />
  );

  return (
    <main className="nx-checkout">
      <div className="nx-co-head">
        <Reveal as="h1" variant="text" className="nx-co-title">
          <span>Secure</span>
          <span className="nx-accent">Checkout</span>
        </Reveal>
        <Link to="/cart" className="nx-co-back">← Back to cart</Link>
      </div>

      <form className="nx-co-layout" onSubmit={handleSubmit} noValidate>
        {/* ---------- Left: details ---------- */}
        <div className="nx-co-main">
          <Reveal as="section" variant="up" className="nx-co-card">
            <h2><span className="nx-co-step">1</span> Contact</h2>
            <div className="nx-co-row">
              <Field id="co-email" label="Email address" error={errors.email}>
                {inp("co-email", "email", { attrs: { type: "email", autoComplete: "email", placeholder: "you@example.com" } })}
              </Field>
              <Field id="co-phone" label="Phone number" error={errors.phone}>
                {inp("co-phone", "phone", { attrs: { type: "tel", autoComplete: "tel", placeholder: "+92 300 0000000" } })}
              </Field>
            </div>
          </Reveal>

          <Reveal as="section" variant="up" delay={60} className="nx-co-card">
            <h2><span className="nx-co-step">2</span> Shipping address</h2>
            <div className="nx-co-row">
              <Field id="co-first" label="First name" error={errors.firstName}>
                {inp("co-first", "firstName", { attrs: { autoComplete: "given-name" } })}
              </Field>
              <Field id="co-last" label="Last name" error={errors.lastName}>
                {inp("co-last", "lastName", { attrs: { autoComplete: "family-name" } })}
              </Field>
            </div>
            <Field id="co-address" label="Street address" error={errors.address}>
              {inp("co-address", "address", { attrs: { autoComplete: "street-address", placeholder: "House / street / area" } })}
            </Field>
            <div className="nx-co-row nx-co-row-3">
              <Field id="co-city" label="City" error={errors.city}>
                {inp("co-city", "city", { attrs: { autoComplete: "address-level2" } })}
              </Field>
              <Field id="co-state" label="State / Province">
                {inp("co-state", "state", { attrs: { autoComplete: "address-level1" } })}
              </Field>
              <Field id="co-zip" label="ZIP / Postal code" error={errors.zip}>
                {inp("co-zip", "zip", { attrs: { autoComplete: "postal-code" } })}
              </Field>
            </div>
            <Field id="co-country" label="Country" error={errors.country}>
              {inp("co-country", "country", { attrs: { autoComplete: "country-name", placeholder: "Pakistan" } })}
            </Field>
          </Reveal>

          <Reveal as="section" variant="up" delay={120} className="nx-co-card">
            <h2><span className="nx-co-step">3</span> Payment</h2>
            <div role="radiogroup" aria-label="Payment method" className="nx-co-chips">
              {PAYMENTS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  role="radio"
                  aria-checked={payment === p.key}
                  className={`nx-co-chip${payment === p.key ? " is-on" : ""}`}
                  onClick={() => setPayment(p.key)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {payment === "card" && (
              <div className="nx-co-cardbox">
                <Field id="co-cardnum" label="Card number" error={errors.cardNumber}>
                  {inp("co-cardnum", "cardNumber", {
                    format: fmtCard,
                    attrs: { inputMode: "numeric", autoComplete: "cc-number", placeholder: "1234 5678 9012 3456" },
                  })}
                </Field>
                <Field id="co-cardname" label="Name on card" error={errors.cardName}>
                  {inp("co-cardname", "cardName", { attrs: { autoComplete: "cc-name" } })}
                </Field>
                <div className="nx-co-row">
                  <Field id="co-exp" label="Expiry" error={errors.expiry}>
                    {inp("co-exp", "expiry", {
                      format: fmtExpiry,
                      attrs: { inputMode: "numeric", autoComplete: "cc-exp", placeholder: "MM/YY" },
                    })}
                  </Field>
                  <Field id="co-cvc" label="CVC" error={errors.cvc}>
                    {inp("co-cvc", "cvc", {
                      format: (v) => v.replace(/\D/g, "").slice(0, 4),
                      attrs: { inputMode: "numeric", autoComplete: "cc-csc", placeholder: "123" },
                    })}
                  </Field>
                </div>
              </div>
            )}
            {payment === "paypal" && (
              <p className="nx-co-note">You'll be redirected to PayPal to complete your payment after placing the order.</p>
            )}
            {payment === "cod" && (
              <p className="nx-co-note">Pay in cash when your order arrives. No advance payment needed.</p>
            )}
          </Reveal>
        </div>

        {/* ---------- Right: summary ---------- */}
        <aside className="nx-co-side">
          <Reveal as="div" variant="up" delay={90} className="nx-co-card nx-co-sum">
            <h2>Order Summary <small>{count} {count === 1 ? "item" : "items"}</small></h2>

            <ul className="nx-co-items">
              {items.map((it) => (
                <li key={it.id}>
                  <div className="nx-co-thumb">
                    <img src={it.image} alt={it.name} className={it.fit === "contain" ? "is-contain" : ""} />
                    <span className="nx-co-qty">{it.qty}</span>
                  </div>
                  <div className="nx-co-item-info">
                    <strong>{it.name}</strong>
                    <span>{it.meta}</span>
                  </div>
                  <span className="nx-co-item-price">{money(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>

            <dl>
              <div><dt>Subtotal</dt><dd>{money(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="is-good">
                  <dt>Discount ({PROMO.rate * 100}%)</dt>
                  <dd>−{money(totals.discount)}</dd>
                </div>
              )}
              <div>
                <dt>{totals.shipping === 0 ? "Free Shipping" : "Shipping"}</dt>
                <dd className={totals.shipping === 0 ? "is-good" : ""}>
                  {totals.shipping === 0 ? "Free" : money(totals.shipping)}
                </dd>
              </div>
              <div><dt>Estimated Tax</dt><dd>{money(totals.tax)}</dd></div>
              <div className="nx-co-total"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
            </dl>

            <button type="submit" className="nx-co-btn nx-co-btn-lg">
              <Svg size={16}>
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </Svg>
              Place Order · {money(totals.total)}
            </button>
            <p className="nx-co-secure">Your information is encrypted and secure.</p>
          </Reveal>
        </aside>
      </form>
    </main>
  );
}
