import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BUSINESS, REVIEW_TEXT, SERVICES } from "../data/site.js";
import { SEO, CallLink, WhatsAppLink, ButtonLink, CTASection } from "../components/Common.jsx";
import { SectionHeading } from "../components/SiteLayout.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import Calculator from "../components/Calculator.jsx";

function HeroVideo() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const noData = navigator.connection?.saveData;
    setEnabled(!query.matches && !noData);
    const change = () => setEnabled(!query.matches && !navigator.connection?.saveData);
    query.addEventListener?.("change", change);
    return () => query.removeEventListener?.("change", change);
  }, []);
  return <div className="hero-media"><img className="hero-poster" src="/assets/building-construction.webp" alt="" fetchPriority="high" />{enabled && <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/building-construction.webp" onError={() => setEnabled(false)} aria-hidden="true"><source src="/assets/khargo-hero.mp4" type="video/mp4" /></video>}</div>;
}

export default function Home() {
  return <><SEO title="KHARGO CONSTRUCTIONS | Construction Company in Bongaigaon, Assam" description="Explore building construction, interior and exterior structural repairs, and demolition services from KHARGO CONSTRUCTIONS in Bongaigaon, Assam." path="/" />
    <main id="main-content">
      <section className="hero"><HeroVideo /><div className="hero-overlay" /><div className="wrap hero-content"><p className="eyebrow eyebrow-light"><span /> BONGAIGAON, ASSAM</p><h1>Build with<br /><em>purpose.</em></h1><p className="hero-copy">Thoughtful construction and structural services, rooted in a clear understanding of your property and plans.</p><div className="hero-actions"><ButtonLink to="/contact">Start a conversation <span>↗</span></ButtonLink><CallLink className="button button-glass">Call {BUSINESS.phone}</CallLink></div><div className="hero-caption"><span>KHARGO CONSTRUCTIONS</span><span>Local construction & repair</span></div></div><div className="hero-side-note">REAL ESTATE BUILDERS & CONSTRUCTION COMPANY</div></section>
      <section className="trust-strip"><div className="wrap trust-inner"><div><span className="trust-kicker">A local point of contact</span><strong>Bongaigaon, Assam</strong></div><div className="trust-rating"><span className="stars" aria-label="Five stars">★★★★★</span><strong>4.9</strong><span>· 11 reviews</span></div><span className="trust-review">“{REVIEW_TEXT}”</span></div></section>

      <section className="section services-section wrap"><div className="section-topline"><SectionHeading eyebrow="What we do" title={<>The work begins<br />with your needs.</>} text="Explore the services available from KHARGO CONSTRUCTIONS in Bongaigaon." /><Link className="text-link desktop-link" to="/services">View all services <span>↗</span></Link></div><div className="service-grid">{SERVICES.map((s,i)=><ServiceCard key={s.slug} service={s} number={String(i+1).padStart(2,"0")} />)}</div><p className="illustrative-note">Service images are illustrative and do not represent completed Khargo Constructions projects.</p><Link className="text-link mobile-inline-link" to="/services">View all services <span>↗</span></Link></section>

      <section className="approach-band"><div className="wrap approach-layout"><div className="approach-intro"><p className="eyebrow">A clear way forward</p><h2>Good work starts<br />with good questions.</h2><p>Every property and brief is different. We begin by listening, understanding what’s needed and discussing the scope with you.</p><ButtonLink to="/about" secondary>Our approach <span>↗</span></ButtonLink></div><div className="process-list"><div><span>01</span><div><h3>Share the brief</h3><p>Tell us about your property, plans or repair concerns.</p></div><b aria-hidden="true">↗</b></div><div><span>02</span><div><h3>Discuss the site</h3><p>Talk through the location, drawings and conditions that shape the work.</p></div><b aria-hidden="true">↗</b></div><div><span>03</span><div><h3>Clarify the scope</h3><p>Ask questions and discuss what your requirement involves before taking the next step.</p></div><b aria-hidden="true">↗</b></div></div></div></section>

      <section className="section project-preview wrap"><div className="section-topline"><SectionHeading eyebrow="Visual references" title="A feel for the work." text="A representative image selection for the services we offer." /><Link className="text-link desktop-link" to="/projects">Explore the gallery <span>↗</span></Link></div><div className="project-mosaic"><Link to="/projects" className="mosaic-main"><img src={SERVICES[0].image} alt="Representative project imagery: residential construction" loading="lazy" /><span>Representative project imagery</span><strong>Building Construction <i>↗</i></strong></Link><Link to="/projects" className="mosaic-small"><img src={SERVICES[2].image} alt="Representative project imagery: exterior structural repair" loading="lazy" /><span>Representative project imagery</span><strong>Structural Repairs <i>↗</i></strong></Link><Link to="/projects" className="mosaic-small"><img src={SERVICES[3].image} alt="Representative project imagery: controlled demolition" loading="lazy" /><span>Representative project imagery</span><strong>Demolition <i>↗</i></strong></Link></div><p className="illustrative-note"></p><Link className="text-link mobile-inline-link" to="/projects">Explore the gallery <span>↗</span></Link></section>

      <section className="home-calculator"><div className="wrap calculator-layout"><div className="calculator-copy"><p className="eyebrow">Plan a starting point</p><h2>See an indicative<br />construction estimate.</h2><p>Try the quick estimate for built-up area and a selected demo package. Final scope needs a conversation.</p><Link className="text-link" to="/packages">Explore packages and rates <span>↗</span></Link></div><Calculator compact /></div></section>

      <section className="review-section"><div className="wrap review-layout"><div><p className="eyebrow">Shared customer feedback</p><div className="big-rating"><strong>4.9</strong><span className="stars" aria-label="Five stars">★★★★★</span></div><p className="review-count">Shown with 11 reviews</p></div><blockquote><div className="stars" aria-label="Five stars">★★★★★</div><p>“{REVIEW_TEXT}”</p><cite>Review supplied for this website</cite></blockquote></div></section>
      <CTASection />
    </main>
  </>;
}
