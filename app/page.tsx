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
  const [menuOpen, setMenuOpen] = useState(false);
  const [request, setRequest] = useState({ vehicle: "Any luxury vehicle", purpose: "Executive travel", date: "" });

  useEffect(() => {
    setLoaded(true);
    let previousY = window.scrollY;
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    }), { threshold: .12, rootMargin: "-5% 0px -8%" });
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--progress", `${max > 0 ? window.scrollY / max : 0}`);
      document.documentElement.dataset.scrollDirection = window.scrollY >= previousY ? "down" : "up";
      previousY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { reveal.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const choose = (index: number) => setActive((index + fleet.length) % fleet.length);
  const bookingLink = `https://wa.me/263780167274?text=${encodeURIComponent(`Hello Wally VIP Rentals, I would like to make a reservation. Vehicle: ${request.vehicle}. Requirement: ${request.purpose}. Date: ${request.date || "To be confirmed"}.`)}`;
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className={`site-shell ${loaded ? "loaded" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="intro" aria-hidden="true"><Image src="/fleet/wally-logo.png" alt="" width={160} height={160} /><span>Private arrivals begin here</span></div>
      <nav className="nav" aria-label="Main navigation">
        <a href="#top" className="brand"><Image src="/fleet/wally-logo.png" alt="Wally VIP Rentals" width={56} height={56} className="nav-logo" priority /><span className="nav-wordmark">WALLY <i>VIP RENTALS</i></span></a>
        <div className="nav-links"><a href="#about">About</a><a href="#services">Services</a><a href="#fleet">Fleet</a><a href="#contact">Contact</a></div>
        <a className="nav-call" href="https://wa.me/263780167274" target="_blank" rel="noreferrer"><span>PRIVATE CONCIERGE · WHATSAPP</span><strong>+263 78 016 7274</strong></a>
        <a className="nav-book" href={whatsapp} target="_blank" rel="noreferrer">Reserve a vehicle</a>
        <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}><i/><i/><span>{menuOpen ? "Close" : "Menu"}</span></button>
      </nav>
      <aside className="menu-drawer" aria-hidden={!menuOpen}><div className="menu-visual"><Image src="/fleet/maybach-gls.jpg" alt="Wally VIP fleet" fill sizes="50vw" /><span>Private mobility / Harare</span></div><div className="menu-content"><p>Navigate</p><a href="#top" onClick={closeMenu}><span>01</span>Home</a><a href="#about" onClick={closeMenu}><span>02</span>About Wally</a><a href="#services" onClick={closeMenu}><span>03</span>Services</a><a href="#fleet" onClick={closeMenu}><span>04</span>The Fleet</a><a href="#contact" onClick={closeMenu}><span>05</span>Contact</a><div className="menu-contact"><a href="tel:+263780167274">+263 78 016 7274</a><small>Location available to serious clients only.</small></div></div></aside>
      <section className="hero" id="top">
        <Image src="/fleet/bentley-front.jpg" alt="Bentley Bentayga from the Wally VIP Rentals fleet" fill className="hero-image" priority sizes="100vw" />
        <div className="hero-shade" /><div className="hero-copy"><p className="eyebrow">Prestigious, private, personal</p><h1>Drive with<br /><span>distinction.</span></h1><div className="hero-bottom"><p>Luxury and executive vehicle rentals for business, celebrations and unforgettable arrivals in Harare.</p><a href="#fleet" className="explore">Explore the fleet <b>↓</b></a></div></div>
        <div className="hero-categories"><button onClick={()=>{choose(0);document.querySelector("#fleet")?.scrollIntoView()}}><Image src="/fleet/bentley-front.jpg" alt="Luxury collection" fill sizes="190px"/><span>Luxury</span></button><button onClick={()=>{choose(4);document.querySelector("#fleet")?.scrollIntoView()}}><Image src="/fleet/mercedes-gle-blue.jpg" alt="Executive SUVs" fill sizes="190px"/><span>Executive SUV</span></button><button onClick={()=>{choose(5);document.querySelector("#fleet")?.scrollIntoView()}}><Image src="/fleet/toyota-hilux.jpg" alt="Premium utility vehicles" fill sizes="190px"/><span>Premium Utility</span></button></div>
        <a className="scroll-cue" href="#about"><span>Scroll to discover</span><i><b>↓</b></i></a>
        <p className="hero-index">01 / WALLY</p><div className="availability"><span /> CONCIERGE ONLINE</div>
        <section className="quick-book" aria-label="Quick reservation"><div className="booking-heading"><span>01</span><div><p>Start your reservation</p><strong>Find your Wally vehicle</strong></div></div><label><span>Preferred vehicle</span><select value={request.vehicle} onChange={(e)=>setRequest({...request,vehicle:e.target.value})}><option>Any luxury vehicle</option>{fleet.map(car=><option key={car.name}>{car.name}</option>)}</select></label><label><span>Requirement</span><select value={request.purpose} onChange={(e)=>setRequest({...request,purpose:e.target.value})}><option>Executive travel</option><option>Wedding or celebration</option><option>Airport collection</option><option>Private occasion</option></select></label><label><span>Rental date</span><input type="date" value={request.date} onChange={(e)=>setRequest({...request,date:e.target.value})}/></label><a href={bookingLink} target="_blank" rel="noreferrer">Check availability <b>↗</b></a></section>
      </section>
      <section className="trust-strip"><div><span>01</span><strong>Luxury collection</strong><p>Vehicles selected for presence and comfort.</p></div><div><span>02</span><strong>Private concierge</strong><p>Every enquiry handled personally.</p></div><div><span>03</span><strong>Harare based</strong><p>Serving local and visiting clients.</p></div><div><span>04</span><strong>Discreet service</strong><p>Your plans remain your business.</p></div></section>
      <section className="manifesto" id="about"><p className="vertical-mark">WALLY / PRIVATE FLEET</p><div className="manifesto-copy" data-reveal><p className="section-label">About Wally VIP Rentals</p><h2>Not a rental.<br />A <em>presence.</em></h2><p>Wally VIP Rentals connects discerning clients with a hand-selected collection of prestigious vehicles in Harare. Every reservation begins with a personal conversation, allowing us to understand the occasion and recommend the right arrival.</p></div><div className="manifesto-photo" data-reveal><Image src="/fleet/rolls-phantom.jpg" alt="White Rolls-Royce arriving at dusk" fill sizes="(max-width: 800px) 85vw, 40vw" /><span className="photo-caption">After dark / Harare</span></div></section>
      <section className="services" id="services"><div className="services-intro" data-reveal><p className="section-label">Rental experiences</p><h2>For the moments<br />that <em>matter.</em></h2><p>Whether the day calls for executive composure or unmistakable celebration, our collection gives every itinerary the right presence.</p></div><div className="service-list"><article data-reveal><span>01</span><div><h3>Executive Travel</h3><p>Refined vehicles for business schedules, private meetings and distinguished guests.</p></div><b>BUSINESS</b></article><article data-reveal><span>02</span><div><h3>Weddings & Celebrations</h3><p>A memorable arrival for ceremonies, milestone events and private occasions.</p></div><b>OCCASION</b></article><article data-reveal><span>03</span><div><h3>Airport & VIP Collection</h3><p>Begin or conclude the journey with comfort, privacy and a vehicle worthy of the guest.</p></div><b>TRANSFER</b></article></div></section>
      <section className="fleet" id="fleet"><header data-reveal><p className="section-label">The private collection</p><h2>Choose your<br /><em>entrance.</em></h2><p>Every vehicle is presented with care and reserved personally through our concierge.</p></header><div className="fleet-stage" data-reveal>{fleet.map((car, index) => <div className={`fleet-image ${index === active ? "active" : ""}`} key={car.name}><Image src={car.image} alt={car.name} fill sizes="(max-width: 800px) 92vw, 62vw" /></div>)}<div className="fleet-number">0{active + 1}</div><div className="fleet-controls"><button onClick={() => choose(active - 1)} aria-label="Previous vehicle">←</button><span>{String(active + 1).padStart(2,"0")} / {String(fleet.length).padStart(2,"0")}</span><button onClick={() => choose(active + 1)} aria-label="Next vehicle">→</button></div></div><div className="fleet-detail" key={active}><div><p>{fleet[active].type}</p><h3>{fleet[active].name}</h3></div><p>{fleet[active].note}</p><a href={`https://wa.me/263780167274?text=${encodeURIComponent(`Hello Wally VIP Rentals, I would like to enquire about the ${fleet[active].name}.`)}`} target="_blank" rel="noreferrer">Enquire about this vehicle <span>↗</span></a></div><div className="fleet-rail" aria-label="Select a vehicle">{fleet.map((car,index)=><button className={index===active?"active":""} onClick={()=>choose(index)} key={car.name}><span>0{index+1}</span>{car.name}</button>)}</div></section>
      <section className="service-story"><div className="service-image" data-reveal><Image src="/fleet/rolls-cullinan.jpg" alt="Luxury SUV prepared for a Wally VIP client" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="service-copy" data-reveal><p className="section-label">One call. Consider it handled.</p><h2>Luxury is<br /><em>effortless.</em></h2><div className="steps"><div><span>01</span><h3>Choose</h3><p>Tell us the vehicle, date and occasion.</p></div><div><span>02</span><h3>Confirm</h3><p>Your private concierge finalises the details.</p></div><div><span>03</span><h3>Arrive</h3><p>Immaculate, on time, ready for you.</p></div></div><a className="gold-link" href={whatsapp} target="_blank" rel="noreferrer">Speak to the concierge ↗</a></div></section>
      <section className="mosaic" aria-label="More from the fleet"><div data-reveal><Image src="/fleet/mercedes-c-class.jpg" alt="Mercedes-Benz C-Class" fill sizes="40vw" /></div><p data-reveal>From decisive business travel to the celebration of a lifetime.</p><div data-reveal><Image src="/fleet/mercedes-gle-coupe.jpg" alt="Mercedes-Benz GLE Coupe" fill sizes="40vw" /></div></section>
      <section className="rental-info"><div className="info-intro" data-reveal><p className="section-label">Before you reserve</p><h2>Clear details.<br /><em>Private service.</em></h2></div><div className="info-columns"><article data-reveal><span>01</span><h3>How to enquire</h3><p>Select a vehicle or share your requirements through WhatsApp. Include your preferred date and occasion so the concierge can assist quickly.</p></article><article data-reveal><span>02</span><h3>Availability</h3><p>Fleet availability is confirmed personally. Early enquiries are recommended for weddings, major events and peak travel dates.</p></article><article data-reveal><span>03</span><h3>Collection & location</h3><p className="private-location">Location available to serious clients only.</p><p>Full collection details are shared privately after a genuine rental enquiry has been reviewed.</p></article></div><a href={bookingLink} target="_blank" rel="noreferrer" className="info-cta">Make a serious enquiry <span>↗</span></a></section>
      <section className="finale" id="contact"><Image src="/fleet/bentley-mulsanne.jpg" alt="Bentley Mulsanne from the Wally fleet" fill sizes="100vw" /><div className="finale-shade" /><div className="finale-copy" data-reveal><p className="section-label">Your next arrival</p><h2>Make it<br /><em>unforgettable.</em></h2><a href={whatsapp} target="_blank" rel="noreferrer">Reserve via WhatsApp <span>↗</span></a><a className="phone" href="tel:+263780167274">+263 78 016 7274</a></div></section>
      <footer><div className="footer-brand"><Image src="/fleet/wally-logo.png" alt="Wally VIP Rentals" width={120} height={120}/><p>Private luxury mobility<br />Harare, Zimbabwe</p></div><div><p>ENQUIRIES</p><a href="tel:+263780167274">+263 78 016 7274</a><a href={whatsapp}>WhatsApp concierge</a></div><div><p>NAVIGATE</p><a href="#about">About Wally</a><a href="#services">Services</a><a href="#fleet">The fleet</a></div><span className="copyright">© 2026 WALLY VIP RENTALS</span></footer>
      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Book on WhatsApp">W <span>Concierge</span></a>
    </main>
  );
}
