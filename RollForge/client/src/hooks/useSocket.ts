/**
 * Hook para gestionar la conexión Socket.io con el servidor.
 *
 * Uso:
 *   const { socket, isConnected } = useSocket(campaignId);
 *
 * Mientras el servidor no esté levantado, el socket simplemente
 * no conecta y isConnected permanece en false —sin romper la app.
 */

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3000';

export interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
}

export function useSocket(campaignId: number | null): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!campaignId) return;

    const token = localStorage.getItem('token');

    const socket = io(SERVER_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      // No lanzar error si el server no está disponible
      timeout: 4000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join:campaign', { campaignId });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', () => {
      // El servidor no está disponible — operamos en modo offline
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [campaignId]);

  return { socket: socketRef.current, isConnected };
}
