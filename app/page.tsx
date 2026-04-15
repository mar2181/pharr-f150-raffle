"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "es";

const WHATSAPP_NUMBER = "14245223188";
const WHATSAPP_DISPLAY = "+1 (424) 522-3188";
const TOTAL_TICKETS = 300;

// Replace this array as your friend sells tickets live.
// Any number listed here will render as SOLD on the live board.
const SOLD_NUMBERS: number[] = [];

const copy = {
  en: {
    nav: {
      prize: "The Truck",
      how: "How It Works",
      board: "Live Board",
      faq: "FAQ",
      claim: "Claim a Number",
    },
    lang: "ES",
    hero: {
      kicker: "McAllen • Rio Grande Valley • 956",
      title1: "Your Number.",
      title2: "Your Price.",
      title3: "Your Shot at a 2020 F-150.",
      sub: "300 tickets. Prices from $1 to $300. Same exact odds on every single one. Feeling lucky? You could be driving home a truck for a single dollar.",
      cta1: "Claim My Number",
      cta2: "See Live Board",
      badge: "Limited to 300 entries — once they're gone, they're gone.",
    },
    twist: {
      tag: "The Twist",
      title: "This isn't your average raffle.",
      body: "Every other raffle makes you pay the same price as everyone else. Not this one. Here, the price is part of the gamble — and that's what makes it fun.",
      bullets: [
        {
          t: "300 tickets, numbered 1 through 300.",
          d: "No more, no less. When we hit 300, it's over.",
        },
        {
          t: "Your number is assigned at random.",
          d: "You don't get to pick. We pull it for you — digital or live draw.",
        },
        {
          t: "Your number = what you pay.",
          d: "Ticket #1 pays $1. Ticket #47 pays $47. Ticket #300 pays $300. Simple.",
        },
        {
          t: "Every ticket has the exact same odds.",
          d: "The $1 ticket and the $300 ticket are identical when the winner gets pulled. 1-in-300 either way.",
        },
      ],
      kicker:
        "Roll the dice. The person who wins this truck for a single dollar is going to be telling the story for the rest of their life.",
    },
    prize: {
      tag: "The Prize",
      title: "2020 Ford F-150",
      subtitle: "4-Door • White • 129,000 miles • Clean and ready to roll.",
      specs: [
        { k: "Year", v: "2020" },
        { k: "Make", v: "Ford" },
        { k: "Model", v: "F-150" },
        { k: "Cab", v: "4-Door" },
        { k: "Mileage", v: "129,000 mi" },
        { k: "Color", v: "White" },
      ],
      note: "This is the actual truck. Not a stock photo, not a swap — the winner gets this F-150, handed over in McAllen.",
    },
    how: {
      tag: "How It Works",
      title: "Four steps. That's it.",
      steps: [
        {
          n: "01",
          t: "Reach out on WhatsApp",
          d: "Message or call the number at the bottom. Tell us you want in.",
        },
        {
          n: "02",
          t: "Get your random number",
          d: "We pull a number 1–300 for you. Whatever comes up is yours.",
        },
        {
          n: "03",
          t: "Pay exactly that in dollars",
          d: "Got #12? Pay $12. Got #250? Pay $250. Your ticket is locked in the moment you pay.",
        },
        {
          n: "04",
          t: "Watch the live board",
          d: "Your number turns sold on this page. Drawing happens once all 300 are claimed.",
        },
      ],
    },
    board: {
      tag: "Live Ticket Board",
      title: "Updated the moment a ticket is claimed.",
      sub: "Every ticket sold to a live buyer shows up here in real time. No guesswork. Check back any time to see which numbers are still up for grabs — and which ones are gone forever.",
      available: "Available",
      sold: "Sold",
      legendAvail: "Available",
      legendSold: "Sold",
    },
    why: {
      tag: "Why People Are Talking",
      title: "A raffle with a real chance at a near-free truck.",
      items: [
        {
          t: "It's a gamble — in a good way.",
          d: "You might pay $1. You might pay $300. Either way, you're in a 1-in-300 shot at a real F-150.",
        },
        {
          t: "It's transparent.",
          d: "Every number sold shows up on the live board on this page. No hidden tickets, no mystery numbers.",
        },
        {
          t: "It's local.",
          d: "Run out of McAllen, for the Rio Grande Valley. You know where the truck is and where the drawing happens.",
        },
        {
          t: "The math is simple.",
          d: "Max the organizer could collect is the sum of 1 through 300 — roughly the value of the truck. No markup, no middleman.",
        },
      ],
    },
    faq: {
      tag: "FAQ",
      title: "Questions, answered.",
      items: [
        {
          q: "Can I pick my own number?",
          a: "No — and that's the whole point. Numbers are assigned at random so nobody can cherry-pick the cheap ones.",
        },
        {
          q: "What if I get #300 and don't want to pay $300?",
          a: "No hard feelings. If you pass, the number goes back in the pool and we pull a new one for someone else.",
        },
        {
          q: "How do I know a number is actually sold?",
          a: "The live board on this page updates the moment a buyer pays. If you see it crossed out, it's gone.",
        },
        {
          q: "When is the drawing?",
          a: "Once all 300 numbers are claimed. Exact date, time, and payment method will be posted here and sent to every ticket holder.",
        },
        {
          q: "How do I enter?",
          a: "Message or call us on WhatsApp. We'll walk you through it.",
        },
        {
          q: "Is this legit?",
          a: "100%. It's a private, community raffle run out of McAllen. The truck is real, the numbers are real, and the board on this page is your proof.",
        },
      ],
    },
    cta: {
      title: "Ready to roll the dice?",
      sub: "One message is all it takes. Your random number gets pulled, and you find out what this truck is going to cost you.",
      button: "Message on WhatsApp",
      or: "or call",
    },
    footer: {
      line1: "Private raffle — McAllen, TX / Rio Grande Valley.",
      line2: "Exact drawing date, time, and payment details coming soon.",
      rights: "© 2026 — All rights reserved.",
    },
  },
  es: {
    nav: {
      prize: "La Troca",
      how: "Cómo Funciona",
      board: "Tablero en Vivo",
      faq: "Preguntas",
      claim: "Apartar Número",
    },
    lang: "EN",
    hero: {
      kicker: "McAllen • Valle del Río Grande • 956",
      title1: "Tu Número.",
      title2: "Tu Precio.",
      title3: "Tu Chance de Ganarte una F-150 2020.",
      sub: "300 boletos. Precios desde $1 hasta $300. Las mismas probabilidades en cada uno. ¿Te sientes con suerte? Te puedes llevar la troca a la casa por un solo dólar.",
      cta1: "Apartar Mi Número",
      cta2: "Ver Tablero en Vivo",
      badge: "Solo 300 boletos — cuando se acaban, se acaban.",
    },
    twist: {
      tag: "El Truco",
      title: "Esta no es una rifa normal.",
      body: "En las rifas normales todos pagan lo mismo. Aquí no. Aquí el precio es parte del juego — y eso es lo que la hace divertida.",
      bullets: [
        {
          t: "300 boletos, numerados del 1 al 300.",
          d: "Ni más, ni menos. Cuando llegamos a 300, se acabó.",
        },
        {
          t: "Tu número es al azar.",
          d: "Tú no escoges. Nosotros lo sacamos — por sorteo digital o en vivo.",
        },
        {
          t: "Tu número = lo que pagas.",
          d: "Boleto #1 paga $1. Boleto #47 paga $47. Boleto #300 paga $300. Así de fácil.",
        },
        {
          t: "Todos los boletos tienen las mismas probabilidades.",
          d: "El boleto de $1 y el de $300 son idénticos cuando sale el ganador. 1 entre 300, igualito.",
        },
      ],
      kicker:
        "Aviéntate. La persona que se gane esta troca por un dólar va a contar la historia el resto de su vida.",
    },
    prize: {
      tag: "El Premio",
      title: "Ford F-150 2020",
      subtitle: "4 puertas • Blanca • 129,000 millas • Limpia y lista.",
      specs: [
        { k: "Año", v: "2020" },
        { k: "Marca", v: "Ford" },
        { k: "Modelo", v: "F-150" },
        { k: "Cabina", v: "4 puertas" },
        { k: "Millaje", v: "129,000 mi" },
        { k: "Color", v: "Blanca" },
      ],
      note: "Esta es la troca real. No es foto de catálogo. El ganador se lleva esta F-150, entregada en McAllen.",
    },
    how: {
      tag: "Cómo Funciona",
      title: "Cuatro pasos. Nada más.",
      steps: [
        {
          n: "01",
          t: "Escríbenos por WhatsApp",
          d: "Manda mensaje o llama al número de abajo. Dinos que quieres entrar.",
        },
        {
          n: "02",
          t: "Recibe tu número al azar",
          d: "Te sacamos un número del 1 al 300. El que salga, tuyo es.",
        },
        {
          n: "03",
          t: "Paga justo esa cantidad",
          d: "¿Te tocó el #12? Pagas $12. ¿Te tocó el #250? Pagas $250. Tu boleto queda apartado al pagar.",
        },
        {
          n: "04",
          t: "Checa el tablero en vivo",
          d: "Tu número aparece como vendido en esta página. El sorteo se hace cuando se apartan los 300.",
        },
      ],
    },
    board: {
      tag: "Tablero en Vivo",
      title: "Se actualiza al momento de cada venta.",
      sub: "Cada boleto vendido a un comprador real aparece aquí al instante. Sin adivinanzas. Regresa cuando quieras para ver qué números siguen disponibles — y cuáles ya se fueron.",
      available: "Disponibles",
      sold: "Vendidos",
      legendAvail: "Disponible",
      legendSold: "Vendido",
    },
    why: {
      tag: "Por Qué La Gente Está Hablando",
      title: "Una rifa con una posibilidad real de llevarse una troca casi gratis.",
      items: [
        {
          t: "Es un juego — del bueno.",
          d: "Tal vez pagas $1. Tal vez pagas $300. De cualquier modo, traes 1 en 300 chances de ganarte una F-150 real.",
        },
        {
          t: "Es transparente.",
          d: "Cada número vendido aparece en el tablero de esta página. Sin boletos escondidos, sin números misteriosos.",
        },
        {
          t: "Es local.",
          d: "Desde McAllen, para todo el Valle. Sabes dónde está la troca y dónde es el sorteo.",
        },
        {
          t: "Las cuentas son claras.",
          d: "Lo máximo que se junta es la suma del 1 al 300 — más o menos el valor de la troca. Sin sobreprecio, sin intermediarios.",
        },
      ],
    },
    faq: {
      tag: "Preguntas Frecuentes",
      title: "Respuestas claras.",
      items: [
        {
          q: "¿Puedo escoger mi número?",
          a: "No — y esa es la gracia. Los números son al azar para que nadie se quede con los baratos nomás.",
        },
        {
          q: "¿Y si me toca el #300 y no quiero pagar $300?",
          a: "No hay bronca. Si no puedes, el número regresa a la bolsa y sacamos otro para alguien más.",
        },
        {
          q: "¿Cómo sé que un número ya está vendido?",
          a: "El tablero en vivo de esta página se actualiza al momento en que un comprador paga. Si lo ves tachado, ya se fue.",
        },
        {
          q: "¿Cuándo es el sorteo?",
          a: "Cuando los 300 números estén apartados. La fecha exacta, la hora, y el método de pago se publican aquí y se avisan a cada boleto.",
        },
        {
          q: "¿Cómo entro?",
          a: "Mándanos mensaje o llámanos por WhatsApp. Nosotros te guiamos.",
        },
        {
          q: "¿Esto es real?",
          a: "100%. Es una rifa privada, local, desde McAllen. La troca es real, los números son reales, y el tablero de esta página es tu prueba.",
        },
      ],
    },
    cta: {
      title: "¿Listo para tirar el dado?",
      sub: "Un mensaje es todo lo que se necesita. Te sacamos tu número al azar y descubres cuánto te va a costar esta troca.",
      button: "Mensaje por WhatsApp",
      or: "o llama",
    },
    footer: {
      line1: "Rifa privada — McAllen, TX / Valle del Río Grande.",
      line2: "Fecha, hora y método de pago del sorteo próximamente.",
      rights: "© 2026 — Todos los derechos reservados.",
    },
  },
} as const;

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem("raffle-lang") as Lang | null)
        : null;
    if (saved === "en" || saved === "es") {
      setLang(saved);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.language?.startsWith("es")) {
      setLang("es");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("raffle-lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = copy[lang];

  const soldSet = useMemo(() => new Set(SOLD_NUMBERS), []);
  const availableCount = TOTAL_TICKETS - soldSet.size;
  const soldCount = soldSet.size;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === "es"
      ? "Hola — quiero entrar a la rifa de la F-150."
      : "Hey — I want in on the F-150 raffle."
  )}`;

  return (
    <main className="flex-1">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="#top" className="font-black tracking-tight text-lg">
            <span className="text-white">F-150</span>
            <span className="text-[var(--accent)]"> RAFFLE</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
            <a href="#prize" className="hover:text-white">
              {t.nav.prize}
            </a>
            <a href="#how" className="hover:text-white">
              {t.nav.how}
            </a>
            <a href="#board" className="hover:text-white">
              {t.nav.board}
            </a>
            <a href="#faq" className="hover:text-white">
              {t.nav.faq}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="btn-ghost text-xs font-bold px-3 py-2 rounded-full"
              aria-label="Toggle language"
            >
              {t.lang}
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2 rounded-full hidden sm:inline-block"
            >
              {t.nav.claim}
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="hero-grid relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-24 md:pt-28 md:pb-36 relative">
          <p className="uppercase tracking-[0.25em] text-xs text-[var(--accent-2)] font-bold mb-5">
            {t.hero.kicker}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.02] tracking-tight">
            {t.hero.title1}
            <br />
            {t.hero.title2}
            <br />
            <span className="glow text-[var(--accent-2)]">{t.hero.title3}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-7 py-4 rounded-full text-base"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#board"
              className="btn-ghost px-7 py-4 rounded-full text-base font-semibold"
            >
              {t.hero.cta2}
            </a>
          </div>
          <div className="mt-10 inline-flex items-center gap-3 text-xs text-white/60 border border-white/10 bg-white/5 rounded-full px-4 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            {t.hero.badge}
          </div>
        </div>
      </section>

      {/* THE TWIST */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
            {t.twist.tag}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight max-w-3xl">
            {t.twist.title}
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-3xl leading-relaxed">
            {t.twist.body}
          </p>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.twist.bullets.map((b, i) => (
              <li key={i} className="card rounded-2xl p-6">
                <div className="text-[var(--accent-2)] font-black text-xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-xl font-bold text-white">{b.t}</div>
                <div className="mt-2 text-white/65 leading-relaxed">{b.d}</div>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-xl md:text-2xl font-semibold text-white/90 max-w-3xl leading-snug border-l-4 border-[var(--accent)] pl-5">
            {t.twist.kicker}
          </p>
        </div>
      </section>

      {/* PRIZE */}
      <section id="prize" className="py-24 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
            {t.prize.tag}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
            {t.prize.title}
          </h2>
          <p className="mt-4 text-lg text-white/70">{t.prize.subtitle}</p>

          <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">
            <div className="card rounded-3xl aspect-[4/3] flex items-center justify-center text-white/30 text-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent-2)]/10" />
              <span className="relative">2020 Ford F-150 • Photo</span>
            </div>
            <div className="card rounded-3xl p-7">
              <dl className="grid grid-cols-2 gap-y-5 gap-x-6">
                {t.prize.specs.map((s) => (
                  <div key={s.k}>
                    <dt className="text-xs uppercase tracking-widest text-white/40">
                      {s.k}
                    </dt>
                    <dd className="mt-1 text-lg font-bold text-white">{s.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-7 text-sm text-white/60 leading-relaxed border-t border-white/10 pt-5">
                {t.prize.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
            {t.how.tag}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
            {t.how.title}
          </h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.how.steps.map((s) => (
              <div key={s.n} className="card rounded-2xl p-6">
                <div className="text-[var(--accent-2)] font-black text-3xl">{s.n}</div>
                <div className="mt-3 text-lg font-bold text-white">{s.t}</div>
                <div className="mt-2 text-sm text-white/65 leading-relaxed">
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE BOARD */}
      <section id="board" className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
            {t.board.tag}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
            {t.board.title}
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-3xl leading-relaxed">
            {t.board.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <div className="card rounded-full px-5 py-2">
              <span className="text-white/50">{t.board.available}: </span>
              <span className="font-black text-[var(--accent-2)] text-lg">
                {availableCount}
              </span>
              <span className="text-white/40"> / {TOTAL_TICKETS}</span>
            </div>
            <div className="card rounded-full px-5 py-2">
              <span className="text-white/50">{t.board.sold}: </span>
              <span className="font-black text-white text-lg">{soldCount}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60 ml-auto">
              <span className="inline-block w-3 h-3 rounded-sm num-avail" />
              {t.board.legendAvail}
              <span className="inline-block w-3 h-3 rounded-sm num-sold ml-3" />
              {t.board.legendSold}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-1.5">
            {Array.from({ length: TOTAL_TICKETS }, (_, i) => {
              const n = i + 1;
              const sold = soldSet.has(n);
              return (
                <div
                  key={n}
                  className={`${
                    sold ? "num-sold" : "num-avail"
                  } aspect-square rounded-md flex items-center justify-center text-[10px] sm:text-xs font-bold`}
                >
                  {n}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
            {t.why.tag}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight max-w-3xl">
            {t.why.title}
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {t.why.items.map((w, i) => (
              <div key={i} className="card rounded-2xl p-6">
                <div className="text-xl font-bold text-white">{w.t}</div>
                <div className="mt-2 text-white/65 leading-relaxed">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-gradient-to-b from-black to-neutral-950">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
            {t.faq.tag}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
            {t.faq.title}
          </h2>
          <div className="mt-10 space-y-4">
            {t.faq.items.map((f, i) => (
              <details
                key={i}
                className="card rounded-2xl px-6 py-5 group"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="text-base md:text-lg font-bold text-white">
                    {f.q}
                  </span>
                  <span className="text-[var(--accent-2)] text-2xl leading-none mt-0.5 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-white/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            {t.cta.title}
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.cta.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-full text-base"
            >
              {t.cta.button}
            </a>
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="btn-ghost px-8 py-4 rounded-full text-base font-semibold"
            >
              {t.cta.or} {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-start md:items-center gap-3 justify-between text-sm text-white/50">
          <div>
            <p className="font-bold text-white/80">{t.footer.line1}</p>
            <p className="mt-1">{t.footer.line2}</p>
          </div>
          <div>{t.footer.rights}</div>
        </div>
      </footer>
    </main>
  );
}
