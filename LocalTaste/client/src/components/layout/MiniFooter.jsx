/**
 * @fileoverview Componente de pie de página minimalista
 * Versión reducida del footer para páginas de productos y productores
 */

/**
 * MiniFooter - Pie de página simplificado
 * 
 * Versión compacta del footer para páginas internas.
 * Muestra solo copyright y mensaje motivacional.
 * 
 * Usado en:
 * - Página de productos
 * - Página de productores
 * - Otras páginas internas donde el Footer completo sería excesivo
 * 
 * @returns {JSX.Element} Componente MiniFooter
 * 
 * @example
 * <MiniFooter />
 */
export default function MiniFooter () {
  return (
    <>
      <div className="max-w-8xl mx-auto bg-green-50/60 min-h-[8vh]">
        <div className="border-t border-[#e7f3ec] pt-8 flex flex-col md:flex-row justify-around items-center gap-4 text-sm text-green-600">
          <p>© 2025 LocalTaste ... Conectando comunidades, aportando calidad a su alimentación.</p>
          <div className="flex gap-6">
            <span>¡Hecho con <span className="text-red-500">♥</span> localmente!</span>
          </div>
        </div>
      </div>
    </>
  );
}