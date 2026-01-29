import MainLayout from "../layouts/MainLayout";

export default function Profile({ user, onLogout, page, onNavigate }) {
  return (
    <MainLayout user={user} onLogout={onLogout} page={page} onNavigate={onNavigate}>
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>

        {/* FOTO PERFIL */}
        <div className="flex items-center gap-6 mb-8">
          <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-slate-200 shadow">
            <img
              src={
                user.foto
                  ? `/storage/${user.foto}`
                  : "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user.nombres + " " + user.apellidop) +
                    "&background=0f172a&color=ffffff&size=256"
              }
              alt="Foto de perfil"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xl font-semibold text-slate-900">
              {user.nombres} {user.apellidop}
            </p>
            <p className="text-slate-500 text-sm">{user.email}</p>
          </div>
        </div>

        {/* DATOS */}
        <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-slate-500 text-sm">Nombres</label>
            <p className="mt-1 font-medium text-slate-900">{user.nombres}</p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Apellido Paterno</label>
            <p className="mt-1 font-medium text-slate-900">{user.apellidop}</p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Apellido Materno</label>
            <p className="mt-1 font-medium text-slate-900">{user.apellidom}</p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Email</label>
            <p className="mt-1 font-medium text-slate-900">{user.email}</p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Teléfono</label>
            <p className="mt-1 font-medium text-slate-900">
              {user.telefono ?? "No informado"}
            </p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Dirección</label>
            <p className="mt-1 font-medium text-slate-900">
              {user.direccion ?? "No informada"}
            </p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Sexo</label>
            <p className="mt-1 font-medium text-slate-900">
              {user.sexo?.nombre ?? "No informado"}
            </p>
          </div>

          <div>
            <label className="block text-slate-500 text-sm">Estado</label>
            <p className="mt-1 font-medium text-slate-900">{user.estado}</p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
