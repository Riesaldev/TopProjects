import Button from "./Button";

export default function ReportForm() {
  return (
    <form className="w-full max-w-md mx-auto mt-6 glass-panel border border-zinc-800/60 rounded-2xl shadow-xl p-5 sm:p-6 flex flex-col gap-4" aria-label="Formulario de reporte o denuncia">
      <div>
        <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">Reportar Incidencia</h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">Describe el problema para que el equipo de moderacion pueda revisarlo.</p>
      </div>

      <label htmlFor="report-type" className="text-sm font-semibold text-zinc-200">Tipo de reporte
        <select id="report-type" className="mt-1.5 border border-zinc-700/80 bg-black/40 text-zinc-100 p-2.5 rounded-xl w-full focus-visible:ring-2 focus-visible:ring-primary-400 focus:border-primary-500" required aria-required="true">
          <option value="irregularidad" className="bg-zinc-900">Irregularidad o falta de usuario</option>
          <option value="tecnica" className="bg-zinc-900">Incidencia tecnica</option>
        </select>
      </label>

      <label htmlFor="report-desc" className="text-sm font-semibold text-zinc-200">Descripcion
        <textarea id="report-desc" placeholder="Describe el problema o la falta" className="mt-1.5 border border-zinc-700/80 bg-black/40 text-zinc-100 p-2.5 rounded-xl w-full focus-visible:ring-2 focus-visible:ring-primary-400 focus:border-primary-500 placeholder:text-zinc-500" rows={4} required aria-required="true" />
      </label>

      <Button type="submit" variant="primary" fullWidth aria-label="Enviar reporte">Enviar reporte</Button>
      {/* <div aria-live="polite" className="text-red-600 text-sm mt-2">Aquí aparecerán errores de reporte</div> */}
    </form>
  );
} 