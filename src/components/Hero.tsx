export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <p className="text-yellow-400 font-semibold uppercase mb-4">
            Token del Oro Digital
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            El futuro de los
            <span className="text-yellow-400"> activos digitales </span>
            comienza con QORI.
          </h1>

          <p className="text-gray-400 mt-8 text-xl">
            Compra, vende e intercambia activos digitales respaldados por un
            ecosistema moderno, seguro y diseñado para Latinoamérica.
          </p>

          <div className="mt-10 flex gap-5">

            <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold">
              Comprar Token
            </button>

            <button className="border border-yellow-400 px-8 py-4 rounded-xl">
              Whitepaper
            </button>

          </div>

        </div>

        <div className="flex justify-center">

          <div className="w-96 h-96 rounded-full bg-yellow-400/20 flex items-center justify-center border border-yellow-400">

            <h2 className="text-8xl font-bold text-yellow-400">
              Q
            </h2>

          </div>

        </div>

      </div>
    </section>
  );
}