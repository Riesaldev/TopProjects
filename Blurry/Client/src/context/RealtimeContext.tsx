import { createContext, useContext } from 'react';
import { useRealtimeEvents } from '@/hooks/useRealtimeEvents';

const RealtimeContext = createContext<any>(null);

export const RealtimeProvider = ({ userId, jwt, children }: { userId: string, jwt: string, children: React.ReactNode }) => {
  const realtime = useRealtimeEvents(userId, jwt);
  return (
    <RealtimeContext.Provider value={realtime}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext); 