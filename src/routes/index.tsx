import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import clinicHeroVideo from "@/assets/clinic-hero.mp4";
import clinicHeroPoster from "@/assets/clinic-hero-poster.jpg";
import clinicPortrait from "@/assets/clinic-portrait.jpg";
import doctorAyesha from "@/assets/doctor-ayesha-roul.jpg";
import doctorKiran from "@/assets/doctor-kiran-kanar.png";
import treatCosmetic from "@/assets/treat-cosmetic.jpg";
import treatSkin from "@/assets/treat-skin.jpg";
import treatHygiene from "@/assets/treat-hygiene.jpg";
import treatAligners from "@/assets/treat-aligners.jpg";
import treatInjectables from "@/assets/treat-injectables.jpg";
import treatWhitening from "@/assets/treat-whitening.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viora Dental & Aesthetic Clinic" },
      {
        name: "description",
        content:
          "Viora blends precise dental care with unhurried aesthetic treatments — a calm, considered space where every visit feels like a slow exhale.",
      },
      { property: "og:title", content: "Viora Dental & Aesthetic Clinic" },
      {
        property: "og:description",
        content:
          "Precision dental care and unhurried aesthetic treatments in a calm, considered space.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const treatments = [
  {
    title: "Root canal & extractions",
    copy: "Gentle, precise care to save or safely remove a tooth.",
    image: treatHygiene,
  },
  {
    title: "Tooth-coloured fillings",
    copy: "Seamless restorations that blend naturally with your smile.",
    image: treatCosmetic,
  },
  {
    title: "Teeth capping & crowns",
    copy: "Durable, natural-looking crowns built to fit and last.",
    image: treatAligners,
  },
  {
    title: "Implants & oral surgery",
    copy: "Permanent tooth replacement and maxillofacial care, done right.",
    image: treatWhitening,
  },
  {
    title: "Rhinoplasty support",
    copy: "Thoughtful aesthetic consultation and care for facial harmony.",
    image: treatInjectables,
  },
  {
    title: "Skin & aesthetic care",
    copy: "Polish, resurfacing and soft glow treatments.",
    image: treatSkin,
  },
];

const stats = [
  { value: "4.7★", label: "Google rating" },
  { value: "12", label: "Google reviews" },
];

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Viora+Dental+And+Aesthetics+Raurkela";

const reviews = [
  {
    quote: "Best Clinic for dental support and care.",
    name: "Yash Chhatwani",
    treatment: "Google review",
    initials: "YC",
    tone: "bg-sage/30",
  },
  {
    quote: "Doctor behavior was so good. Best dental clinic in Rourkela.",
    name: "Anjana Sahu",
    treatment: "Google review",
    initials: "AS",
    tone: "bg-champagne/30",
  },
  {
    quote: "It was amazing.",
    name: "Kirti Pattnaik",
    treatment: "Google review",
    initials: "KP",
    tone: "bg-mauve/30",
  },
];

const doctors = [
  {
    name: "Dr. Ayesha Roul",
    credentials: "BDS, MDS",
    regNo: "Reg. No. 2032(A)",
    photo: doctorAyesha,
  },
  {
    name: "Dr. Kiran Kumar Kanar",
    credentials: "MBBS, DNB General Surgery",
    regNo: "Reg. No. 20093",
    photo: doctorKiran,
  },
];

const whatsappUrl =
  "https://wa.me/918280810002?text=" +
  encodeURIComponent("Hi, I'd like to book a consultation at Viora.");

const mapEmbedUrl = "https://www.google.com/maps?q=22.259492,84.887972&output=embed";

function Index() {
  return (
    <div className="min-h-screen bg-bone font-body text-ink antialiased">
      <Nav />

      <Hero />

      <Stats />

      <Treatments />

      <Clinic />

      <Doctors />

      <Reviews />

      <Book />

      <Footer />
    </div>
  );
}

