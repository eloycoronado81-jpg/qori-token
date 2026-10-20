import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña inválidos.");
    }
  }

  return (
    <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          QORI
        </h1>

        <p className="text-gray-400 mt-3">
          Bienvenido nuevamente
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>
          <label className="block text-gray-300 mb-2">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="correo@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            required
          />
        </div>

        <div>

          <label className="block text-gray-300 mb-2">
            Contraseña
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            required
          />

        </div>

        <div className="flex items-center justify-between">

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-yellow-400"
          >
            {showPassword
              ? "Ocultar contraseña"
              : "Mostrar contraseña"}
          </button>

          <button
            type="button"
            className="text-sm text-yellow-400"
          >
            ¿Olvidaste tu contraseña?
          </button>

        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Iniciar Sesión
        </button>

      </form>

      <div className="text-center mt-8 text-gray-400">

        ¿No tienes cuenta?

        <button
          className="ml-2 text-yellow-400"
          onClick={() => navigate("/register")}
        >
          Regístrate
        </button>

      </div>

    </div>
  );
}