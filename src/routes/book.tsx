import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a consultation — Viora Dental & Aesthetic Clinic" },
      {
        name: "description",
        content:
          "Tell us what you need and we'll confirm your visit over WhatsApp — unhurried, honest, and entirely your pace.",
      },
    ],
  }),
  component: BookPage,
});

const treatmentOptions = [
  "Not sure / general consultation",
  "Root canal & extractions",
  "Tooth-coloured fillings",
  "Teeth capping & crowns",
  "Implants & oral surgery",
  "Rhinoplasty support",
  "Skin & aesthetic care",
];

const timeOptions = ["Morning", "Afternoon", "Evening"];

function BookPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeOptions[0]);
  const [treatment, setTreatment] = useState(treatmentOptions[0]);
  const [notes, setNotes] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const lines = [
      "Hi, I'd like to book a consultation at Viora.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Preferred date: ${date || "Flexible"}`,
      `Preferred time: ${time}`,
      `Treatment: ${treatment}`,
    ];
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);

    const url = `https://wa.me/918280810002?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-bone font-body text-ink antialiased">
      <Nav />

      <section className="mx-auto max-w-2xl px-6 py-16 lg:px-10 lg:py-24">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne">
          Book a consultation
        </span>
        <h1 className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-balance lg:text-5xl">
          Let's find your time.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-taupe">
          Fill this in and we'll confirm your visit over WhatsApp — unhurried,
          honest, and entirely your pace.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-[min(3vw,28px)] bg-frost/40 p-6 ring-1 ring-sage backdrop-blur-xl lg:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="Your phone number"
              />
            </Field>
            <Field label="Preferred date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Preferred time">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputClass}
              >
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Treatment" className="sm:col-span-2">
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className={inputClass}
              >
                {treatmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Notes (optional)" className="sm:col-span-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Anything we should know before your visit?"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white ring-1 ring-[#25D366] transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Continue on WhatsApp
          </button>
        </form>

        <p className="mt-6 text-sm text-taupe">
          Prefer to call?{" "}
          <a href="tel:+918280810002" className="underline underline-offset-4 hover:text-ink">
            +91 82808 10002
          </a>
        </p>
      </section>

      <Footer />
    </div>
  );
}

const inputClass =
  "w-full rounded-xl bg-bone/60 px-4 py-3 text-sm text-ink ring-1 ring-sage placeholder:text-taupe focus:outline-none focus:ring-2 focus:ring-mauve";

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-taupe">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
