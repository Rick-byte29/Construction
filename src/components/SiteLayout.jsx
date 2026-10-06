import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BUSINESS } from "../data/site.js";

const nav = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["Packages", "/packages"], ["Contact", "/contact"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const close = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <header className="site-header">
    <div className="header-inner wrap">
      <Link className="brand" to="/" aria-label="KHARGO CONSTRUCTIONS home"><img className="brand-logo" src="/assets/khargo-logo-black.png" alt="KHARGO CONSTRUCTIONS" /></Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation menu" : "Open navigation menu"}><span /><span /><span /></button>
      <nav id="primary-nav" className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {nav.map(([label, to]) => <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{label}</NavLink>)}
        <Link className="nav-call" to="/contact">Let’s talk <span aria-hidden="true">↗</span></Link>
      </nav>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-top">
      <div className="footer-brand"><Link className="brand brand-light" to="/" aria-label="KHARGO CONSTRUCTIONS home"><img className="brand-logo footer-logo" src="/assets/khargo-logo-black.png" alt="KHARGO CONSTRUCTIONS" /></Link><p>Construction and structural services for homes and properties in Bongaigaon, Assam.</p><span className="footer-category">{BUSINESS.category}</span></div>
      <div className="footer-links"><h2>Explore</h2>{nav.slice(1).map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}<Link to="/faq">FAQs</Link></div>
      <div className="footer-links"><h2>Get in touch</h2><a href={BUSINESS.phoneLink}>Call {BUSINESS.phone}</a><a href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent("Hello KHARGO CONSTRUCTIONS, I would like to discuss a construction requirement in Bongaigaon.")}`} target="_blank" rel="noreferrer">WhatsApp us ↗</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`} target="_blank" rel="noreferrer">Directions ↗</a><p>{BUSINESS.address}</p></div>
    </div>
    <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} KHARGO CONSTRUCTIONS</span><span>Built around clear conversations and considered work.</span></div>
  </footer>;
}

export function Layout({ children }) {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /><a className="whatsapp-float" href={`${BUSINESS.whatsappLink}?text=${encodeURIComponent("Hello KHARGO CONSTRUCTIONS, I would like to discuss a project.")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp KHARGO CONSTRUCTIONS">◉ <span>WhatsApp</span></a></>;
}

export function PageTitle({ eyebrow, title, intro }) {
  return <section className="page-title wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{intro && <p className="page-intro">{intro}</p>}</section>;
}

export function SectionHeading({ eyebrow, title, text, dark = false }) {
  return <div className={`section-heading ${dark ? "text-light" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
