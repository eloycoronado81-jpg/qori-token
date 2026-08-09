export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black text-white p-5 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-3xl font-bold text-yellow-400">
          QORI
        </h1>

        <ul className="flex gap-8 font-medium">
          <li>Inicio</li>
          <li>Servicios</li>
          <li>Compra/Venta</li>
          <li>Empresas</li>
          <li>API</li>
          <li>Whitepaper</li>
          <li>Contacto</li>
        </ul>

        <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-bold">
          Connect Wallet
        </button>

      </div>
    </nav>
  );
}