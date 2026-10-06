import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/SiteLayout.jsx";
import Home from "./pages/Home.jsx";
import { About, Contact, FAQ, NotFound, Packages, Projects, ServicesPage } from "./pages/Pages.jsx";

export default function App() {
  return <Layout><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/services" element={<ServicesPage />} /><Route path="/projects" element={<Projects />} /><Route path="/packages" element={<Packages />} /><Route path="/contact" element={<Contact />} /><Route path="/faq" element={<FAQ />} /><Route path="*" element={<NotFound />} /></Routes></Layout>;
}
