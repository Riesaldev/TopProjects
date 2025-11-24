// Componente simple para probar rutas @/
'use client';

import { cn } from '@/utils/index';

export function TestComponent() {
  return (
    <div className={cn('p-4 bg-blue-100 rounded-lg')}>
      <h3 className="text-lg font-semibold">✅ Las rutas @/ funcionan correctamente!</h3>
      <p>Este componente importa desde:</p>
      <ul className="list-disc list-inside mt-2">
        <li><code>@/utils/index</code> - función cn() importada correctamente</li>
      </ul>
    </div>
  );
}

export default TestComponent;