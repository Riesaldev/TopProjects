import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string, token?: string) {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(url, {
      withCredentials: true,
      auth: { token },
    });
    return () => {
      socket.current?.disconnect();
    };
  }, [url, token]);

  return socket.current;
} 