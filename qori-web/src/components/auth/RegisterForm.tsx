import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!fullName.trim()) {
      setError("Ingresa tu nombre completo.");
      return;
    }

    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setMessage(
      "Formulario validado correctamente. La creación real de cuentas se habilitará al conectar el sistema de autenticación."
    );
  }

  return (
    <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          QORI
        </h1>

        <p className="text-gray-400 mt-3">
          Crea tu cuenta
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block text-gray-300 mb-2">
            Nombre completo
          </label>

          <input
            type="text"
            placeholder="Tu nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            required
          />
        </div>

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">
            Confirmar contraseña
          </label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400"
            required
          />
        </div>

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-sm text-yellow-400"
        >
          {showPassword
            ? "Ocultar contraseñas"
            : "Mostrar contraseñas"}
        </button>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="text-green-400 text-sm">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Crear cuenta
        </button>
      </form>

      <div className="text-center mt-8 text-gray-400">
        ¿Ya tienes una cuenta?

        <button
          type="button"
          className="ml-2 text-yellow-400"
          onClick={() => navigate("/login")}
        >
          Inicia sesión
        </button>
      </div>
    </div>
  );
}