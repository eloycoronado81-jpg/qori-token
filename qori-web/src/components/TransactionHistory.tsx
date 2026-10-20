import {
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Wallet,
} from "lucide-react";

const transactions = [
  {
    icon: <ArrowDownLeft size={18} />,
    title: "Compra BTC",
    amount: "+0.025 BTC",
    time: "Hace 5 min",
    color: "text-green-400",
  },
  {
    icon: <ArrowUpRight size={18} />,
    title: "Venta ETH",
    amount: "-1.20 ETH",
    time: "Hace 12 min",
    color: "text-red-400",
  },
  {
    icon: <Repeat size={18} />,
    title: "Compra QORI",
    amount: "+25,000 QORI",
    time: "Hace 30 min",
    color: "text-yellow-400",
  },
  {
    icon: <Wallet size={18} />,
    title: "Depósito USDT",
    amount: "+1,500 USDT",
    time: "Hace 1 hora",
    color: "text-blue-400",
  },
];

export default function TransactionHistory() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-bold text-white mb-6">
        Últimas Transacciones
      </h2>

      <div className="space-y-5">

        {transactions.map((tx, index) => (

          <div
            key={index}
            className="flex items-center justify-between border-b border-zinc-800 pb-4"
          >

            <div className="flex items-center gap-4">

              <div className={`${tx.color}`}>
                {tx.icon}
              </div>

              <div>

                <p className="text-white font-semibold">
                  {tx.title}
                </p>

                <p className="text-gray-500 text-sm">
                  {tx.time}
                </p>

              </div>

            </div>

            <span className={`${tx.color} font-bold`}>
              {tx.amount}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}