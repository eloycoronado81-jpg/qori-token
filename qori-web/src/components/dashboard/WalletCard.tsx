import {
  Bitcoin,
  Coins,
} from "lucide-react";

export default function WalletCard() {
  const assets = [
    {
      name: "QORI",
      symbol: "QORI",
      amount: "250,000",
      value: "Sin cotización",
      color: "text-yellow-400",
    },
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0.1824",
      value: "$ 7,320.50",
      color: "text-orange-400",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "2.548",
      value: "$ 3,960.12",
      color: "text-blue-400",
    },
    {
      name: "USDT",
      symbol: "USDT",
      amount: "5,820",
      value: "$ 5,820.00",
      color: "text-green-400",
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Mi Wallet (demo)
      </h2>

      <div className="space-y-5">

        {assets.map((asset) => (

          <div
            key={asset.symbol}
            className="flex justify-between items-center bg-zinc-950 rounded-xl p-4 hover:bg-zinc-800 transition"
          >

            <div className="flex items-center gap-4">

              {asset.symbol === "BTC" ? (
                <Bitcoin
                  size={28}
                  className={asset.color}
                />
              ) : (
                <Coins
                  size={28}
                  className={asset.color}
                />
              )}

              <div>

                <p className="text-white font-semibold">
                  {asset.name}
                </p>

                <p className="text-gray-500 text-sm">
                  {asset.amount}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-white font-bold">
                {asset.value}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}