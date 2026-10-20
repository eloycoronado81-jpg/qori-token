import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function MarketCard() {
  const markets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$118,420",
      change: "+2.35%",
      positive: true,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$3,820",
      change: "+1.82%",
      positive: true,
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: "$212",
      change: "-0.75%",
      positive: false,
    },
    {
      symbol: "XRP",
      name: "Ripple",
      price: "$3.44",
      change: "+4.12%",
      positive: true,
    },
    {
      symbol: "QORI",
      name: "QORI",
      price: "$0.015",
      change: "+18.45%",
      positive: true,
    },
  ];

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Mercado
      </h2>

      <div className="space-y-4">

        {markets.map((coin) => (

          <div
            key={coin.symbol}
            className="flex justify-between items-center bg-zinc-950 rounded-xl p-4 hover:bg-zinc-800 transition"
          >

            <div>

              <p className="text-white font-semibold">
                {coin.symbol}
              </p>

              <p className="text-gray-500 text-sm">
                {coin.name}
              </p>

            </div>

            <div className="text-right">

              <p className="text-white font-bold">
                {coin.price}
              </p>

              <div
                className={`flex items-center justify-end gap-2 mt-1 ${
                  coin.positive
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >

                {coin.positive ? (
                  <TrendingUp size={18} />
                ) : (
                  <TrendingDown size={18} />
                )}

                <span className="font-semibold">
                  {coin.change}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}