import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { SOCKET_URL } from '@/constants';
import { toast } from 'react-toastify';

export function useRealtimeEvents(userId: string, jwt: string) {
  const socket = useSocket(SOCKET_URL, jwt);
  const [gameInvite, setGameInvite] = useState<any>(null);
  const [videoCallInvite, setVideoCallInvite] = useState<any>(null);
  const [adminAlert, setAdminAlert] = useState<string | null>(null);
  const [metric, setMetric] = useState<any>(null);
  const [userStatus, setUserStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!socket) return;
    socket.on('receiveGameInvite', (data) => {
      setGameInvite(data);
      toast.info(`${data.from} te ha invitado a jugar: ${data.gameType}`);
    });
    socket.on('receiveInvite', (data) => {
      setVideoCallInvite(data);
      toast.info(`${data.from} te ha invitado a una ${data.type}`);
    });
    socket.on('receiveAdminAlert', (data) => {
      setAdminAlert(data.alert);
      toast.error(`Alerta admin: ${data.alert}`);
    });
    socket.on('metricUpdate', setMetric);
    socket.on('userStatus', (data) => {
      setUserStatus((prev) => ({ ...prev, [data.userId]: data.status }));
    });
    return () => {
      socket.off('receiveGameInvite');
      socket.off('receiveInvite');
      socket.off('receiveAdminAlert');
      socket.off('metricUpdate');
      socket.off('userStatus');
    };
  }, [socket]);

  // Métodos para emitir eventos
  const sendGameInvite = (to: string, gameType: string) => {
    socket?.emit('startGame', { to, from: userId, gameType });
  };
  const sendVideoCallInvite = (to: string) => {
    socket?.emit('invite', { to, from: userId, type: 'videollamada' });
  };
  const sendAdminAlert = (to: string, alert: string) => {
    socket?.emit('adminAlert', { to, alert });
  };
  const sendMetricUpdate = (metric: string, value: number) => {
    socket?.emit('metricUpdate', { metric, value });
  };
  const sendStatus = (status: string) => {
    socket?.emit('status', { userId, status });
  };

  return {
    socket,
    gameInvite,
    videoCallInvite,
    adminAlert,
    metric,
    userStatus,
    sendGameInvite,
    sendVideoCallInvite,
    sendAdminAlert,
    sendMetricUpdate,
    sendStatus,
  };
} 