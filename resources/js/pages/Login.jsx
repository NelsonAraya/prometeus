import { useState } from "react";
import { api } from "../services/api";
import AuthLayout from "../layouts/AuthLayout";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await api.get("/sanctum/csrf-cookie");
      const res = await api.post("/login", { email, password });
      onLogin(res.data.user);
    } catch (error) {
      alert("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10">

        {/* ================== IZQUIERDA ================== */}
        <div className="p-10 bg-white/[0.04] backdrop-blur text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold leading-tight">
                  Prometeus
                </h1>
                <p className="text-slate-300 text-sm">
                  Acceso al sistema institucional
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-white text-3xl font-semibold tracking-tight">
                Bienvenido/a
              </h2>
              <p className="text-slate-300 mt-2">
                Inicia sesión con tu correo institucional.
              </p>

              <ul className="mt-8 space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/40"></span>
                  Gestión de procesos (RRHH, Finanzas, Documentos).
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/40"></span>
                  Trazabilidad y control por unidades.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/40"></span>
                  Seguridad por perfiles y roles.
                </li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Prometeus
          </div>
        </div>

        {/* ================== DERECHA ================== */}
        <div className="p-10 bg-slate-950 text-white">
          <div className="max-w-sm mx-auto">
            <h3 className="text-white text-2xl font-semibold">
              Iniciar sesión
            </h3>
            <p className="text-slate-400 mt-1 text-sm">
              Ingresa tu email y contraseña.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">

              {/* EMAIL */}
              <div>
                <label className="text-slate-300 text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@cormudesi.cl"
                  className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20"
                  required
                />
              </div>

              {/* PASSWORD + TOGGLE */}
              <div>
                <label className="text-slate-300 text-sm">Contraseña</label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 pr-12 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-white transition"
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* BOTÓN */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl font-semibold py-3 transition ${
                  loading
                    ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                    : "bg-white text-slate-900 hover:bg-slate-200"
                }`}
              >
                {loading ? "Ingresando..." : "Entrar"}
              </button>

              {/* EXTRA */}
              <div className="flex items-center justify-between text-sm pt-2">
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-200 transition"
                  onClick={() => alert("Luego agregamos recuperación de clave")}
                >
                  ¿Olvidaste tu contraseña?
                </button>

                <span className="text-slate-600">v1.0</span>
              </div>

            </form>

            <div className="mt-8 text-xs text-slate-500">
              Si tienes problemas de acceso, contacta a Informática.
            </div>
          </div>
        </div>

      </div>
    </AuthLayout>
  );
}
