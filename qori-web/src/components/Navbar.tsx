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
        <ul className="flex gap-8 font-medium items-center">
          <li>
            <a href="#inicio" className="hover:text-yellow-400 transition">
              Inicio
            </a>
          </li>

          <li>
            <a href="#servicios" className="hover:text-yellow-400 transition">
              Servicios
            </a>
          </li>

          <li>
            <a href="#compra-venta" className="hover:text-yellow-400 transition">
              Compra/Venta
            </a>
          </li>

          <li>
            <a href="#empresas" className="hover:text-yellow-400 transition">
              Empresas
            </a>
          </li>

          <li>
            <a href="#api" className="hover:text-yellow-400 transition">
              API
            </a>
          </li>

          <li>
            <a href="#whitepaper" className="hover:text-yellow-400 transition">
              Whitepaper
            </a>
          </li>

          <li>
            <a href="#contacto" className="hover:text-yellow-400 transition">
              Contacto
            </a>
          </li>
        </ul>

        {/* Wallet */}
        <button
          className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-300 transition"
        >
          Connect Wallet
        </button>

      </div>
    </nav>
  );
}