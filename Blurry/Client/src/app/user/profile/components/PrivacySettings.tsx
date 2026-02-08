
export default function PrivacySettings() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6">
      <h2 className="text-lg font-bold mb-2">Privacidad</h2>
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />
        Perfil público
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />
        Permitir recibir mensajes
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />
        Mostrarme en búsquedas
      </label>
    </div>
  );
} 