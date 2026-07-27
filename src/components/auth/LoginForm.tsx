export default function LoginForm() {
  return (
    <div className="w-full max-w-md bg-zinc-900 border border-yellow-400/20 rounded-2xl p-10 shadow-2xl">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-400">
          CriptoLC
        </h1>

        <p className="text-gray-400 mt-3">
          Bienvenido nuevamente
        </p>
      </div>

      <form className="space-y-6">

        <div>
          <label className="block text-gray-300 mb-2">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="correo@empresa.com"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Contraseña
          </label>

          <input
            type="password"
            placeholder="********"
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none"
          />
        </div>

        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-400">
            <input type="checkbox" />
            Recordarme
          </label>

          <button
            type="button"
            className="text-yellow-400"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Iniciar Sesión
        </button>

      </form>

      <div className="text-center mt-8 text-gray-400">
        ¿No tienes cuenta?

        <span className="text-yellow-400 cursor-pointer ml-2">
          Regístrate
        </span>
      </div>

    </div>
  );
}