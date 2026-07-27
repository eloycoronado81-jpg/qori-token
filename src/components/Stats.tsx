export default function Stats() {
  const cards = [
    { title: "Supply", value: "1,000,000,000 QORI" },
    { title: "Blockchain", value: "BNB Chain" },
    { title: "Holders", value: "0" },
    { title: "Estado", value: "Próximamente" },
  ];

  return (
    <section className="bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-14">
          QORI en números
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {cards.map((card) => (

            <div
              key={card.title}
              className="bg-zinc-900 rounded-2xl p-8 border border-yellow-400/20 hover:border-yellow-400 transition"
            >
              <p className="text-gray-400">
                {card.title}
              </p>

              <h3 className="text-2xl font-bold text-white mt-4">
                {card.value}
              </h3>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}