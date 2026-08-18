"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./wally.css";

const fleet = [
  { name: "Bentley Bentayga", type: "The Grand Arrival", image: "/fleet/bentley-front.jpg", note: "Hand-finished presence. Commanding comfort." },
  { name: "Mercedes-Maybach GLS", type: "Private Sanctuary", image: "/fleet/maybach-gls.jpg", note: "First-class space, elevated above the city." },
  { name: "Bentley Mulsanne", type: "Modern Formality", image: "/fleet/bentley-mulsanne.jpg", note: "An occasion before the occasion begins." },
  { name: "Rolls-Royce Phantom", type: "The Icon", image: "/fleet/rolls-phantom.jpg", note: "For entrances the room will remember." },
  { name: "Mercedes-Benz GLE", type: "Executive SUV", image: "/fleet/mercedes-gle-blue.jpg", note: "Poised, spacious and ready for every itinerary." },
  { name: "Toyota Hilux", type: "Premium Utility", image: "/fleet/toyota-hilux.jpg", note: "Confident capability without compromise." },
];

const whatsapp = "https://wa.me/263780167274?text=Hello%20Wally%20VIP%20Rentals%2C%20I%20would%20like%20to%20reserve%20a%20vehicle.";

export default function Home() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .16 });
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
    const onScroll = () => document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { reveal.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const choose = (index: number) => setActive((index + fleet.length) % fleet.length);

  return (
    <main className={`site-shell ${loaded ? "loaded" : ""}`}>
      <div className="intro" aria-hidden="true"><Image src="/fleet/wally-logo.png" alt="" width={160} height={160} /><span>Private arrivals begin here</span></div>
      <nav className="nav" aria-label="Main navigation">
        <a href="#top" className="brand"><Image src="/fleet/wally-logo.png" alt="Wally VIP Rentals" width={56} height={56} className="nav-logo" priority /><span className="nav-wordmark">WALLY <i>VIP RENTALS</i></span></a>
        <div className="nav-links"><a href="#fleet">Fleet</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div>
        <a className="nav-book" href={whatsapp} target="_blank" rel="noreferrer">Reserve a vehicle</a>
      </nav>
      <section className="hero" id="top">
        <Image src="/fleet/bentley-front.jpg" alt="Bentley Bentayga from the Wally VIP Rentals fleet" fill className="hero-image" priority sizes="100vw" />
        <div className="hero-shade" /><div className="hero-copy"><p className="eyebrow">Harare · Private luxury mobility</p><h1>Arrive<br /><span>unannounced.</span></h1><div className="hero-bottom"><p>A hand-selected fleet for people who understand that every entrance matters.</p><a href="#fleet" className="explore">Explore the collection <b>↓</b></a></div></div>
        <p className="hero-index">01 / WALLY</p><div className="availability"><span /> CONCIERGE ONLINE</div>
      </section>
      <section className="manifesto" id="experience"><p className="vertical-mark">WALLY / PRIVATE FLEET</p><div className="manifesto-copy" data-reveal><p className="section-label">The Wally standard</p><h2>Not a rental.<br />A <em>presence.</em></h2><p>From airport collection to the aisle, the boardroom or the city after dark—your vehicle should feel like it was waiting for this exact moment.</p></div><div className="manifesto-photo" data-reveal><Image src="/fleet/rolls-phantom.jpg" alt="White Rolls-Royce arriving at dusk" fill sizes="(max-width: 800px) 85vw, 40vw" /><span className="photo-caption">After dark / Harare</span></div></section>
      <section className="fleet" id="fleet"><header data-reveal><p className="section-label">The private collection</p><h2>Choose your<br /><em>entrance.</em></h2><p>Every vehicle is presented with care and reserved personally through our concierge.</p></header><div className="fleet-stage" data-reveal>{fleet.map((car, index) => <div className={`fleet-image ${index === active ? "active" : ""}`} key={car.name}><Image src={car.image} alt={car.name} fill sizes="(max-width: 800px) 92vw, 62vw" /></div>)}<div className="fleet-number">0{active + 1}</div><div className="fleet-controls"><button onClick={() => choose(active - 1)} aria-label="Previous vehicle">←</button><span>{String(active + 1).padStart(2,"0")} / {String(fleet.length).padStart(2,"0")}</span><button onClick={() => choose(active + 1)} aria-label="Next vehicle">→</button></div></div><div className="fleet-detail" key={active}><div><p>{fleet[active].type}</p><h3>{fleet[active].name}</h3></div><p>{fleet[active].note}</p><a href={`https://wa.me/263780167274?text=${encodeURIComponent(`Hello Wally VIP Rentals, I would like to enquire about the ${fleet[active].name}.`)}`} target="_blank" rel="noreferrer">Enquire about this vehicle <span>↗</span></a></div><div className="fleet-rail" aria-label="Select a vehicle">{fleet.map((car,index)=><button className={index===active?"active":""} onClick={()=>choose(index)} key={car.name}><span>0{index+1}</span>{car.name}</button>)}</div></section>
      <section className="service-story"><div className="service-image" data-reveal><Image src="/fleet/rolls-cullinan.jpg" alt="Luxury SUV prepared for a Wally VIP client" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="service-copy" data-reveal><p className="section-label">One call. Consider it handled.</p><h2>Luxury is<br /><em>effortless.</em></h2><div className="steps"><div><span>01</span><h3>Choose</h3><p>Tell us the vehicle, date and occasion.</p></div><div><span>02</span><h3>Confirm</h3><p>Your private concierge finalises the details.</p></div><div><span>03</span><h3>Arrive</h3><p>Immaculate, on time, ready for you.</p></div></div><a className="gold-link" href={whatsapp} target="_blank" rel="noreferrer">Speak to the concierge ↗</a></div></section>
      <section className="mosaic" aria-label="More from the fleet"><div data-reveal><Image src="/fleet/mercedes-c-class.jpg" alt="Mercedes-Benz C-Class" fill sizes="40vw" /></div><p data-reveal>From decisive business travel to the celebration of a lifetime.</p><div data-reveal><Image src="/fleet/mercedes-gle-coupe.jpg" alt="Mercedes-Benz GLE Coupe" fill sizes="40vw" /></div></section>
      <section className="finale" id="contact"><Image src="/fleet/bentley-mulsanne.jpg" alt="Bentley Mulsanne from the Wally fleet" fill sizes="100vw" /><div className="finale-shade" /><div className="finale-copy" data-reveal><p className="section-label">Your next arrival</p><h2>Make it<br /><em>unforgettable.</em></h2><a href={whatsapp} target="_blank" rel="noreferrer">Reserve via WhatsApp <span>↗</span></a><a className="phone" href="tel:+263780167274">+263 78 016 7274</a></div></section>
      <footer><div className="footer-brand"><Image src="/fleet/wally-logo.png" alt="Wally VIP Rentals" width={120} height={120}/><p>Private luxury mobility<br />Harare, Zimbabwe</p></div><div><p>ENQUIRIES</p><a href="tel:+263780167274">+263 78 016 7274</a><a href={whatsapp}>WhatsApp concierge</a></div><div><p>NAVIGATE</p><a href="#fleet">The fleet</a><a href="#experience">The experience</a></div><span className="copyright">© 2026 WALLY VIP RENTALS</span></footer>
      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Book on WhatsApp">W <span>Concierge</span></a>
    </main>
  );
}
