import {
  LayoutDashboard,
  Wallet,
  LineChart,
  Coins,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    active: true,
  },
  {
    icon: Wallet,
    title: "Wallet",
  },
  {
    icon: LineChart,
    title: "Mercados",
  },
  {
    icon: Coins,
    title: "Staking",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
  },
  {
    icon: Settings,
    title: "Configuración",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 border-r border-zinc-800 flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-zinc-800">

        <h1 className="text-4xl font-extrabold tracking-widest text-yellow-400">
          QORI
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Exchange Platform
        </p>

      </div>

      {/* Menú */}

      <nav className="flex-1 px-5 py-8">

        <div className="space-y-3">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className={`w-full flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  item.active
                    ? "bg-yellow-400 text-black font-bold shadow-lg"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-yellow-400"
                }`}
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </button>
            );
          })}

        </div>

      </nav>

      {/* Estado */}

      <div className="mx-5 mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">

        <p className="text-xs uppercase tracking-wider text-green-400">
          Estado
        </p>

        <h3 className="mt-2 text-lg font-bold text-white">
          Sistema Operativo
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Todos los servicios funcionando correctamente.
        </p>

      </div>

      {/* Cerrar sesión */}

      <div className="border-t border-zinc-800 p-5">

        <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-500">

          <LogOut size={20} />

          Cerrar Sesión

        </button>

      </div>

    </aside>
  );
}