function Hero() {
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = videoCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // React's `muted` prop doesn't always set the attribute in time for the
    // browser's autoplay gate, so play() is called explicitly on mount.
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});

    // Browsers pause background-tab video to save battery; resume it when
    // the user comes back rather than leaving it stuck on one frame.
    const onVisible = () => {
      if (!document.hidden) video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="viora-drift pointer-events-none absolute -top-32 -right-24 size-[46rem] rounded-full bg-sage/40 blur-3xl" />
      <div className="viora-drift-2 pointer-events-none absolute top-24 -left-32 size-[40rem] rounded-full bg-champagne/35 blur-3xl" />
      <div className="viora-drift pointer-events-none absolute bottom-0 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-mauve/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-10 lg:pt-24 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-frost/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/60 ring-1 ring-ink/5 backdrop-blur-md">
              Dental &amp; aesthetic clinic
            </span>
            <h1 className="mt-6 font-display text-5xl font-medium leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl xl:max-w-[24ch]">
              The quiet art of a confident smile.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-pretty text-ink/70 lg:text-lg sm:max-w-[52ch]">
              Viora blends precise dental care with unhurried aesthetic
              treatments — a calm, considered space where every visit feels
              like a slow exhale.
            </p>
            <a
              href="https://www.google.com/maps/place/Viora+Dental+And+Aesthetics/@22.259492,84.8853971,17z/data=!3m1!4b1!4m6!3m5!1s0x3a201d0030ea9613:0xda7a119b73fc9893!8m2!3d22.259492!4d84.887972!16s%2Fg%2F11zdf39qcl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
            >
              <MapPin className="size-4 shrink-0" />
              In front of Jagannath Temple, Koel Nagar, Rourkela
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/book"
                className="inline-flex items-center rounded-full bg-champagne px-6 py-3 text-sm font-medium text-ink ring-1 ring-champagne transition-transform hover:-translate-y-0.5"
              >
                Book a consultation
              </a>
              <a
                href="#treatments"
                className="inline-flex items-center rounded-full bg-frost/50 px-6 py-3 text-sm font-medium text-ink ring-1 ring-ink/5 backdrop-blur-md transition-transform hover:-translate-y-0.5"
              >
                View treatments
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-[min(3vw,28px)] bg-frost/30 ring-1 ring-frost/50 backdrop-blur-md" />
            <div
              ref={videoCardRef}
              className={`relative grid gap-3 p-3 transition-all duration-1000 ease-out ${
                revealed ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster={clinicHeroPoster}
                aria-label="A walkthrough of the Viora clinic reception area"
                width={1080}
                height={1200}
                className="aspect-[4/5] w-full rounded-[min(3vw,28px)] object-cover"
              >
                <source src={clinicHeroVideo} type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-6 -left-6 w-56 rounded-2xl bg-frost/60 p-5 ring-1 ring-ink/5 backdrop-blur-xl">
              <div className="flex items-center gap-1 text-champagne">
                <span className="text-lg">★</span>
                <span className="text-lg">★</span>
                <span className="text-lg">★</span>
                <span className="text-lg">★</span>
                <span className="text-lg">★</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-snug text-balance">
                Rated 4.7 · 12 Google reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-ink/5 bg-frost/40 backdrop-blur-md">
      <div className="mx-auto grid max-w-xs grid-cols-2 divide-x divide-ink/5 px-6 py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 text-center">
            <div className="font-display text-3xl font-medium lg:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.15em] text-ink/50">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section
      id="treatments"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
            Treatments
          </span>
          <h2 className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-balance lg:text-5xl sm:max-w-[28ch]">
            Considered care, from hygiene to harmony.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-pretty text-ink/60">
          Every plan begins with a quiet consultation — no pressure, no
          upsell, only what your smile and skin actually need.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <div
            key={treatment.title}
            className="group rounded-[min(2vw,20px)] bg-frost/50 p-3 ring-1 ring-ink/5 backdrop-blur-md transition-transform hover:-translate-y-1"
          >
            <img
              src={treatment.image}
              alt={treatment.title}
              loading="lazy"
              width={928}
              height={720}
              className="aspect-[5/4] w-full rounded-[min(2vw,16px)] object-cover"
            />
            <div className="p-4">
              <h3 className="font-display text-xl font-medium">
                {treatment.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-pretty text-ink/60">
                {treatment.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Clinic() {
  return (
    <section id="clinic" className="scroll-mt-20 bg-frost/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[min(3vw,32px)] bg-gradient-to-br from-sage/30 via-frost/20 to-champagne/30 blur-xl" />
            <img
              src={clinicPortrait}
              alt="A calm dental specialist smiling softly at the Viora clinic"
              loading="lazy"
              width={1080}
              height={1080}
              className="relative aspect-square w-full rounded-[min(3vw,28px)] object-cover"
            />
          </div>
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
              The clinic
            </span>
            <h2 className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-balance lg:text-5xl sm:max-w-[26ch]">
              A calm, clinical hand — never rushed.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-pretty text-ink/70">
              Our specialists pair exacting technique with a warm, spa-like
              pace, so you feel looked after from the first hello to the final
              polish.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="bg-champagne mt-1 size-2 shrink-0 rounded-full" />
                <span className="text-sm leading-relaxed text-pretty text-ink/70">
                  Board-certified dentists and aesthetics practitioners
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-sage mt-1 size-2 shrink-0 rounded-full" />
                <span className="text-sm leading-relaxed text-pretty text-ink/70">
                  Transparent pricing and honest, unhurried consults
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-mauve mt-1 size-2 shrink-0 rounded-full" />
                <span className="text-sm leading-relaxed text-pretty text-ink/70">
                  A calm, spa-warm treatment environment
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  return (
    <section
      id="doctors"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mb-12 text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
          The team
        </span>
        <h2 className="mx-auto mt-3 font-display text-4xl font-medium leading-none tracking-tight text-balance lg:text-5xl sm:max-w-[30ch]">
          Meet your specialists.
        </h2>
      </div>
      <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
        {doctors.map((doctor) => (
          <div
            key={doctor.name}
            className="overflow-hidden rounded-[min(2vw,20px)] bg-frost/50 ring-1 ring-ink/5 backdrop-blur-md"
          >
            <img
              src={doctor.photo}
              alt={doctor.name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="p-5">
              <div className="font-display text-lg font-medium">
                {doctor.name}
              </div>
              <div className="text-sm text-ink/60">{doctor.credentials}</div>
              <div className="text-xs text-ink/40">{doctor.regNo}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section
      id="reviews"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mb-12 text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
          Kind words
        </span>
        <h2 className="mx-auto mt-3 font-display text-4xl font-medium leading-none tracking-tight text-balance lg:text-5xl sm:max-w-[30ch]">
          Trusted, quietly and often.
        </h2>
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
        >
          4.7★ on Google · 12 reviews
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-[min(2vw,20px)] bg-frost/50 p-6 ring-1 ring-ink/5 backdrop-blur-md"
          >
            <p className="text-sm leading-relaxed text-pretty text-ink/70">
              "{review.quote}"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span
                className={`grid size-10 place-items-center rounded-full font-display text-sm font-medium text-ink ${review.tone}`}
              >
                {review.initials}
              </span>
              <div>
                <div className="text-sm font-medium">{review.name}</div>
                <div className="text-xs text-ink/50">{review.treatment}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Book() {
  return (
    <section
      id="book"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 pb-20 lg:px-10 lg:pb-28"
    >
      <div className="relative overflow-hidden rounded-[min(3vw,32px)] bg-frost/40 p-8 ring-1 ring-ink/5 backdrop-blur-xl lg:p-12">
        <div className="viora-drift pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-champagne/30 blur-3xl" />
        <div className="viora-drift-2 pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-sage/30 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
              Visit us
            </span>
            <h2 className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-balance lg:text-5xl sm:max-w-[26ch]">
              Reserve your quiet hour.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pretty text-ink/70">
              Book a consultation and we'll build a plan around you —
              unhurried, honest, and entirely your pace.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/book"
                className="bg-champagne ring-champagne inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-ink ring-1 transition-transform hover:-translate-y-0.5"
              >
                Book a consultation
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white ring-1 ring-[#25D366] transition-transform hover:-translate-y-0.5"
              >
                WhatsApp us
              </a>
            </div>
          </div>
          <div className="bg-bone/60 ring-ink/5 backdrop-blur-md grid gap-8 rounded-[min(2vw,20px)] p-6 ring-1 sm:grid-cols-2">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink/50">
                Hours
              </div>
              <div className="mt-3 space-y-1 text-sm text-pretty text-ink/70">
                <div className="flex justify-between">
                  <span>Tue – Sun</span>
                  <span>10am – 8pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span>10am – 12pm</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink/50">
                Contact
              </div>
              <div className="mt-3 space-y-1 text-sm text-pretty text-ink/70">
                <div>
                  1st floor, A576, Koel Nagar A Block, Rourkela, Odisha
                  769014. In front of Jagannath Temple
                </div>
                <div>
                  <a href="tel:+918280810002" className="hover:text-ink">
                    +91 82808 10002
                  </a>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="overflow-hidden rounded-[min(1.5vw,14px)] ring-1 ring-ink/5">
                <iframe
                  src={mapEmbedUrl}
                  title="Viora Dental And Aesthetics location"
                  loading="lazy"
                  className="h-56 w-full"
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Viora+Dental+And+Aesthetics/@22.259492,84.8853971,17z/data=!3m1!4b1!4m6!3m5!1s0x3a201d0030ea9613:0xda7a119b73fc9893!8m2!3d22.259492!4d84.887972!16s%2Fg%2F11zdf39qcl"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

