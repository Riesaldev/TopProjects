"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import ViewState from "@/components/ViewState";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  estado: string;
  genero: string;
  actividad: string;
  fechaRegistro: string;
  codigoPostal: string;
  rol?: string;
}

interface ActivityItem {
  id: number;
  fecha: string;
  accion: string;
}

const ESTADOS = ["Todos", "Activo", "Suspendido"];
const GENEROS = ["Todos", "Masculino", "Femenino"];
const ACTIVIDADES = ["Todas", "Alta", "Media", "Baja"];
const ROLES = ["usuario", "admin"];

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function exportCSV(usuarios: Usuario[]) {
  const header = "ID,Nombre,Email,Estado,Género,Actividad,Registro,CP,Rol\n";
  const rows = usuarios.map(u => `${u.id},${u.nombre},${u.email},${u.estado},${u.genero},${u.actividad},${u.fechaRegistro},${u.codigoPostal},${u.rol || "usuario"}`).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "usuarios.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminUsersPage() {
  const realtimeContext = useRealtime();
  const adminAlert = realtimeContext?.adminAlert;

  useEffect(() => {
    if (adminAlert) {
      // Mostrar banner o toast de alerta admin
      alert(`Alerta admin: ${adminAlert}`);
    }
  }, [adminAlert]);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalUser, setModalUser] = useState<Usuario | null>(null);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [activityHistory, setActivityHistory] = useState<ActivityItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [estado, setEstado] = useState("Todos");
  const [genero, setGenero] = useState("Todos");
  const [actividad, setActividad] = useState("Todas");
  const [codigoPostal, setCodigoPostal] = useState("");

  const getAuthHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt-token") : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  };

  const normalizeUser = (raw: unknown): Usuario => {
    const user = asRecord(raw);
    const isSuspended = Boolean(user.is_suspended);
    const genderRaw = String(user.gender ?? user.genero ?? "").toLowerCase();
    const genero =
      genderRaw === "male" || genderRaw === "masculino"
        ? "Masculino"
        : genderRaw === "female" || genderRaw === "femenino"
          ? "Femenino"
          : "No especificado";

    return {
      id: Number(user.id ?? 0),
      nombre: String(user.display_name ?? user.nombre ?? `Usuario ${user.id ?? ""}`),
      email: String(user.email ?? ""),
      estado: isSuspended ? "Suspendido" : "Activo",
      genero,
      actividad: isSuspended ? "Baja" : "Media",
      fechaRegistro: user.created_at
        ? new Date(String(user.created_at)).toLocaleDateString()
        : String(user.fechaRegistro ?? "-"),
      codigoPostal: String(user.location ?? user.codigoPostal ?? "-"),
      rol: String(user.role ?? user.rol ?? "usuario"),
    };
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users", { headers: getAuthHeaders() });
      const data = await res.json().catch(() => []);
      const normalized = Array.isArray(data) ? data.map(normalizeUser) : [];
      setUsuarios(normalized);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsuarios([]);
      setError("No se pudo cargar la lista de usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrado
  const usuariosFiltrados = usuarios.filter((user) => {
    return (
      (estado === "Todos" || user.estado === estado) &&
      (genero === "Todos" || user.genero === genero) &&
      (actividad === "Todas" || user.actividad === actividad) &&
      (codigoPostal === "" || user.codigoPostal.includes(codigoPostal))
    );
  });

  // Acciones
  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    const endpoint = nuevoEstado === "Suspendido"
      ? `/api/users/${id}/suspend`
      : `/api/users/${id}/unsuspend`;

    const payload = nuevoEstado === "Suspendido"
      ? { reason: "Suspendido por administrador" }
      : {};

    await fetch(endpoint, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    fetchUsers();
  };

  const eliminarUsuario = async (id: number) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    fetchUsers();
  };

  const guardarEdicion = async () => {
    if (!editUser) return;
    const backendGender = editUser.genero === "Masculino"
      ? "male"
      : editUser.genero === "Femenino"
        ? "female"
        : null;

    await fetch(`/api/users/${editUser.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        display_name: editUser.nombre,
        email: editUser.email,
        gender: backendGender,
        role: editUser.rol || "usuario",
        location: editUser.codigoPostal,
      }),
    });
    setEditUser(null);
    fetchUsers();
  };

  useEffect(() => {
    const loadActivity = async () => {
      if (!modalUser) {
        setActivityHistory([]);
        return;
      }

      try {
        const res = await fetch("/api/activity-logs", { headers: getAuthHeaders() });
        const data = await res.json().catch(() => []);
        const history = (Array.isArray(data) ? data : [])
          .map(asRecord)
          .filter((item) => Number(item.user_id ?? 0) === Number(modalUser.id))
          .map((item) => ({
            id: Number(item.id ?? 0),
            fecha: item.created_at ? new Date(String(item.created_at)).toLocaleString() : "-",
            accion: String(item.action ?? "Actividad"),
          }));
        setActivityHistory(history);
      } catch (error) {
        console.error("Error cargando actividad del usuario:", error);
        setActivityHistory([]);
      }
    };

    loadActivity();
  }, [modalUser]);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto w-full max-w-6xl">
        <section className="mb-6 rounded-3xl border border-zinc-800/70 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-400">Admin Panel</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Gestion de Usuarios</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Filtra, revisa actividad y aplica acciones administrativas desde una sola vista.
          </p>
        </section>

        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Total</p>
            <p className="mt-1 text-2xl font-black text-white">{usuarios.length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Activos</p>
            <p className="mt-1 text-2xl font-black text-emerald-300">{usuarios.filter((u) => u.estado === "Activo").length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Suspendidos</p>
            <p className="mt-1 text-2xl font-black text-amber-300">{usuarios.filter((u) => u.estado === "Suspendido").length}</p>
          </div>
        </section>

        {/* Panel de filtros y exportar */}
        <section className="mb-6 w-full rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-4 shadow-lg shadow-black/20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-1 flex-wrap gap-4">
          <div>
            <label htmlFor="estado-select" className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Estado</label>
            <select
              id="estado-select"
              value={estado}
              onChange={e => setEstado(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              title="Filtrar por estado"
            >
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="genero-select" className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Genero</label>
            <select
              id="genero-select"
              value={genero}
              onChange={e => setGenero(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              title="Filtrar por genero"
            >
              {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="actividad-select" className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Actividad</label>
            <select
              id="actividad-select"
              value={actividad}
              onChange={e => setActividad(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              title="Filtrar por actividad"
            >
              {ACTIVIDADES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="codigo-postal-input" className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Codigo Postal</label>
            <input
              id="codigo-postal-input"
              value={codigoPostal}
              onChange={e => setCodigoPostal(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 sm:w-auto"
              placeholder="Buscar..."
            />
          </div>
            </div>
            <Button variant="outline" className="w-full border-zinc-600 text-zinc-200 hover:bg-zinc-800 sm:w-auto" onClick={() => exportCSV(usuariosFiltrados)}>
              Exportar CSV
            </Button>
        </div>
        </section>

      {loading ? (
        <ViewState variant="loading" title="Cargando usuarios" description="Consultando perfiles y estado de actividad." className="w-full max-w-md" />
      ) : error ? (
        <ViewState variant="error" title="Error al cargar usuarios" description={error} className="w-full max-w-md" />
      ) : usuariosFiltrados.length === 0 ? (
        <ViewState variant="empty" title="Sin usuarios para este filtro" description="Prueba ajustando estado, genero o actividad." className="w-full max-w-md" />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800/70 bg-zinc-900/70 shadow-xl shadow-black/20">
        <table className="w-full min-w-[980px]">
          <thead>
            <tr className="bg-zinc-800/90 text-zinc-200">
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">ID</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Nombre</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Estado</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Genero</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Actividad</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Registro</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">CP</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Rol</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((user) => (
              <tr key={user.id} className="border-t border-zinc-800/80 text-sm text-zinc-200">
                <td className="p-3 align-top text-zinc-400">{user.id}</td>
                <td className="p-3 align-top font-semibold text-white">{user.nombre}</td>
                <td className="p-3 align-top text-zinc-300">{user.email}</td>
                <td className="p-3 align-top">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                    user.estado === "Activo"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-amber-500/15 text-amber-300"
                  }`}>
                    {user.estado}
                  </span>
                </td>
                <td className="p-3 align-top text-zinc-300">{user.genero}</td>
                <td className="p-3 align-top text-zinc-300">{user.actividad}</td>
                <td className="p-3 align-top text-zinc-400">{user.fechaRegistro}</td>
                <td className="p-3 align-top text-zinc-400">{user.codigoPostal}</td>
                <td className="p-3 align-top text-zinc-300">{user.rol || "usuario"}</td>
                <td className="p-3 align-top">
                  <div className="flex flex-wrap gap-2">
                  {user.estado === "Activo" ? (
                    <Button size="sm" variant="secondary" onClick={() => cambiarEstado(user.id, "Suspendido")}>Suspender</Button>
                  ) : (
                    <Button size="sm" variant="primary" onClick={() => cambiarEstado(user.id, "Activo")}>Reactivar</Button>
                  )}
                  <Button size="sm" variant="outline" className="border-zinc-600 text-zinc-200 hover:bg-zinc-800" onClick={() => setModalUser(user)}>Detalles</Button>
                  <Button size="sm" variant="outline" className="border-zinc-600 text-zinc-200 hover:bg-zinc-800" onClick={() => setEditUser(user)}>Editar</Button>
                  <Button size="sm" variant="danger" onClick={() => eliminarUsuario(user.id)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>
      {/* Modal de detalles */}
      <Modal open={!!modalUser} onClose={() => setModalUser(null)} title="Detalles del usuario" theme="dark">
        {modalUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm sm:grid-cols-2">
              <p><span className="font-bold text-zinc-400">ID:</span> {modalUser.id}</p>
              <p><span className="font-bold text-zinc-400">Estado:</span> {modalUser.estado}</p>
              <p><span className="font-bold text-zinc-400">Nombre:</span> {modalUser.nombre}</p>
              <p><span className="font-bold text-zinc-400">Genero:</span> {modalUser.genero}</p>
              <p className="sm:col-span-2"><span className="font-bold text-zinc-400">Email:</span> {modalUser.email}</p>
              <p><span className="font-bold text-zinc-400">Actividad:</span> {modalUser.actividad}</p>
              <p><span className="font-bold text-zinc-400">Registro:</span> {modalUser.fechaRegistro}</p>
              <p><span className="font-bold text-zinc-400">Codigo Postal:</span> {modalUser.codigoPostal}</p>
              <p><span className="font-bold text-zinc-400">Rol:</span> {modalUser.rol || "usuario"}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
              <p className="mb-2 text-xs font-black uppercase tracking-wider text-zinc-500">Historial de actividad</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                {activityHistory.map((h) => (
                  <li key={h.id} className="rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">
                    <span className="font-semibold text-zinc-200">{h.accion}</span>
                    <span className="block text-xs text-zinc-500">{h.fecha}</span>
                  </li>
                ))}
                {activityHistory.length === 0 ? <li className="text-zinc-500">Sin registros</li> : null}
              </ul>
            </div>
          </div>
        )}
      </Modal>
      {/* Modal de edición */}
      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Editar usuario" theme="dark">
        {editUser && (
          <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); guardarEdicion(); }}>
            <label className="text-sm font-semibold text-zinc-300">
              Nombre
              <input 
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100" 
                value={editUser.nombre} 
                onChange={e => setEditUser(u => u ? { ...u, nombre: e.target.value } : u)} 
              />
            </label>
            <label className="text-sm font-semibold text-zinc-300">
              Email
              <input 
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100" 
                value={editUser.email} 
                onChange={e => setEditUser(u => u ? { ...u, email: e.target.value } : u)} 
              />
            </label>
            <label className="text-sm font-semibold text-zinc-300">
              Actividad
              <select 
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100" 
                value={editUser.actividad} 
                onChange={e => setEditUser(u => u ? { ...u, actividad: e.target.value } : u)}
              >
                {ACTIVIDADES.slice(1).map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-zinc-300">
              Genero
              <select 
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100" 
                value={editUser.genero} 
                onChange={e => setEditUser(u => u ? { ...u, genero: e.target.value } : u)}
              >
                {GENEROS.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-zinc-300">
              Rol
              <select 
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100" 
                value={editUser.rol || "usuario"} 
                onChange={e => setEditUser(u => u ? { ...u, rol: e.target.value } : u)}
              >
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <div className="flex gap-2 mt-2">
              <Button type="submit" variant="primary">Guardar</Button>
              <Button type="button" variant="outline" className="border-zinc-600 text-zinc-200 hover:bg-zinc-800" onClick={() => setEditUser(null)}>Cancelar</Button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
} 