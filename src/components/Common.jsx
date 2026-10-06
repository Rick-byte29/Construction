import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BUSINESS } from "../data/site.js";

export function SEO({ title, description, path = "" }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector, attribute, key, value) => {
      let meta = document.querySelector(selector);
      if (!meta) { meta = document.createElement("meta"); meta.setAttribute(attribute, key); document.head.append(meta); }
      meta.content = value;
    };
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", `${window.location.origin}${path || window.location.pathname}`);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = `${window.location.origin}${path || window.location.pathname}`;
    const ldId = "khargo-local-business";
    let ld = document.getElementById(ldId);
    if (!ld) { ld = document.createElement("script"); ld.id = ldId; ld.type = "application/ld+json"; document.head.append(ld); }
    ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "GeneralContractor", name: BUSINESS.name, description: BUSINESS.category, telephone: "+91 9101035255", address: { "@type": "PostalAddress", streetAddress: "PART 1, Gurunanak Nagar, Dolaigaon", addressLocality: "Bongaigaon", addressRegion: "Assam", postalCode: "783385", addressCountry: "IN" }, areaServed: { "@type": "City", name: "Bongaigaon" } });
  }, [title, description, path]);
  return null;
}

export function ButtonLink({ to, children, secondary = false, className = "" }) { return <Link className={`button ${secondary ? "button-outline" : ""} ${className}`} to={to}>{children}</Link>; }

export function WhatsAppLink({ children, message, className = "button" }) {
  const href = `${BUSINESS.whatsappLink}?text=${encodeURIComponent(message || "Hello KHARGO CONSTRUCTIONS, I would like to discuss a project in Bongaigaon.")}`;
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export function CallLink({ children = "Call Now", className = "button" }) { return <a className={className} href={BUSINESS.phoneLink}>{children}</a>; }

export function CTASection() {
  return <section className="cta-band"><div className="wrap cta-inner"><div><p className="eyebrow">A good place to begin</p><h2>Tell us what you’re planning.</h2><p>Share a little about your property or repair need. We’ll start with a conversation.</p></div><div className="cta-actions"><WhatsAppLink>WhatsApp Us <span>↗</span></WhatsAppLink><CallLink className="button button-outline">Call {BUSINESS.phone}</CallLink></div></div></section>;
}
