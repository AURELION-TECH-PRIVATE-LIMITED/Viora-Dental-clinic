import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/viora-logo.jpg";

const navLinks = [
  { label: "Treatments", href: "/#treatments" },
  { label: "The clinic", href: "/#clinic" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Visit", href: "/#book" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bone/70 ring-1 ring-ink/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Viora" className="size-9 rounded-full object-cover" />
          <span className="font-display text-2xl font-medium tracking-tight">
            Viora
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.25em] text-ink/40 sm:inline">
            dental &amp; aesthetic clinic
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-ink/70 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/book"
            className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-bone ring-1 ring-ink transition-transform hover:-translate-y-0.5"
          >
            Book
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex items-center justify-center rounded-full p-2 text-ink ring-1 ring-ink/10 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col gap-1 border-none bg-bone p-6"
            >
              {navLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <a
                    href={link.href}
                    className="rounded-lg px-3 py-3 text-base text-ink/80 transition-colors hover:bg-frost/50 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href="/book"
                  className="mt-4 rounded-full bg-champagne px-4 py-3 text-center text-sm font-medium text-ink ring-1 ring-champagne"
                >
                  Book a consultation
                </a>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
