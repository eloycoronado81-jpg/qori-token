import { useState } from "react";

const questions = [
  {
    question: "¿Qué es QORI?",
    answer:
      "QORI es el token oficial del ecosistema CriptoLC-Exchange, diseñado para impulsar pagos, inversiones y servicios financieros digitales.",
  },
  {
    question: "¿Cómo puedo comprar QORI?",
    answer:
      "La preventa y la compra de QORI aún no están habilitadas. Cuando se abran, se anunciarán en este sitio y estarán sujetas a la validación legal y de cumplimiento correspondiente.",
  },
  {
    question: "¿Qué blockchain utiliza?",
    answer:
      "QORI está diseñado como token BEP-20 (compatible con ERC-20) para BNB Chain. Todavía no está desplegado en mainnet: la dirección oficial del contrato se publicará aquí solo después de la auditoría.",
  },
  {
    question: "¿Necesito registrarme?",
    answer:
      "Podrás navegar libremente por la plataforma, pero para comprar, vender o utilizar servicios avanzados deberás crear una cuenta y conectar tu wallet.",
  },
  {
    question: "¿Dónde puedo leer el Whitepaper?",
    answer:
      "Puedes leer la versión actual (borrador) del Whitepaper desde el menú principal. Es un documento en evolución: no constituye una oferta pública ni asesoría financiera.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-black text-white py-24">
      <div className="max-w-5xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-6">
          Preguntas <span className="text-yellow-400">Frecuentes</span>
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Resolvemos las dudas más comunes sobre CriptoLC-Exchange y el token QORI.
        </p>

        <div className="space-y-5">

          {questions.map((item, index) => (

            <div
              key={index}
              className="border border-yellow-400/20 rounded-xl overflow-hidden bg-zinc-900"
            >

              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-lg">
                  {item.question}
                </span>

                <span className="text-yellow-400 text-2xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {openIndex === index && (

                <div className="px-6 pb-6 text-gray-400 leading-7">

                  {item.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}