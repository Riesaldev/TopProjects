/**
 * Hook consumidor del GameContext.
 * Separado de GameContext.tsx para que Vite Fast Refresh
 * reconozca correctamente el módulo como "solo hooks" (no mezcla con componentes).
 */

import { useContext } from 'react';
import { GameContext, type GameContextValue } from '@/context/GameContext';

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
