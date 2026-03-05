import { createContext, useContext } from 'react';
import { useRealtimeEvents } from '@/hooks/useRealtimeEvents';

type RealtimeContextValue = ReturnType<typeof useRealtimeEvents>;

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export const RealtimeProvider = ({ userId, jwt, children }: { userId: string, jwt: string, children: React.ReactNode }) => {
  const realtime = useRealtimeEvents(userId, jwt);
  return (
    <RealtimeContext.Provider value={realtime}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext);