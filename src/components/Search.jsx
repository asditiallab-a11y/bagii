import Reveal from "../components/Reveal";

export default function About() {
  return (
    <Reveal
      as="div"
      variant="up"
      style={{ padding: "40px 32px", maxWidth: 1180, margin: "0 auto" }}
    >
      <h1>About</h1>
      <p>Ye About page hai. Isi tarah aur pages (Shop, Collections, Contact) bana sakte hain — Navbar sab pe automatically dikhega.</p>
    </Reveal>
  );
}