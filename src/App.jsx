import React, { useEffect, useState } from "react";

const LOGO_SRC = "/logo.svg";

// Endre bare disse hvis GitHub-repoet får et annet navn eller eier.
const GITHUB_OWNER = "olejhau";
const GITHUB_REPO = "lonnstad-bygdeservice";
const GITHUB_BRANCH = "main";

const HERO_IMAGE_FOLDER = "bilder/hero";
const GALLERY_IMAGE_FOLDER = "bilder/galleri";

const SERVICE_ICONS = {
  transport: "/icons/trucking-truck.svg",
  leiekjoring: "/icons/tractor.svg",
  landbruk: "/icons/wheat.svg",
  reparasjoner: "/icons/tools.svg",
  veivedlikehold: "/icons/dumper-truck.svg",
  anleggsarbeid: "/icons/dumper-truck.svg",
  graving: "/icons/excavator.svg",
  trefelling: "/icons/tree.svg",
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [bilder, setBilder] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
    to_email: "jotormh@online.no",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });

  const tjenester = [
    { title: "Transport", icon: SERVICE_ICONS.transport },
    { title: "Leiekjøring", icon: SERVICE_ICONS.leiekjoring },
    { title: "Landbruk", icon: SERVICE_ICONS.landbruk },
    { title: "Reparasjoner", icon: SERVICE_ICONS.reparasjoner },
    { title: "Veivedlikehold", icon: SERVICE_ICONS.veivedlikehold },
    { title: "Anleggsarbeid", icon: SERVICE_ICONS.anleggsarbeid },
    { title: "Graving", icon: SERVICE_ICONS.graving },
    { title: "Trefelling", icon: SERVICE_ICONS.trefelling },
  ];

  const heroSlides = [
    "Transport, landbruk og anlegg",
    "Veivedlikehold og graving",
    "Praktisk hjelp for private og næring",
  ];

  const activeHeroImage = heroImages.length ? heroImages[activeSlide % heroImages.length] : null;

  useEffect(() => {
    async function hentBilderFraGithub() {
      const [hero, galleri] = await Promise.all([
        hentGithubBilder(HERO_IMAGE_FOLDER),
        hentGithubBilder(GALLERY_IMAGE_FOLDER),
      ]);

      setHeroImages(hero.slice(0, 3));
      setBilder(galleri.slice(0, 15));
    }

    hentBilderFraGithub();
  }, []);

  useEffect(() => {
    const slideCount = heroImages.length || heroSlides.length;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    if (window.emailjs) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: "rMLcYfRxvLAxe13ur" });
      }
    };
    document.body.appendChild(script);
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function nextGallery() {
    if (!bilder.length) return;
    setGalleryIndex((prev) => (prev + 1) % bilder.length);
  }

  function prevGallery() {
    if (!bilder.length) return;
    setGalleryIndex((prev) => (prev - 1 + bilder.length) % bilder.length);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "sending", message: "Sender..." });

    if (!form.consent) {
      setStatus({ type: "error", message: "Du må samtykke før meldingen kan sendes." });
      return;
    }

    try {
      if (!window.emailjs) {
        throw new Error("EmailJS er ikke lastet inn ennå.");
      }

      await window.emailjs.send("service_r2q8u3s", "template_zo1skyk", form);
      setStatus({ type: "success", message: "Takk! Meldingen er sendt. Vi tar kontakt med deg så snart som mulig." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "", consent: false, to_email: "jotormh@online.no" });
    } catch (error) {
      console.error("EmailJS-feil:", error);
      setStatus({ type: "error", message: "Beklager, noe gikk galt. Prøv igjen eller kontakt oss direkte på e-post." });
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#hjem" className="block w-[230px] max-w-[55vw]">
            <Logo />
          </a>
          <nav className="hidden items-center gap-10 text-sm font-semibold md:flex">
            <a className="nav-link active" href="#hjem">Hjem</a>
            <a className="nav-link" href="#tjenester">Tjenester</a>
            <a className="nav-link" href="#bilder">Bilder</a>
            <a className="nav-link" href="#om">Om oss</a>
            <a className="nav-link" href="#kontakt">Kontakt</a>
          </nav>
        </div>
      </header>

      <section id="hjem" className="relative min-h-[520px] overflow-hidden bg-neutral-950 text-white">
        {activeHeroImage ? (
          <img src={activeHeroImage.preview} alt={activeHeroImage.title} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        ) : (
          <div className="absolute inset-0 opacity-50"><HeroMachineScene /></div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(255,255,255,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.55),rgba(0,0,0,0.28))]" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">Lønnstad<br />Bygdeservice</h1>
            <p className="mt-6 max-w-xl text-xl leading-8 text-white/90">Service på bygda i Lillehammer og omegn</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/70">{heroSlides[activeSlide % heroSlides.length]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#tjenester" className="rounded-md bg-white px-7 py-4 text-sm font-black text-neutral-950 shadow-lg transition hover:bg-neutral-100">MINE TJENESTER</a>
              <a href="#kontakt" className="rounded-md border border-white/70 bg-black/20 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-neutral-950">Kontakt oss</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {(heroImages.length ? heroImages : heroSlides).map((_, index) => (
            <button key={index} type="button" onClick={() => setActiveSlide(index)} className={`h-3 w-3 rounded-full border border-white ${activeSlide % (heroImages.length || heroSlides.length) === index ? "bg-white" : "bg-white/20"}`} aria-label={`Vis hero-bilde ${index + 1}`} />
          ))}
        </div>
      </section>

      <section id="tjenester" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em]">MINE TJENESTER</p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">Jeg hjelper deg med det meste</h2>
        <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {tjenester.map((tjeneste) => (
            <article key={tjeneste.title} className="border-r border-neutral-200 px-5 py-6 text-center last:border-r-0">
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <img src={tjeneste.icon} alt="" className="h-11 w-11 object-contain" />
              </div>
              <h3 className="mt-4 text-lg font-black">{tjeneste.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="bilder" className="bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em]">BILDER FRA MITT ARBEID</p>
          <div className="relative mt-10">
            <button type="button" onClick={prevGallery} className="carousel-arrow left-[-18px] md:left-[-34px]">‹</button>
            <div className="grid gap-4 md:grid-cols-5">
              {bilder.length ? (
                getVisibleImages(bilder, galleryIndex, 5).map((bilde, index) => (
                  <div key={`${bilde.title}-${index}-${galleryIndex}`} className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm">
                    <img src={bilde.preview} alt={bilde.title} className="h-48 w-full object-cover" />
                  </div>
                ))
              ) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-48 rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-200 to-neutral-400 shadow-sm" />
                ))
              )}
            </div>
            <button type="button" onClick={nextGallery} className="carousel-arrow right-[-18px] md:right-[-34px]">›</button>
          </div>
        </div>
      </section>

      <section id="kontakt" className="px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-neutral-200 bg-white md:grid-cols-[0.9fr_1.6fr]">
          <div className="border-b border-neutral-200 p-8 md:border-b-0 md:border-r">
            <h2 className="text-2xl font-black">Kontaktinformasjon</h2>
            <div className="mt-8 space-y-7 text-neutral-900">
              <ContactLine icon="☎" title="970 10 163" text="Jostein Haugen" href="tel:97010163" />
              <ContactLine icon="●" title="Søre Jørstad veg 54" text="2625 Fåberg" />
              <ContactLine icon="✉" title="jotormh@online.no" text="" href="mailto:jotormh@online.no" />
              <ContactLine icon="◷" title="Ta kontakt for avtale" text="" />
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-black">Send oss en melding</h2>
            <form onSubmit={handleSubmit} className="mt-7">
              <input type="hidden" name="to_email" value="jotormh@online.no" />
              <div className="grid gap-4 md:grid-cols-3">
                <input className="field" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Navn *" required />
                <input className="field" type="email" name="email" value={form.email} onChange={handleChange} placeholder="E-post *" required />
                <input className="field" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon *" required />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-[0.65fr_1.35fr]">
                <select className="field" name="subject" value={form.subject} onChange={handleChange} required>
                  <option value="">Hva gjelder det?</option>
                  {tjenester.map((t) => <option key={t.title}>{t.title}</option>)}
                </select>
                <textarea className="field min-h-[132px] resize-y" name="message" value={form.message} onChange={handleChange} placeholder="Din melding *" required />
              </div>
              <label className="mt-5 flex items-start gap-3 text-sm text-neutral-500">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required className="mt-1" />
                <span>Jeg samtykker til at opplysningene mine brukes for å svare på henvendelsen.</span>
              </label>
              <button type="submit" disabled={status.type === "sending"} className="mt-5 rounded-md bg-neutral-950 px-8 py-4 text-sm font-black text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400">
                {status.type === "sending" ? "Sender..." : "Send melding"}
              </button>
              {status.message && <p className={`mt-4 text-sm font-bold ${status.type === "success" ? "text-green-700" : status.type === "error" ? "text-red-700" : "text-neutral-600"}`}>{status.message}</p>}
            </form>
          </div>
        </div>
      </section>

      <section id="om" className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="rounded-2xl bg-neutral-100 p-8 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.18em]">Om oss</p>
          <h2 className="mt-3 text-3xl font-black">Lokal hjelp med solid praktisk erfaring</h2>
          <p className="mt-4 max-w-3xl whitespace-pre-line text-lg leading-8 text-neutral-600">Jostein Haugen er utdannet mekaniker og har over 40 års erfaring med tunge kjøretøy og maskiner. Han har jobbet som maskinfører og har solid kompetanse på alt fra lastebiler til tråkkemaskiner og gravemaskiner, med særlig god forståelse for hydraulikk.

Gjennom Lønnstad Bygdeservice tilbyr han pålitelig og allsidig hjelp innen blant annet veivedlikehold, brøyting, massetransport, leiekjøring, landbruksarbeid og reparasjon av anleggs- og landbruksutstyr. Han legger vekt på kvalitet, erfaring og praktiske løsninger tilpasset kundenes behov.</p>
        </div>
      </section>

      <section id="kart" className="bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.18em]">Kart</p>
          <h2 className="mt-3 text-3xl font-black">Her holder vi til</h2>
          <p className="mt-3 text-neutral-600">Søre Jørstad veg 54, 2625 Fåberg</p>
          <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
            <iframe title="Kart til Søre Jørstad veg 54, 2625 Fåberg" src="https://www.google.com/maps?q=S%C3%B8re%20J%C3%B8rstad%20veg%2054%2C%202625%20F%C3%A5berg&output=embed" width="100%" height="420" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full" />
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 px-5 py-9 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="w-[230px]"><Logo footer /></div>
          <p className="text-sm text-white/80">© {new Date().getFullYear()} Lønnstad Bygdeservice. Alle rettigheter reservert.</p>
          <p className="text-sm text-white/80">Nettside levert med stolthet.</p>
        </div>
      </footer>
    </main>
  );
}

