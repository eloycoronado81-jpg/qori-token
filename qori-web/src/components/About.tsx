export default function About() {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-6">
          ¿Qué es <span className="text-yellow-400">CriptoLC-Exchange</span>?
        </h2>

        <p className="text-center text-gray-400 text-xl max-w-4xl mx-auto mb-16">
          CriptoLC-Exchange es un ecosistema financiero digital diseñado para
          facilitar la compra, venta e intercambio de activos digitales,
          integrando tecnología blockchain, seguridad y soluciones para
          personas y empresas.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Seguridad
            </h3>

            <p className="text-gray-400">
              Infraestructura basada en blockchain con altos estándares de
              protección para los activos digitales.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Velocidad
            </h3>

            <p className="text-gray-400">
              Plataforma optimizada para realizar operaciones rápidas y con una
              experiencia de usuario moderna.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              Ecosistema
            </h3>

            <p className="text-gray-400">
              Exchange, Wallet, API para empresas y el token QORI integrados en
              una sola plataforma.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}