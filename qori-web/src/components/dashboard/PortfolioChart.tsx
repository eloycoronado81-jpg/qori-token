import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Lun", balance: 9800 },
  { day: "Mar", balance: 10150 },
  { day: "Mié", balance: 10320 },
  { day: "Jue", balance: 10780 },
  { day: "Vie", balance: 11250 },
  { day: "Sáb", balance: 11840 },
  { day: "Dom", balance: 12548 },
];

export default function PortfolioChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Centro Financiero
          </h2>

          <p className="text-gray-400">
            Evolución del portafolio
          </p>
        </div>

        <div className="flex gap-2">

          <button className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold">
            7D
          </button>

          <button className="px-4 py-2 rounded-lg bg-zinc-800 text-white">
            1M
          </button>

          <button className="px-4 py-2 rounded-lg bg-zinc-800 text-white">
            1A
          </button>

          <button className="px-4 py-2 rounded-lg bg-zinc-800 text-white">
            TODO
          </button>

        </div>

      </div>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid stroke="#27272a" />

            <XAxis
              dataKey="day"
              stroke="#888"
            />

            <YAxis
              stroke="#888"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#facc15"
              strokeWidth={4}
              dot={{ fill: "#facc15", r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}