export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-black text-white min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* Contenido principal */}
        <div>

          <p className="text-yellow-400 font-semibold uppercase tracking-widest mb-4">
            FC Global Corporation S.A.C.
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            El futuro de los
            <span className="text-yellow-400"> activos digitales </span>
            comienza con QORI.
          </h1>

          <p className="text-gray-400 mt-8 text-xl leading-relaxed max-w-2xl">
            QORI es el ecosistema de activos digitales de FC Global,
            diseñado para conectar tecnología blockchain, servicios
            digitales y nuevas oportunidades para Latinoamérica.
          </p>

          <div className="mt-10 flex gap-5 flex-wrap">

            <button
              disabled
              title="La preventa aún no está habilitada"
              className="bg-yellow-400/40 text-black/70 px-8 py-4 rounded-xl font-bold cursor-not-allowed"
            >
              Preventa próximamente
            </button>

            <a
              href="/whitepaper.md"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-yellow-400 text-white px-8 py-4 rounded-xl
              hover:bg-yellow-400 hover:text-black transition"
            >
              Ver Whitepaper (borrador)
            </a>

          </div>

          {/* Identidad */}
          <div className="mt-10">
            <p className="text-gray-500 text-sm">
              Powered by
            </p>

            <p className="text-white font-semibold tracking-wider">
              FC GLOBAL CORPORATION S.A.C.
            </p>
          </div>

        </div>

        {/* QORI */}
        <div className="flex justify-center">

          <div
            className="w-96 h-96 rounded-full bg-yellow-400/20
            flex items-center justify-center border border-yellow-400
            shadow-[0_0_80px_rgba(250,204,21,0.15)]"
          >

            <div className="text-center">

              <h2 className="text-8xl font-bold text-yellow-400">
                Q
              </h2>

              <p className="text-yellow-400 font-semibold tracking-[0.3em]">
                QORI
              </p>

              <p className="text-gray-400 text-sm mt-2">
                DIGITAL ASSET ECOSYSTEM
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}