import { useState } from "react";

export default function MainLayout({ user, onLogout, page, onNavigate ,children }) {
  const [open, setOpen] = useState(false);

  const itemClass = (key) =>
    `block w-full text-left px-3 py-2 rounded transition ${
      page === key
        ? "bg-slate-700 text-white"
        : "hover:bg-slate-700 text-slate-300"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-slate-900 text-white p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between md:justify-start">
          <div>
            <h2 className="text-xl font-bold">Prometeus</h2>
            <p className="text-slate-400 text-sm mt-1">
              {user.nombres} {user.apellidop}
            </p>
          </div>

          {/* CLOSE MOBILE */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          <button 
            onClick={() => onNavigate("dashboard")}
            className={itemClass("dashboard")}>
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate("profile")}
            className={itemClass("profile")}>
            Mi Perfil
          </button>
          <button
            onClick={() => onNavigate("solicitudes")}
            className={itemClass("solicitudes")}>
            Mis Solicitudes
          </button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-slate-700 transition">
            Documentos
          </button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-slate-700 transition">
            RRHH
          </button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-slate-700 transition">
            Finanzas
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-8">

          {/* HAMBURGER */}
          <button
            className="md:hidden text-slate-600 text-xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-lg md:text-2xl font-bold">Dashboard</h1>

          <button
            onClick={onLogout}
            className="px-3 py-2 text-sm md:text-base rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
