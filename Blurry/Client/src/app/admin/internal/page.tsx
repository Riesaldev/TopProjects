"use client";


const mockAdmins = [
  { id: "1", name: "Admin 1", lastMessage: "¿Revisaste el reporte?", online: true },
  { id: "2", name: "Admin 2", lastMessage: "Listo para la videollamada.", online: false },
];

export default function AdminInternalPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Interacción Interna</h1>
      <ul className="w-full max-w-md divide-y divide-gray-200 bg-white rounded shadow mb-6">
        {mockAdmins.map((admin) => (
          <li key={admin.id} className="p-4 flex justify-between items-center">
            <div>
              <span className="font-semibold">{admin.name}</span>
              <span className="ml-2 text-xs text-gray-400">{admin.online ? '● Online' : 'Offline'}</span>
              <div className="text-sm text-gray-600">{admin.lastMessage}</div>
            </div>
            <button className="bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700">Mensaje</button>
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 ml-2">Videollamada</button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-md bg-white rounded shadow p-4 text-center text-gray-500 text-sm">
        Las alertas y notificaciones aparecerán aquí.
      </div>
    </main>
  );
} 