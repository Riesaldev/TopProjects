import Button from "./Button";

export default function ReportForm() {
  return (
    <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6 bg-primary-50 p-4 rounded-lg shadow" aria-label="Formulario de reporte o denuncia">
      <h2 className="text-lg font-bold mb-2 text-primary-700">Reportar incidencia o denuncia</h2>
      <label htmlFor="report-type" className="font-semibold">Tipo de reporte
        <select id="report-type" className="border border-accent-400 p-2 rounded-lg w-full focus:outline-primary-400" required aria-required="true">
          <option value="irregularidad">Irregularidad o falta de usuario</option>
          <option value="tecnica">Incidencia técnica</option>
        </select>
      </label>
      <label htmlFor="report-desc" className="font-semibold">Descripción
        <textarea id="report-desc" placeholder="Describe el problema o la falta" className="border border-accent-400 p-2 rounded-lg w-full focus:outline-primary-400" rows={4} required aria-required="true" />
      </label>
      <Button type="submit" aria-label="Enviar reporte">Enviar reporte</Button>
      {/* <div aria-live="polite" className="text-red-600 text-sm mt-2">Aquí aparecerán errores de reporte</div> */}
    </form>
  );
} 