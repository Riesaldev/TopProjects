"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  estado: string;
  genero: string;
  actividad: string;
  fechaRegistro: string;
  codigoPostal: string;
  rol?: string;
}

const ESTADOS = ["Todos", "Activo", "Suspendido"];
const GENEROS = ["Todos", "Masculino", "Femenino"];
const ACTIVIDADES = ["Todas", "Alta", "Media", "Baja"];
const ROLES = ["usuario", "admin"];

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
  const [modalUser, setModalUser] =useState<Usuario | null>(null);
  const [editUser, setEditUser] =useState<Usuario | null>(null);

  // Filtros
  const [estado, setEstado] =useState("Todos");
  const [genero, setGenero] =useState("Todos");
  const [actividad, setActividad] =useState("Todas");
  const [codigoPostal, setCodigoPostal] =useState("");

  const fetchUsers = () => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      });
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
  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado: nuevoEstado })
    });
    fetchUsers();
  };

  const eliminarUsuario = async (id: string) => {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchUsers();
  };

  const guardarEdicion = async () => {
    if (!editUser) return;
    await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser)
    });
    setEditUser(null);
    fetchUsers();
  };

  // Historial simulado
  const historial = [
    { fecha: "2024-07-10", accion: "Inicio de sesión" },
    { fecha: "2024-07-12", accion: "Cambio de contraseña" },
    { fecha: "2024-07-13", accion: "Compra de tokens" },
    { fecha: "2024-07-14", accion: "Match realizado" }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      {/* Panel de filtros y exportar */}
      <section className="mb-6 w-full max-w-3xl bg-white rounded shadow p-4 flex flex-wrap gap-4 items-end justify-between">
        <div className="flex gap-4 flex-wrap">
          <div>
            <label htmlFor="estado-select" className="block text-sm font-semibold mb-1">Estado</label>
            <select id="estado-select" value={estado} onChange={e => setEstado(e.target.value)} className="border p-2 rounded" title="Filtrar por estado">
              {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="genero-select" className="block text-sm font-semibold mb-1">Género</label>
            <select id="genero-select" value={genero} onChange={e => setGenero(e.target.value)} className="border p-2 rounded" title="Filtrar por género">
              {GENEROS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="actividad-select" className="block text-sm font-semibold mb-1">Actividad</label>
            <select id="actividad-select" value={actividad} onChange={e => setActividad(e.target.value)} className="border p-2 rounded" title="Filtrar por actividad">
              {ACTIVIDADES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="codigo-postal-input" className="block text-sm font-semibold mb-1">Código Postal</label>
            <input id="codigo-postal-input" value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} className="border p-2 rounded" placeholder="Buscar..." />
          </div>
        </div>
        <Button variant="primary" onClick={() => exportCSV(usuariosFiltrados)}>Exportar CSV</Button>
      </section>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="min-w-[350px] border rounded shadow bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Email</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Género</th>
              <th className="p-2">Actividad</th>
              <th className="p-2">Registro</th>
              <th className="p-2">CP</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((user) => (
              <tr key={user.id} className="text-center border-t">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.nombre}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.estado}</td>
                <td className="p-2">{user.genero}</td>
                <td className="p-2">{user.actividad}</td>
                <td className="p-2">{user.fechaRegistro}</td>
                <td className="p-2">{user.codigoPostal}</td>
                <td className="p-2">{user.rol || "usuario"}</td>
                <td className="p-2 flex flex-col gap-2">
                  {user.estado === "Activo" ? (
                    <Button variant="secondary" onClick={() => cambiarEstado(user.id, "Suspendido")}>Suspender</Button>
                  ) : (
                    <Button variant="primary" onClick={() => cambiarEstado(user.id, "Activo")}>Reactivar</Button>
                  )}
                  <Button variant="secondary" onClick={() => setModalUser(user)}>Ver detalles</Button>
                  <Button variant="secondary" onClick={() => setEditUser(user)}>Editar</Button>
                  <Button variant="secondary" onClick={() => eliminarUsuario(user.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal de detalles */}
      <Modal open={!!modalUser} onClose={() => setModalUser(null)} title="Detalles del usuario">
        {modalUser && (
          <div className="flex flex-col gap-2">
            <span><b>ID:</b> {modalUser.id}</span>
            <span><b>Nombre:</b> {modalUser.nombre}</span>
            <span><b>Email:</b> {modalUser.email}</span>
            <span><b>Estado:</b> {modalUser.estado}</span>
            <span><b>Género:</b> {modalUser.genero}</span>
            <span><b>Actividad:</b> {modalUser.actividad}</span>
            <span><b>Fecha de registro:</b> {modalUser.fechaRegistro}</span>
            <span><b>Código Postal:</b> {modalUser.codigoPostal}</span>
            <span><b>Rol:</b> {modalUser.rol || "usuario"}</span>
            <div className="mt-4">
              <b>Historial de actividad:</b>
              <ul className="list-disc ml-6 text-sm mt-1">
                {historial.map((h) => (
                  <li key={`${h.fecha}-${h.accion}`}>{h.fecha} - {h.accion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
      {/* Modal de edición */}
      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Editar usuario">
        {editUser && (
          <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); guardarEdicion(); }}>
            <label className="font-semibold">
              Nombre
              <input 
                className="border p-2 rounded w-full" 
                value={editUser.nombre} 
                onChange={e => setEditUser(u => u ? { ...u, nombre: e.target.value } : u)} 
              />
            </label>
            <label className="font-semibold">
              Email
              <input 
                className="border p-2 rounded w-full" 
                value={editUser.email} 
                onChange={e => setEditUser(u => u ? { ...u, email: e.target.value } : u)} 
              />
            </label>
            <label className="font-semibold">
              Actividad
              <select 
                className="border p-2 rounded w-full" 
                value={editUser.actividad} 
                onChange={e => setEditUser(u => u ? { ...u, actividad: e.target.value } : u)}
              >
                {ACTIVIDADES.slice(1).map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <label className="font-semibold">
              Género
              <select 
                className="border p-2 rounded w-full" 
                value={editUser.genero} 
                onChange={e => setEditUser(u => u ? { ...u, genero: e.target.value } : u)}
              >
                {GENEROS.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <label className="font-semibold">
              Rol
              <select 
                className="border p-2 rounded w-full" 
                value={editUser.rol || "usuario"} 
                onChange={e => setEditUser(u => u ? { ...u, rol: e.target.value } : u)}
              >
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <div className="flex gap-2 mt-2">
              <Button type="submit" variant="primary">Guardar</Button>
              <Button type="button" variant="secondary" onClick={() => setEditUser(null)}>Cancelar</Button>
            </div>
          </form>
        )}
      </Modal>
    </main>
  );
} 