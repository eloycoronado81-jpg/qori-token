import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "BTC", value: 45 },
  { name: "QORI", value: 25 },
  { name: "ETH", value: 18 },
  { name: "USDT", value: 12 },
];

const COLORS = [
  "#f7931a",
  "#facc15",
  "#627eea",
  "#26a17b",
];

export default function AssetDistribution() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-bold text-white mb-6">
        Distribución de Activos
      </h2>

      <div style={{ width: "100%", height: 300 }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={4}
              dataKey="value"
            >

              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 space-y-3">

        {data.map((asset, index) => (

          <div
            key={asset.name}
            className="flex justify-between items-center"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-gray-300">
                {asset.name}
              </span>

            </div>

            <span className="text-white font-semibold">
              {asset.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}