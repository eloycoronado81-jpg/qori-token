const services = [
  {
    title: "Exchange",
    description: "Compra y venta de criptomonedas.",
    icon: "💱",
  },
  {
    title: "Wallet",
    description: "Administra tus activos digitales.",
    icon: "👛",
  },
  {
    title: "Token QORI",
    description: "El token oficial del ecosistema.",
    icon: "🪙",
  },
];

export default function Ecosystem() {
  return (
    <section className="bg-zinc-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          Ecosistema CriptoLC
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-black border border-yellow-400/20 rounded-xl p-6"
            >
              <div className="text-5xl mb-4">{service.icon}</div>

              <h3 className="text-2xl font-bold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}