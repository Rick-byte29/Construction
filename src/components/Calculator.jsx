import { useMemo, useState } from "react";
import { PACKAGE_RATES, ESTIMATE_DISCLAIMER } from "../data/packages.js";
import { SERVICES, BUSINESS } from "../data/site.js";

const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
export default function Calculator({ compact = false }) {
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("");
  const [pkg, setPkg] = useState("Standard");
  const [service, setService] = useState("Building Construction");
  const [attempted, setAttempted] = useState(false);
  const floorCount = floors === "" ? 1 : Number(floors);
  const areaValue = Number(area);
  const errors = [];
  if (attempted && (area === "" || !Number.isFinite(areaValue) || areaValue <= 0)) errors.push("Enter a valid area greater than zero.");
  if (attempted && floors !== "" && (!Number.isInteger(floorCount) || floorCount <= 0)) errors.push("Enter a whole number of floors greater than zero, or leave it blank.");
  const valid = area !== "" && Number.isFinite(areaValue) && areaValue > 0 && (floors === "" || (Number.isInteger(floorCount) && floorCount > 0));
  const totalArea = valid ? areaValue * floorCount : 0;
  const estimate = useMemo(() => totalArea * PACKAGE_RATES[pkg], [totalArea, pkg]);
  const whatsapp = `${BUSINESS.whatsappLink}?text=${encodeURIComponent(`Hello KHARGO CONSTRUCTIONS, I would like to discuss a project in Bongaigaon.\nPackage: ${pkg}\nService: ${service}\nTotal built-up area: ${valid ? `${totalArea.toLocaleString("en-IN")} sq. ft.` : "To be confirmed"}\nIndicative demo estimate: ${valid ? money(estimate) : "To be calculated"}\nPlease let me know how we can discuss the scope and site requirements.`)}`;
  return <div className={`calculator ${compact ? "calculator-compact" : ""}`}>
    <div className="calc-fields">
      <label>Built-up area per floor <span>(sq. ft.)</span><input inputMode="decimal" type="number" min="1" step="any" value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. 1,200" aria-describedby="area-help" /><small id="area-help">Enter the area for one floor.</small></label>
      <label>Package<select value={pkg} onChange={e => setPkg(e.target.value)}>{Object.keys(PACKAGE_RATES).map(key => <option key={key}>{key}</option>)}</select></label>
      <label>Floors <span>(optional)</span><input inputMode="numeric" type="number" min="1" step="1" value={floors} onChange={e => setFloors(e.target.value)} placeholder="1" /><small>Leave blank if area entered is the total.</small></label>
      <label>Service type<select value={service} onChange={e => setService(e.target.value)}>{SERVICES.map(s => <option key={s.name}>{s.name}</option>)}</select></label>
    </div>
    {attempted && errors.length > 0 && <div className="form-error" role="alert">{errors.map(err => <p key={err}>{err}</p>)}</div>}
    <div className="estimate-panel" aria-live="polite"><div className="estimate-details"><div><span>Selected package</span><strong>{pkg}</strong></div><div><span>Total built-up area</span><strong>{valid ? `${totalArea.toLocaleString("en-IN")} sq. ft.` : "—"}</strong></div><div><span>Indicative rate</span><strong>₹{PACKAGE_RATES[pkg].toLocaleString("en-IN")} / sq. ft.</strong></div></div><div className="estimate-total"><span>Indicative estimate</span><strong>{valid ? money(estimate) : "Enter area"}</strong></div></div>
    <p className="disclaimer">{ESTIMATE_DISCLAIMER}</p>
    <a className="button whatsapp-estimate" href={whatsapp} target="_blank" rel="noreferrer" onClick={e => { setAttempted(true); if (!valid) e.preventDefault(); }}>Discuss this estimate on WhatsApp <span>↗</span></a>
    <p className="wa-note">WhatsApp opens a conversation with your enquiry details. No message is stored on this website.</p>
  </div>;
}
