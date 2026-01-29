import MainLayout from "../layouts/MainLayout";

export default function Dashboard({ user, onLogout, page,onNavigate }) {
  return (
    <MainLayout user={user} onLogout={onLogout} page={page} onNavigate={onNavigate}>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

        <div className="bg-white rounded-xl shadow p-5 md:p-6">
          <h3 className="font-semibold text-lg">Documentos</h3>
          <p className="text-slate-500 mt-2">0 pendientes</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 md:p-6">
          <h3 className="font-semibold text-lg">RRHH</h3>
          <p className="text-slate-500 mt-2">0 procesos activos</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 md:p-6">
          <h3 className="font-semibold text-lg">Finanzas</h3>
          <p className="text-slate-500 mt-2">0 solicitudes</p>
        </div>

      </div>

    </MainLayout>
  );
}
