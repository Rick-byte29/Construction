import { Link } from "react-router-dom";
export default function ServiceCard({ service, number }) {
  return <article className="service-card"><Link to={`/services#${service.slug}`} className="service-image-link" aria-label={`Explore ${service.name}`}><img src={service.image} alt={service.alt} loading="lazy" /><span className="illustrative-tag">Illustrative image</span></Link><div className="service-info"><span className="service-number">{number}</span><h3>{service.name}</h3><p>{service.description}</p><Link className="text-link" to={`/services#${service.slug}`}>Explore service <span aria-hidden="true">↗</span></Link></div></article>;
}
