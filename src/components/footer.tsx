export function Footer() {
  return (
    <footer className="bg-bone border-t border-ink/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 lg:flex-row lg:px-10">
        <div className="text-center lg:text-left">
          <div className="font-display text-xl font-medium">Viora</div>
          <p className="mt-1 text-xs text-ink/50">
            Dental &amp; aesthetic clinic — calm, clinical care.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink/60">
          <a href="/#treatments" className="transition-colors hover:text-ink">
            Treatments
          </a>
          <a href="/#clinic" className="transition-colors hover:text-ink">
            The clinic
          </a>
          <a href="/#doctors" className="transition-colors hover:text-ink">
            Doctors
          </a>
          <a href="/book" className="transition-colors hover:text-ink">
            Book
          </a>
        </div>
        <div className="text-xs text-ink/40">© 2026 Viora Clinic</div>
      </div>
    </footer>
  );
}
