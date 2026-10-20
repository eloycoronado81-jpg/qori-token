import { useState } from "react";

const options = [
  {
    title: "Comprar",
    description: "Explora opciones para adquirir activos digitales.",
  },
  {
    title: "Vender",
    description: "Conoce el proceso para convertir activos digitales.",
  },
  {
    title: "Enviar",
    description: "Obtén orientación para enviar activos digitales.",
  },
  {
    title: "Recibir",
    description: "Aprende cómo recibir activos digitales.",
  },
  {
    title: "Convertir",
    description: "Explora opciones de conversión entre monedas.",
  },
  {
    title: "Aprender",
    description: "Comprende conceptos y riesgos antes de operar.",
  },
];

const currencies = [
  { code: "PEN", name: "Sol peruano" },
  { code: "USD", name: "Dólar estadounidense" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Libra esterlina" },
  { code: "JPY", name: "Yen japonés" },
  { code: "CHF", name: "Franco suizo" },
  { code: "CAD", name: "Dólar canadiense" },
  { code: "AUD", name: "Dólar australiano" },
  { code: "NZD", name: "Dólar neozelandés" },
  { code: "CNY", name: "Yuan chino" },
  { code: "HKD", name: "Dólar de Hong Kong" },
  { code: "SGD", name: "Dólar de Singapur" },
  { code: "KRW", name: "Won surcoreano" },
  { code: "INR", name: "Rupia india" },
  { code: "BRL", name: "Real brasileño" },
  { code: "MXN", name: "Peso mexicano" },
  { code: "ARS", name: "Peso argentino" },
  { code: "CLP", name: "Peso chileno" },
  { code: "COP", name: "Peso colombiano" },
  { code: "BOB", name: "Boliviano" },
  { code: "PYG", name: "Guaraní paraguayo" },
  { code: "UYU", name: "Peso uruguayo" },
  { code: "ZAR", name: "Rand sudafricano" },
  { code: "AED", name: "Dirham de Emiratos Árabes Unidos" },
  { code: "SAR", name: "Riyal saudí" },
  { code: "QAR", name: "Riyal catarí" },
  { code: "ILS", name: "Nuevo séquel israelí" },
  { code: "TRY", name: "Lira turca" },
  { code: "RUB", name: "Rublo ruso" },
  { code: "PLN", name: "Zloty polaco" },
  { code: "SEK", name: "Corona sueca" },
  { code: "NOK", name: "Corona noruega" },
  { code: "DKK", name: "Corona danesa" },
  { code: "CZK", name: "Corona checa" },
  { code: "HUF", name: "Forinto húngaro" },
  { code: "RON", name: "Leu rumano" },
];

const currencySymbols: Record<string, string> = {
  PEN: "S/",
  USD: "US$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF",
  CAD: "C$",
  AUD: "A$",
  NZD: "NZ$",
  CNY: "¥",
  HKD: "HK$",
  SGD: "S$",
  KRW: "₩",
  INR: "₹",
  BRL: "R$",
  MXN: "MX$",
  ARS: "AR$",
  CLP: "CLP$",
  COP: "COL$",
  BOB: "Bs.",
  PYG: "₲",
  UYU: "$U",
  ZAR: "R",
  AED: "د.إ",
  SAR: "﷼",
  QAR: "﷼",
  ILS: "₪",
  TRY: "₺",
  RUB: "₽",
  PLN: "zł",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  CZK: "Kč",
  HUF: "Ft",
  RON: "lei",
};

const getOrientation = (
  operation: string,
  objective: string,
  experience: string
) => {
  if (experience === "Principiante" && objective === "Aprender") {
    return {
      title: "Tu prioridad debería ser comprender antes de operar",
      text:
        "Como estás comenzando y tu objetivo principal es aprender, QORI recomienda conocer primero el activo, su funcionamiento, los riesgos, las posibles comisiones y el proceso de custodia antes de realizar una operación.",
    };
  }

  if (experience === "Principiante" && objective === "Inversion") {
    return {
      title: "Antes de invertir, conozcamos los riesgos",
      text:
        "Como estás comenzando y buscas invertir, QORI recomienda evaluar primero la volatilidad del activo, tu objetivo, el horizonte de tiempo y el nivel de riesgo que estás dispuesto a asumir.",
    };
  }

  if (experience === "Principiante") {
    return {
      title: "Vamos paso a paso",
      text:
        "Como estás comenzando, QORI te ayudará a comprender el proceso antes de realizar cualquier operación. Primero revisaremos el activo, los costos, los riesgos y los pasos necesarios.",
    };
  }

  if (experience === "Intermedio" && objective === "Diversificar") {
    return {
      title: "Analicemos la diversificación",
      text:
        "QORI puede ayudarte a comparar alternativas considerando el objetivo de diversificación, los riesgos del activo, la liquidez, los costos y la moneda utilizada.",
    };
  }

  if (experience === "Avanzado") {
    return {
      title: "Preparemos un análisis más detallado",
      text:
        "Por tu nivel de experiencia, QORI puede orientarte hacia un análisis más detallado de la operación, incluyendo activo, moneda, costos, liquidez, red y riesgos antes de tomar una decisión.",
    };
  }

  if (operation === "Vender") {
    return {
      title: "Analicemos primero la conversión",
      text:
        "Antes de vender, QORI te ayudará a revisar qué activo deseas convertir, la moneda que deseas recibir, los posibles costos y las condiciones de la operación.",
    };
  }

  if (operation === "Enviar") {
    return {
      title: "La seguridad es prioritaria",
      text:
        "Para enviar activos digitales es fundamental verificar cuidadosamente la dirección de destino, la red utilizada, los costos y las condiciones antes de confirmar una transferencia.",
    };
  }

  if (operation === "Recibir") {
    return {
      title: "Verifiquemos cómo recibir el activo",
      text:
        "Antes de recibir activos digitales, QORI te ayudará a identificar la red compatible, la dirección de recepción y los pasos necesarios para reducir el riesgo de errores.",
    };
  }

  if (operation === "Convertir") {
    return {
      title: "Comparemos la conversión",
      text:
        "QORI te ayudará a revisar el activo de origen, el activo de destino, la moneda utilizada, los posibles costos y las condiciones disponibles antes de confirmar.",
    };
  }

  return {
    title: "QORI analizará tu solicitud",
    text:
      "Con la información proporcionada podremos preparar una orientación inicial. Antes de cualquier operación real deberán verificarse precios, disponibilidad, costos, requisitos y condiciones actualizadas.",
  };
};

export default function QoriAI() {
  const [selected, setSelected] = useState<string | null>(null);

  const [activo, setActivo] = useState("");
  const [moneda, setMoneda] = useState("");
  const [monto, setMonto] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [experiencia, setExperiencia] = useState("");

  const [simulacion, setSimulacion] = useState(false);

  const continuar = () => {
    if (
      !activo ||
      !moneda ||
      !monto ||
      !objetivo ||
      !experiencia
    ) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }

    setSimulacion(true);
  };

  const reiniciar = () => {
    setSelected(null);
    setActivo("");
    setMoneda("");
    setMonto("");
    setObjetivo("");
    setExperiencia("");
    setSimulacion(false);
  };

  const monedaSeleccionada = currencies.find(
    (item) => item.code === moneda
  );

  const simboloMoneda = currencySymbols[moneda] || moneda;

  const montoFormateado =
    monto !== ""
      ? `${simboloMoneda} ${Number(monto).toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "";

  const orientation = selected
    ? getOrientation(selected, objetivo, experiencia)
    : null;

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        {/* ENCABEZADO */}

        <div className="text-center mb-14">

          <p className="text-yellow-400 font-semibold uppercase tracking-wider mb-3">
            QORI AI
          </p>

          <h2 className="text-5xl font-bold">
            Tu decisión.
            <span className="text-yellow-400">
              {" "}Nuestra tecnología.
            </span>
          </h2>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto mt-6">
            Un asistente inteligente diseñado para ayudarte a comprender,
            comparar y realizar operaciones con activos digitales de forma
            clara y responsable.
          </p>

        </div>

        {/* PANEL */}

        <div className="max-w-5xl mx-auto bg-zinc-950 border border-yellow-400/20 rounded-3xl p-8">

          {/* CABECERA */}

          <div className="flex items-center gap-4 mb-8">

            <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-400">
                Q
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold">
                ¿Qué deseas hacer?
              </h3>

              <p className="text-gray-500">
                Selecciona una opción para comenzar.
              </p>
            </div>

          </div>

          {/* OPCIONES */}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

            {options.map((option) => (

              <button
                key={option.title}
                onClick={() => {
                  setSelected(option.title);
                  setSimulacion(false);
                }}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                  selected === option.title
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-yellow-400/20 bg-black hover:border-yellow-400/60"
                }`}
              >

                <h4 className="text-lg font-bold mb-2">
                  {option.title}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {option.description}
                </p>

              </button>

            ))}

          </div>

          {/* FORMULARIO */}

          {selected && !simulacion && (

            <div className="mt-10 border-t border-yellow-400/10 pt-8">

              <div className="mb-8">

                <p className="text-yellow-400 font-semibold">
                  QORI AI
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  Vamos paso a paso
                </h3>

                <p className="text-gray-400 mt-2">
                  Necesitamos conocer algunos datos para preparar una
                  orientación inicial.
                </p>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* ACTIVO */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    1. ¿Qué activo digital te interesa?
                  </label>

                  <input
                    type="text"
                    value={activo}
                    onChange={(e) => setActivo(e.target.value)}
                    placeholder="Ejemplo: BTC, ETH, QORI"
                    className="w-full bg-black border border-yellow-400/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                  />

                </div>

                {/* MONEDA */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    2. ¿En qué moneda deseas realizar la operación?
                  </label>

                  <select
                    value={moneda}
                    onChange={(e) => setMoneda(e.target.value)}
                    className="w-full bg-black border border-yellow-400/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                  >

                    <option value="">
                      Selecciona tu moneda
                    </option>

                    {currencies.map((currency) => (

                      <option
                        key={currency.code}
                        value={currency.code}
                      >
                        {currency.name} ({currency.code})
                      </option>

                    ))}

                  </select>

                </div>

                {/* MONTO */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    3. ¿Cuál es el monto aproximado?
                  </label>

                  <div className="relative">

                    {moneda && (
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 font-semibold">
                        {simboloMoneda}
                      </span>
                    )}

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      placeholder="Ejemplo: 1000"
                      className={`w-full bg-black border border-yellow-400/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 ${
                        moneda ? "pl-16" : ""
                      }`}
                    />

                  </div>

                  {monto && moneda && (
                    <p className="text-gray-500 text-xs mt-2">
                      Monto ingresado: {montoFormateado}
                    </p>
                  )}

                </div>

                {/* OBJETIVO */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    4. ¿Cuál es tu objetivo?
                  </label>

                  <select
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    className="w-full bg-black border border-yellow-400/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                  >

                    <option value="">
                      Selecciona tu objetivo
                    </option>

                    <option value="Aprender">
                      Quiero aprender
                    </option>

                    <option value="Diversificar">
                      Diversificar
                    </option>

                    <option value="Ahorro">
                      Ahorro / conservación de valor
                    </option>

                    <option value="Inversion">
                      Inversión
                    </option>

                    <option value="Uso">
                      Utilizar activos digitales
                    </option>

                  </select>

                </div>

                {/* EXPERIENCIA */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-semibold mb-2">
                    5. ¿Cuál es tu experiencia?
                  </label>

                  <select
                    value={experiencia}
                    onChange={(e) => setExperiencia(e.target.value)}
                    className="w-full bg-black border border-yellow-400/20 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
                  >

                    <option value="">
                      Selecciona tu experiencia
                    </option>

                    <option value="Principiante">
                      Soy principiante
                    </option>

                    <option value="Intermedio">
                      Tengo experiencia básica
                    </option>

                    <option value="Avanzado">
                      Tengo experiencia avanzada
                    </option>

                  </select>

                </div>

              </div>

              {/* RESUMEN */}

              {activo &&
                moneda &&
                monto &&
                objetivo &&
                experiencia && (

                  <div className="mt-8 p-6 rounded-2xl border border-yellow-400/30 bg-zinc-900">

                    <p className="text-yellow-400 font-semibold mb-5">
                      QORI AI · Resumen
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">

                      <div className="bg-black rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Operación
                        </p>
                        <p className="font-bold text-lg">
                          {selected}
                        </p>
                      </div>

                      <div className="bg-black rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Activo
                        </p>
                        <p className="font-bold text-lg">
                          {activo}
                        </p>
                      </div>

                      <div className="bg-black rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Moneda
                        </p>
                        <p className="font-bold text-lg">
                          {monedaSeleccionada?.name} ({moneda})
                        </p>
                      </div>

                      <div className="bg-black rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Monto
                        </p>
                        <p className="font-bold text-lg text-yellow-400">
                          {montoFormateado}
                        </p>
                      </div>

                      <div className="bg-black rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Objetivo
                        </p>
                        <p className="font-bold text-lg">
                          {objetivo}
                        </p>
                      </div>

                      <div className="bg-black rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Experiencia
                        </p>
                        <p className="font-bold text-lg">
                          {experiencia}
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={continuar}
                      className="w-full mt-6 bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition"
                    >
                      Continuar con la simulación
                    </button>

                  </div>

                )}

            </div>

          )}

          {/* ================================================= */}
          {/* ORIENTACIÓN + SIMULACIÓN */}
          {/* ================================================= */}

          {selected && simulacion && orientation && (

            <div className="mt-10">

              {/* ORIENTACIÓN */}

              <div className="border border-yellow-400/30 bg-yellow-400/5 rounded-2xl p-7 mb-6">

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <span className="font-bold text-yellow-400">
                      Q
                    </span>
                  </div>

                  <div>

                    <p className="text-yellow-400 font-bold">
                      QORI AI · Orientación V1
                    </p>

                    <p className="text-gray-500 text-sm">
                      Análisis inicial de tu solicitud
                    </p>

                  </div>

                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {orientation.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {orientation.text}
                </p>

              </div>

              {/* SIMULACIÓN */}

              <div className="border border-yellow-400/40 rounded-2xl p-7">

                <div className="text-center mb-7">

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 mb-5">

                    <span className="w-2 h-2 rounded-full bg-yellow-400" />

                    <span className="text-yellow-400 text-sm font-bold uppercase">
                      Simulación QORI AI
                    </span>

                  </div>

                  <h3 className="text-3xl font-bold mb-3">
                    Simulación de operación
                  </h3>

                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Esta simulación es demostrativa. No representa una
                    cotización real ni ejecuta ninguna operación.
                  </p>

                </div>

                {/* AVISO */}

                <div className="p-5 rounded-2xl border border-yellow-400/30 bg-yellow-400/5 mb-7">

                  <p className="text-yellow-400 font-bold mb-2">
                    ⚠️ SIMULACIÓN — NO ES UNA COTIZACIÓN REAL
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    Los precios, comisiones, disponibilidad y tiempos reales
                    todavía no están conectados a proveedores de mercado.
                    Esta información tiene fines demostrativos y educativos.
                  </p>

                </div>

                {/* DATOS */}

                <div className="grid sm:grid-cols-2 gap-4">

                  <div className="bg-black rounded-xl p-5">

                    <p className="text-gray-500 text-sm">
                      Operación
                    </p>

                    <p className="text-xl font-bold">
                      {selected}
                    </p>

                  </div>

                  <div className="bg-black rounded-xl p-5">

                    <p className="text-gray-500 text-sm">
                      Activo
                    </p>

                    <p className="text-xl font-bold text-yellow-400">
                      {activo}
                    </p>

                  </div>

                  <div className="bg-black rounded-xl p-5">

                    <p className="text-gray-500 text-sm">
                      Moneda
                    </p>

                    <p className="text-xl font-bold">
                      {monedaSeleccionada?.name} ({moneda})
                    </p>

                  </div>

                  <div className="bg-black rounded-xl p-5">

                    <p className="text-gray-500 text-sm">
                      Monto
                    </p>

                    <p className="text-xl font-bold text-yellow-400">
                      {montoFormateado}
                    </p>

                  </div>

                </div>

                {/* INFORMACIÓN PENDIENTE */}

                <div className="mt-7 space-y-3">

                  <h4 className="text-xl font-bold mb-4">
                    Información que QORI verificará posteriormente
                  </h4>

                  <div className="flex justify-between bg-black rounded-xl p-4">

                    <span className="text-gray-400">
                      Precio de mercado
                    </span>

                    <span className="text-gray-500">
                      Pendiente de conexión
                    </span>

                  </div>

                  <div className="flex justify-between bg-black rounded-xl p-4">

                    <span className="text-gray-400">
                      Tipo de cambio
                    </span>

                    <span className="text-gray-500">
                      Pendiente de conexión
                    </span>

                  </div>

                  <div className="flex justify-between bg-black rounded-xl p-4">

                    <span className="text-gray-400">
                      Comisión
                    </span>

                    <span className="text-gray-500">
                      Pendiente de configuración
                    </span>

                  </div>

                  <div className="flex justify-between bg-black rounded-xl p-4">

                    <span className="text-gray-400">
                      Disponibilidad
                    </span>

                    <span className="text-gray-500">
                      Pendiente de integración
                    </span>

                  </div>

                  <div className="flex justify-between bg-black rounded-xl p-4">

                    <span className="text-gray-400">
                      Tiempo estimado
                    </span>

                    <span className="text-gray-500">
                      Pendiente de integración
                    </span>

                  </div>

                </div>

                {/* PRINCIPIO ÉTICO */}

                <div className="mt-7 p-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/5">

                  <p className="text-yellow-400 font-bold mb-3">
                    Principio QORI
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    QORI AI proporciona información y orientación para ayudar
                    al usuario a tomar decisiones informadas. No garantiza
                    ganancias, no oculta riesgos y no debe presentar datos
                    simulados como información real.
                  </p>

                </div>

                {/* BOTONES */}

                <div className="grid sm:grid-cols-2 gap-4 mt-7">

                  <button
                    onClick={() => setSimulacion(false)}
                    className="border border-yellow-400/40 text-white py-4 rounded-xl font-bold hover:border-yellow-400 transition"
                  >
                    ← Modificar información
                  </button>

                  <button
                    disabled
                    className="bg-zinc-800 text-gray-500 py-4 rounded-xl font-bold cursor-not-allowed"
                  >
                    Próximamente: continuar
                  </button>

                </div>

              </div>

            </div>

          )}

          {/* REINICIAR */}

          {selected && (

            <div className="mt-6 text-center">

              <button
                onClick={reiniciar}
                className="text-sm text-gray-500 hover:text-yellow-400 transition"
              >
                ← Nueva consulta
              </button>

            </div>

          )}

        </div>

      </div>
    </section>
  );
}