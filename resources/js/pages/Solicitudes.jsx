import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { api } from "../services/api";
import Swal from "sweetalert2";


export default function Solicitudes({ user, onLogout, page, onNavigate }) {
    const [tab, setTab] = useState("listado"); // listado | crear
    const [tipoSolicitud, setTipoSolicitud] = useState("");
    const [tipoPermiso, setTipoPermiso] = useState("");
    const [tiposSolicitud, setTiposSolicitud] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudDetalle, setSolicitudDetalle] = useState(null);
    //PERMISOS
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [unidad, setUnidad] = useState("");
    const [funcion, setFuncion] = useState("");
    const [motivo, setMotivo] = useState("");
    const [bloques, setBloques] = useState({});
    // VACACIONES
    const [vacFechaDesde, setVacFechaDesde] = useState("");
    const [vacFechaHasta, setVacFechaHasta] = useState("");
    const [vacDiasProgresivos, setVacDiasProgresivos] = useState("");
    const [vacDiasAdicionales, setVacDiasAdicionales] = useState("");
    const [vacFueraRegion, setVacFueraRegion] = useState("");
    const [vacMotivo, setVacMotivo] = useState("");

    // DOCUMENTOS
    const [docTipo, setDocTipo] = useState("");
    const [docMotivo, setDocMotivo] = useState("");

    const diasHabiles = (() => {
      if (!fechaDesde || !fechaHasta) return [];

      const start = new Date(fechaDesde + "T00:00:00");
      const end = new Date(fechaHasta + "T00:00:00");
      const days = [];

      const current = new Date(start);

      while (current <= end) {
        const day = current.getDay(); // 0 dom, 6 sáb
        if (day >= 1 && day <= 5) {   // ✅ lunes a viernes
          const y = current.getFullYear();
          const m = String(current.getMonth() + 1).padStart(2, "0");
          const d = String(current.getDate()).padStart(2, "0");
          days.push(`${y}-${m}-${d}`);
        }
        current.setDate(current.getDate() + 1);
      }

      return days;
    })();

    useEffect(() => {
      api.get("/tipos-solicitud")
        .then(res => {
          setTiposSolicitud(res.data.tipos);
        })
        .catch(err => {
          console.error("Error cargando tipos de solicitud", err);
        });
    }, []);

    const cargarSolicitudes = () => {
      api.get("/mis-solicitudes")
        .then(res => {
          setSolicitudes(res.data.solicitudes);
        })
        .catch(err => {
          console.error("Error cargando mis solicitudes", err);
        });
    };  
    useEffect(() => {
      cargarSolicitudes();
    }, []);

    const handleVerDetalle = (solicitud) => {
      setSolicitudDetalle(solicitud);
      setTab("detalle");
    };

    const formatFecha = (fecha) => {
      if (!fecha) return "";
      return `${fecha.substring(8,10)}-${fecha.substring(5,7)}-${fecha.substring(0,4)}`;
    };

 const tipoSeleccionado = tiposSolicitud.find(t => t.id == tipoSolicitud);

  const handleEnviarSolicitud = async () => {
    // Validación mínima visual
    if (!tipoSolicitud) {
      Swal.fire({
        icon: "warning",
        title: "Falta información",
        text: "Debes seleccionar el tipo de solicitud",
        confirmButtonColor: "#f59e0b", // amarillo
      });
      return;
    }

    // Confirmación antes de enviar
    const result = await Swal.fire({
      title: "¿Confirmar envío?",
      text: "¿Estás seguro de enviar esta solicitud?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#16a34a", // verde
      cancelButtonColor: "#dc2626",  // rojo
    });

    if (!result.isConfirmed) return;

    try {
      const payload = {
        tipo_solicitud_id: tipoSolicitud,
        subtipo: tipoPermiso || docTipo || null,
        fecha_desde: fechaDesde || vacFechaDesde || null,
        fecha_hasta: fechaHasta || vacFechaHasta || null,
        dias_progresivos: vacDiasProgresivos || null,
        dias_adicionales: vacDiasAdicionales || null,
        fuera_region: vacFueraRegion === "si",
        bloques: bloques,
        motivo: motivo || vacMotivo || docMotivo || null,
      };

      const res = await api.post("/solicitudes", payload);

      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: "Tu solicitud fue creada correctamente",
        confirmButtonColor: "#16a34a", // verde
      });

      // Opcional: limpiar formulario
      setTipoSolicitud("");
      setTipoPermiso("");
      setFechaDesde("");
      setFechaHasta("");
      setMotivo("");
      setBloques({});
      setVacFechaDesde("");
      setVacFechaHasta("");
      setVacDiasProgresivos("");
      setVacDiasAdicionales("");
      setVacFueraRegion("");
      setVacMotivo("");
      setDocTipo("");
      setDocMotivo("");
      cargarSolicitudes();
      setTab("listado");

    } catch (error) {
      console.error("Error al crear solicitud", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear la solicitud",
        confirmButtonColor: "#dc2626", // rojo
      });
    }
  };

  const renderEstadoBadge = (estado) => {
    switch (estado) {
      case "creada":
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            Creada
          </span>
        );
      case "aprobada":
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Aprobada
          </span>
        );
      case "rechazada":
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Rechazada
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
            {estado}
          </span>
        );
    }
};



  return (
    <MainLayout user={user} onLogout={onLogout} page={page} onNavigate={onNavigate}>
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">Mis Solicitudes</h2>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("listado")}
            className={`px-4 py-2 rounded transition ${
              tab === "listado"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Mis Solicitudes
          </button>

          <button
            onClick={() => setTab("crear")}
            className={`px-4 py-2 rounded transition ${
              tab === "crear"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Nueva Solicitud
          </button>
        </div>

        {/* CONTENIDO */}
        {tab === "listado" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Listado de solicitudes</h3>

            <div className="text-slate-500 text-sm">
              Aquí se mostrarán todas tus solicitudes.
            </div>

            {/* Tabla placeholder */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left px-3 py-2 border">ID</th>
                    <th className="text-left px-3 py-2 border">Tipo</th>
                    <th className="text-left px-3 py-2 border">Sub tipo</th>
                    <th className="text-left px-3 py-2 border">Fecha</th>
                    <th className="text-left px-3 py-2 border">Estado</th>
                    <th className="text-left px-3 py-2 border">Acción</th>
                  </tr>
                </thead>
                  <tbody>
                    {solicitudes.length === 0 && (
                      <tr>
                        <td className="px-3 py-2 border text-slate-400" colSpan="4">
                          Sin solicitudes aún
                        </td>
                      </tr>
                    )}

                    {solicitudes.map((sol) => (
                      <tr key={sol.id}>
                        <td className="px-3 py-2 border">{sol.id}</td>
                        <td className="px-3 py-2 border">{sol.tipo_solicitud?.nombre}</td>
                        <td className="px-3 py-2 border">{sol.subtipo}</td>
                        <td className="px-3 py-2 border">
                         {new Date(sol.created_at).toLocaleString("es-CL")}

                        </td>
                        <td className="px-3 py-2 border"> {renderEstadoBadge(sol.estado)}</td>
                        <td className="px-3 py-2 border">
                          <button
                            onClick={() => handleVerDetalle(sol)}
                            className="px-3 py-1 text-sm rounded bg-slate-900 text-white hover:bg-slate-800 transition"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        )}

       {tab === "crear" && (
            <div className="bg-white rounded-xl shadow p-6">

                <h3 className="text-lg font-semibold mb-4">Crear nueva solicitud</h3>

                {/* TIPO SOLICITUD */}
                <div className="mb-6">
                <label className="block text-sm text-slate-600">Tipo de solicitud</label>
                <select
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={tipoSolicitud}
                    onChange={(e) => setTipoSolicitud(e.target.value)}
                >
                    <option value="">Seleccione</option>
                    {tiposSolicitud.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                      </option>
                    ))}
                </select>
                </div>
                {/* =========================
                    FORMULARIO VACACIONES
                ========================= */}
                {tipoSeleccionado?.nombre === "Vacaciones" && (
                    <div className="border rounded p-4 bg-slate-50">

                        <h4 className="font-semibold mb-4">Solicitud de Vacaciones</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm text-slate-600">Fecha inicio</label>
                            <input
                            type="date"
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={vacFechaDesde}
                            onChange={(e) => setVacFechaDesde(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-600">Fecha término</label>
                            <input
                            type="date"
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={vacFechaHasta}
                            onChange={(e) => setVacFechaHasta(e.target.value)}
                            />
                        </div>

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* DÍAS PROGRESIVOS */}
                        <div>
                            <label className="block text-sm text-slate-600">Días progresivos</label>
                            <input
                            type="number"
                            min="0"
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={vacDiasProgresivos}
                            onChange={(e) => setVacDiasProgresivos(e.target.value)}
                            placeholder="0"
                            />
                        </div>

                        {/* DÍAS ADICIONALES */}
                        <div>
                            <label className="block text-sm text-slate-600">Días adicionales</label>
                            <input
                            type="number"
                            min="0"
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={vacDiasAdicionales}
                            onChange={(e) => setVacDiasAdicionales(e.target.value)}
                            placeholder="0"
                            />
                        </div>

                        {/* FUERA DE LA REGIÓN */}
                        <div>
                            <label className="block text-sm text-slate-600">¿Fuera de la región?</label>
                            <select
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={vacFueraRegion}
                            onChange={(e) => setVacFueraRegion(e.target.value)}
                            >
                            <option value="">Seleccione</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                            </select>
                        </div>

                        </div>
  
                        <div className="md:col-span-2">
                            <label className="block text-sm text-slate-600">Motivo de la solicitud</label>
                            <textarea
                            rows="3"
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={vacMotivo}
                            onChange={(e) => setVacMotivo(e.target.value)}
                            placeholder="Indique el motivo de las vacaciones..."
                            ></textarea>
                        </div>

                        </div>
                    </div>
                    )}

                {/* =========================
                    FORMULARIO PERMISO
                ========================= */}
                {tipoSeleccionado?.nombre === "Permisos" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* TIPO PERMISO */}
                    <div>
                    <label className="block text-sm text-slate-600">Tipo de permiso</label>
                        <select
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={tipoPermiso}
                        onChange={(e) => setTipoPermiso(e.target.value)}
                        >
                        <option value="">Seleccione</option>
                        <option value="capacitacion">Capacitación</option>
                        <option value="nacimiento">Nacimiento</option>
                        <option value="devolucion_horas">Devolución de horas</option>
                        <option value="casamiento">Casamiento</option>
                        <option value="defuncion">Defunción</option>
                        <option value="goce_sueldo">Con goce de sueldo</option>
                        <option value="fuero_sindical">Fuero sindical</option>
                        </select>
                    </div>
                    {/* UNIDAD */}
                    <div>
                    <label className="block text-sm text-slate-600">Unidad</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={unidad}
                        onChange={(e) => setUnidad(e.target.value)}
                        placeholder="Ej: RRHH, Finanzas..."
                    />
                    </div>
                    {/* FECHA DESDE */}
                    <div>
                    <label className="block text-sm text-slate-600">Fecha desde</label>
                    <input
                        type="date"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                    />
                    </div>

                    {/* FECHA HASTA */}
                    <div>
                    <label className="block text-sm text-slate-600">Fecha hasta</label>
                    <input
                        type="date"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                    />
                    </div>

                    {/* FUNCIÓN */}
                    <div>
                    <label className="block text-sm text-slate-600">Función</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={funcion}
                        onChange={(e) => setFuncion(e.target.value)}
                        placeholder="Ej: Analista, Técnico..."
                    />
                    </div>

                    {/* MOTIVO */}
                    <div>
                    <label className="block text-sm text-slate-600">Motivo</label>
                    <input
                        type="text"
                        className="mt-1 w-full rounded border px-3 py-2"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Describe el motivo del permiso..."
                    />
                    </div>

                    {/* BLOQUES SI ES CON GOCE */}
                    {tipoPermiso === "goce_sueldo" && fechaDesde && fechaHasta && (
                    <div className="md:col-span-2 mt-4 border rounded p-4 bg-slate-50">

                        <h4 className="font-semibold mb-3">Bloques por día hábil</h4>

                        {diasHabiles.map((dia) => (
                        <div key={dia} className="flex items-center gap-4 mb-2">
                            <span className="text-sm text-slate-700 w-32">{dia}</span>

                            <select
                            className="rounded border px-2 py-1 text-sm"
                            value={bloques[dia] || ""}
                            onChange={(e) =>
                                setBloques({ ...bloques, [dia]: e.target.value })
                            }
                            >
                            <option value="">Seleccione bloque</option>
                            <option value="manana">Mañana</option>
                            <option value="tarde">Tarde</option>
                            <option value="ambos">Ambos</option>
                            </select>
                        </div>
                        ))}

                    </div>
                    )}

                </div>
                )}

                {tipoSeleccionado?.nombre === "Documentos" && (
                    <div className="border rounded p-4 bg-slate-50">

                        <h4 className="font-semibold mb-4">Solicitud de Documento</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* TIPO DE DOCUMENTO */}
                        <div>
                            <label className="block text-sm text-slate-600">Tipo de documento</label>
                            <select
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={docTipo}
                            onChange={(e) => setDocTipo(e.target.value)}
                            >
                            <option value="">Seleccione</option>
                            <option value="cert_antiguedad">Certificado de antigüedad</option>
                            <option value="cert_sueldo">Certificado de sueldo</option>
                            <option value="cert_trabajo">Certificado de trabajo</option>
                            <option value="cert_cotizaciones">Certificado de cotizaciones</option>
                            <option value="otro">Otro</option>
                            </select>
                        </div>

                        {/* MOTIVO */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-slate-600">Motivo</label>
                            <textarea
                            rows="3"
                            className="mt-1 w-full rounded border px-3 py-2"
                            value={docMotivo}
                            onChange={(e) => setDocMotivo(e.target.value)}
                            placeholder="Indique el motivo de la solicitud del documento..."
                            ></textarea>
                        </div>

                        </div>
                    </div>
                    )}


                {/* BOTÓN */}
                <div className="mt-6 flex justify-end">
                <button 
                onClick={handleEnviarSolicitud}
                className="px-6 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 transition">
                    Enviar solicitud
                </button>
                </div>

            </div>
            )}
            {tab === "detalle" && solicitudDetalle && (
              <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">
                    Detalle Solicitud #{solicitudDetalle.id}
                  </h3>

                  <button
                    onClick={() => setTab("listado")}
                    className="px-4 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
                  >
                    Volver
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm text-slate-500">Tipo de Solicitud</label>
                    <p className="font-medium">{solicitudDetalle.tipo_solicitud?.nombre}</p>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-500">Estado</label>
                    {renderEstadoBadge(solicitudDetalle.estado)}
                  </div>

                  {solicitudDetalle.fecha_desde && (
                    <div>
                      <label className="block text-sm text-slate-500">Fecha Desde</label>
                      <p className="font-medium">{formatFecha(solicitudDetalle.fecha_desde)}</p>
                    </div>
                  )}

                  {solicitudDetalle.fecha_hasta && (
                    <div>
                      <label className="block text-sm text-slate-500">Fecha Hasta</label>
                      <p className="font-medium">{formatFecha(solicitudDetalle.fecha_hasta)}</p>
                    </div>
                  )}

                  {solicitudDetalle.subtipo && (
                    <div>
                      <label className="block text-sm text-slate-500">Tipo específico</label>
                      <p className="font-medium capitalize">{solicitudDetalle.subtipo}</p>
                    </div>
                  )}

                  {solicitudDetalle.motivo && (
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-500">Motivo</label>
                      <p className="font-medium">{solicitudDetalle.motivo}</p>
                    </div>
                  )}

                  {/* VACACIONES */}
                  {solicitudDetalle.tipo_solicitud?.nombre === "Vacaciones" && (
                    <>
                      <div>
                        <label className="block text-sm text-slate-500">Días progresivos</label>
                        <p className="font-medium">{solicitudDetalle.dias_progresivos}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-500">Días adicionales</label>
                        <p className="font-medium">{solicitudDetalle.dias_adicionales}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-500">Fuera de región</label>
                        <p className="font-medium">
                          {solicitudDetalle.fuera_region ? "Sí" : "No"}
                        </p>
                      </div>
                    </>
                  )}

                  {/* PERMISOS CON BLOQUES */}
                  {solicitudDetalle.bloques && (
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-500 mb-2">Bloques solicitados</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(solicitudDetalle.bloques).map(([dia, bloque]) => (
                          <div
                            key={dia}
                            className="border rounded px-3 py-2 text-sm bg-slate-50"
                          >
                            <strong>{formatFecha(dia)}</strong>: {bloque}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}



      </div>
    </MainLayout>
  );
}
