const tokenomics = [
  { name: "Liquidez", value: 40 },
  { name: "Preventa", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Desarrollo", value: 10 },
  { name: "Reserva", value: 10 },
  { name: "Equipo", value: 5 },
];

export default function Tokenomics() {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-6">
          Tokenomics <span className="text-yellow-400">QORI</span>
        </h2>

        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
          Distribución inicial del suministro del token QORI para garantizar el
          crecimiento sostenible del ecosistema.
        </p>

        <div className="space-y-8">

          {tokenomics.map((item) => (
            <div key={item.name}>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">{item.name}</span>
                <span className="text-yellow-400 font-bold">
                  {item.value}%
                </span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-4">

                <div
                  className="bg-yellow-400 h-4 rounded-full transition-all duration-700"
                  style={{ width: `${item.value}%` }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}