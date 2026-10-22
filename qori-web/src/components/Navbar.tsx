export default function Navbar() {
  return (
    <nav className="bg-black text-white px-5 py-4 border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Identidad */}
        <div className="flex items-center gap-3">
          <div>
            <div className="text-xs font-semibold text-yellow-400 tracking-widest">
              FC GLOBAL
            </div>

            <h1 className="text-2xl font-bold text-yellow-400 leading-none">
              QORI
            </h1>
          </div>
        </div>

        {/* Navegación */}
        <ul className="hidden md:flex gap-8 font-medium items-center">
          <li><a href="/#inicio" className="hover:text-yellow-400 transition">Inicio</a></li>
          <li><a href="/#nosotros" className="hover:text-yellow-400 transition">Nosotros</a></li>
          <li><a href="/#tokenomics" className="hover:text-yellow-400 transition">Tokenomics</a></li>
          <li><a href="/#roadmap" className="hover:text-yellow-400 transition">Roadmap</a></li>
          <li><a href="/#faq" className="hover:text-yellow-400 transition">FAQ</a></li>
          <li>
            <a href="/whitepaper" className="hover:text-yellow-400 transition">
              Whitepaper
            </a>
          </li>
        </ul>

        {/* Wallet */}
        <button
          disabled
          title="La conexión de wallet se habilitará con el lanzamiento"
          className="bg-yellow-400/40 text-black/70 px-5 py-2.5 rounded-lg font-bold cursor-not-allowed"
        >
          Wallet (próximamente)
        </button>

      </div>
    </nav>
  );
}