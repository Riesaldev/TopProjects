'use client';

import React from 'react';
import { User } from '@/types/index';
import { apiClient } from '@/lib/api';
import { cn } from '@/utils/index';

interface ExampleComponentProps {
  user?: User;
  className?: string;
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  user,
  className
}) => {
  return (
    <div className={cn('p-4 rounded-lg border', className)}>
      <h2 className="text-xl font-semibold mb-2">Ejemplo de uso de rutas @/</h2>
      <p>Este componente demuestra el uso de:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><code>@/types</code> - Para importar tipos</li>
        <li><code>@/lib/api</code> - Para importar el cliente API</li>
        <li><code>@/utils</code> - Para importar utilidades</li>
      </ul>
      {user && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p>Usuario: {user.name}</p>
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;