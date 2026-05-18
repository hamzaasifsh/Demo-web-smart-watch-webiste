function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 font-['Poppins'] text-white sm:grid-cols-[1fr_auto_1fr] sm:px-10 lg:px-20">
      <a
        className="pointer-events-auto justify-self-start text-[10px] font-bold uppercase tracking-[0.24em] sm:text-xs"
        href="/"
        aria-label="Apple Watch home"
      >
        Watch
      </a>

      <nav
        className="pointer-events-auto hidden items-center gap-7 rounded-full border border-white/10 bg-black/25 px-5 py-2.5 text-xs text-white/62 backdrop-blur-xl sm:flex"
        aria-label="Primary navigation"
      >
        <a className="transition hover:text-white" href="#fitness">
          Fitness
        </a>
        <a className="transition hover:text-white" href="#focus">
          Focus
        </a>
        <a className="transition hover:text-white" href="#water">
          Water
        </a>
      </nav>

      <a
        className="pointer-events-auto justify-self-end rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-black transition hover:bg-white/85 sm:px-5 sm:text-sm"
        href="#features"
      >
        Buy
      </a>
    </header>
  )
}

export default Navbar
