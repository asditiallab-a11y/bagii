// Shared cart constants + helpers, used by Cart and Checkout.
export const TAX_RATE = 0.08;
export const FREE_SHIPPING_FROM = 150;
export const SHIPPING_FEE = 9.99;
export const PROMO = { code: "NEXORA10", rate: 0.1 };

// Starter items — replace with your real cart state later.
export const INITIAL_ITEMS = [
  {
    id: "executive-briefcase",
    name: "The Executive Briefcase",
    meta: "Nexora · Full-grain leather",
    price: 299.99,
    qty: 1,
    image: "/imgs/bag2.jpg",
  },
  {
    id: "voyager-backpack",
    name: "The Voyager Backpack",
    meta: "Nexora · Everyday carry",
    price: 149.99,
    qty: 2,
    image: "/imgs/banner-girl.png",
    fit: "contain",
  },
];

export const money = (n) => `$${n.toFixed(2)}`;

export function calcTotals(items, promoRate = 0) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal * promoRate;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  const tax = (subtotal - discount) * TAX_RATE;
  return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax };
}