async function hentGithubBilder(folderPath) {
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${folderPath}?ref=${GITHUB_BRANCH}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Kunne ikke hente bilder fra ${folderPath}`);

    const files = await response.json();
    if (!Array.isArray(files)) return [];

    const imageFiles = files
      .filter((file) => file.type === "file")
      .filter((file) => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name));

    const filesWithDates = await Promise.all(
      imageFiles.map(async (file) => ({
        title: file.name.replace(/\.[^/.]+$/, ""),
        preview: file.download_url,
        updatedAt: await hentSisteCommitDato(file.path),
      }))
    );

    return filesWithDates.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function hentSisteCommitDato(filePath) {
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${encodeURIComponent(filePath)}&sha=${GITHUB_BRANCH}&per_page=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return 0;

    const commits = await response.json();
    const date = commits?.[0]?.commit?.committer?.date || commits?.[0]?.commit?.author?.date;
    return date ? new Date(date).getTime() : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function getVisibleImages(items, start, count) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(count, items.length) }, (_, i) => items[(start + i) % items.length]);
}

function Logo({ footer = false }) {
  return <img src={LOGO_SRC} alt="Lønnstad Bygdeservice logo" className={`h-auto w-full object-contain ${footer ? "brightness-0 invert" : ""}`} />;
}

function HeroMachineScene() {
  return (
    <svg viewBox="0 0 1400 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs><linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a9b8c8" /><stop offset="1" stopColor="#4a5a4d" /></linearGradient></defs>
      <rect width="1400" height="520" fill="url(#sky)" />
      <path d="M0 265 C170 180 310 220 500 170 C690 120 770 240 980 170 C1140 120 1270 170 1400 105 L1400 520 L0 520 Z" fill="#1f2b22" opacity="0.8" />
      <path d="M0 310 C200 230 390 280 570 230 C750 180 920 280 1110 230 C1230 200 1320 210 1400 180 L1400 520 L0 520 Z" fill="#2e3b2f" opacity="0.9" />
      <path d="M0 380 C150 350 330 365 520 340 C760 310 1010 340 1400 290 L1400 520 L0 520 Z" fill="#4a3a2b" />
      <g transform="translate(130 265) scale(1.15)" fill="#151515"><rect x="60" y="60" width="230" height="75" rx="8" /><rect x="105" y="15" width="90" height="65" rx="8" /><rect x="205" y="42" width="120" height="58" rx="5" /><circle cx="105" cy="148" r="55" /><circle cx="275" cy="148" r="42" /><circle cx="105" cy="148" r="25" fill="#333" /><circle cx="275" cy="148" r="19" fill="#333" /></g>
      <g transform="translate(765 165) scale(1.1)" fill="#c48b2a"><rect x="285" y="147" width="140" height="86" rx="8" fill="#171717" /><rect x="322" y="92" width="72" height="70" rx="5" fill="#171717" /><path d="M55 185 L175 140 L290 35 L315 58 L198 165 L72 215 Z" /><path d="M280 42 L350 10 L367 31 L305 67 Z" /><rect x="30" y="212" width="190" height="35" rx="17" fill="#171717" /><rect x="255" y="230" width="200" height="34" rx="17" fill="#171717" /><path d="M45 210 C20 205 12 230 25 245 L72 245 C52 235 54 220 45 210Z" fill="#171717" /></g>
    </svg>
  );
}

function ContactLine({ icon, title, text, href }) {
  const content = <><p className="font-semibold leading-tight">{title}</p>{text && <p className="mt-1 text-neutral-600">{text}</p>}</>;
  return <div className="flex gap-5"><div className="flex h-9 w-9 shrink-0 items-center justify-center text-2xl font-black">{icon}</div><div>{href ? <a href={href} className="hover:underline">{content}</a> : content}</div></div>;
}
