export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-400/20 text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              CriptoLC
            </h2>

            <p className="text-gray-400 leading-7">
              El ecosistema financiero digital impulsado por QORI.
              Compra, vende e intercambia activos digitales
              con seguridad y tecnología blockchain.
            </p>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Empresa
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Nosotros</li>
              <li>Roadmap</li>
              <li>Whitepaper</li>
              <li>Contacto</li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Servicios
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Exchange</li>
              <li>Wallet</li>
              <li>API</li>
              <li>Empresas</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Comunidad
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Telegram</li>
              <li>X (Twitter)</li>
              <li>Discord</li>
              <li>LinkedIn</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-gray-500">

          © 2026 CriptoLC-Exchange · Powered by QORI Token

        </div>

      </div>
    </footer>
  );
}