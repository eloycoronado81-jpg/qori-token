import {
  Search,
  Bell,
  Settings,
  UserCircle2,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-24 border-b border-zinc-800 bg-zinc-950 px-8 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          lunes, 27 de julio de 2026
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            placeholder="Buscar activos..."
            className="w-80 rounded-2xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none focus:border-yellow-400 transition"
          />

        </div>

        <button className="relative rounded-2xl border border-zinc-800 bg-zinc-900 p-3 hover:border-yellow-400 transition">

          <Bell className="text-white" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <button className="rounded-2xl border border-zinc-800 bg-zinc-900 p-3 hover:border-yellow-400 transition">

          <Settings className="text-white" />

        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2">

          <UserCircle2
            size={42}
            className="text-yellow-400"
          />

          <div>

            <p className="text-white font-semibold">
              prueba@qori.pe
            </p>

            <span className="text-gray-400 text-sm">
              Cliente Premium
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}