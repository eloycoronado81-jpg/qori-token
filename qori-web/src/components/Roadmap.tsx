const roadmap = [
  {
    year: "2026",
    items: [
      "Lanzamiento Landing",
      "Whitepaper",
      "Smart Contract QORI",
      "Comunidad",
    ],
  },
  {
    year: "2027",
    items: [
      "Wallet",
      "Exchange MVP",
      "Staking",
      "API Empresarial",
    ],
  },
  {
    year: "2028",
    items: [
      "Aplicación Móvil",
      "Tokenización de Activos",
      "IA Financiera",
      "Expansión LATAM",
    ],
  },
];

export default function Roadmap() {
  return (
    <section className="bg-zinc-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-16">
          Roadmap <span className="text-yellow-400">QORI</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {roadmap.map((phase) => (
            <div
              key={phase.year}
              className="bg-black border border-yellow-400/20 rounded-2xl p-8"
            >
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">
                {phase.year}
              </h3>

              <ul className="space-y-4">
                {phase.items.map((item) => (
                  <li key={item} className="text-gray-300">
                    ✔ {item}
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}