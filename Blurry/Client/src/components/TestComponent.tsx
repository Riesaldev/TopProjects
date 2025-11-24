"use client";

import { useNotifications } from "@/components/NotificationsContext";

export default function TestComponent() {
  const { showToast } = useNotifications();

  const testCases = [
    () => showToast("Mensaje de prueba", "info"),
    () => showToast("Éxito de prueba", "success"),
    () => showToast("Error de prueba", "error"),
  ];

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-bold text-primary-700">Pruebas del NotificationsContext</h2>
      {testCases.map((test, index) => (
        <button
          key={index}
          onClick={test}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg mr-2"
        >
          Prueba {index + 1}
        </button>
      ))}
    </div>
  );
}
