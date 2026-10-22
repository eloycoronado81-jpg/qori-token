import {
  ArrowUpRight,
  Wallet,
  Coins,
  Bitcoin,
} from "lucide-react";

export default function BalanceCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-8 shadow-2xl">

      {/* Fondo decorativo */}
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-yellow-600/10 blur-3xl" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm uppercase tracking-[4px] text-yellow-400">
              Balance Total
            </p>

            <h1 className="mt-3 text-5xl font-extrabold text-white">
              US$ 12,548.32
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Datos de ejemplo — no son saldos reales
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-green-500/20 px-5 py-3 text-green-400">

            <ArrowUpRight size={22} />

            <span className="text-lg font-bold">
              DEMO
            </span>

          </div>

        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex items-center justify-between">

              <Wallet className="text-yellow-400" />

              <span className="text-xs text-gray-500">
                Wallet
              </span>

            </div>

            <p className="mt-5 text-gray-400">
              QORI
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              250,000
            </h3>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex items-center justify-between">

              <Bitcoin className="text-orange-400" />

              <span className="text-xs text-gray-500">
                Bitcoin
              </span>

            </div>

            <p className="mt-5 text-gray-400">
              BTC
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              0.1824
            </h3>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex items-center justify-between">

              <Coins className="text-green-400" />

              <span className="text-xs text-gray-500">
                Stablecoin
              </span>

            </div>

            <p className="mt-5 text-gray-400">
              USDT
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              5,820
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}