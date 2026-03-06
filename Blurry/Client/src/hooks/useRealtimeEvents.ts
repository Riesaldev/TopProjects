import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { SOCKET_URL } from '@/constants';
import { toast } from 'react-toastify';

type GameInvite = {
  from?: string;
  gameType?: string;
};

type VideoCallInvite = {
  from?: string;
  type?: string;
};

type MetricUpdate = {
  metric?: string;
  value?: number;
};

export function useRealtimeEvents(userId: string, jwt: string) {
  const socket = useSocket(SOCKET_URL, jwt);
  const [gameInvite, setGameInvite] = useState<GameInvite | null>(null);
  const [videoCallInvite, setVideoCallInvite] = useState<VideoCallInvite | null>(null);
  const [adminAlert, setAdminAlert] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricUpdate | null>(null);
  const [userStatus, setUserStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!socket) return;
    socket.on('receiveGameInvite', (data: GameInvite) => {
      setGameInvite(data);
      toast.info(`${data.from || 'Alguien'} te ha invitado a jugar: ${data.gameType || 'juego'}`);
    });
    socket.on('receiveInvite', (data: VideoCallInvite) => {
      setVideoCallInvite(data);
      toast.info(`${data.from || 'Alguien'} te ha invitado a una ${data.type || 'videollamada'}`);
    });
    socket.on('receiveAdminAlert', (data: { alert?: string }) => {
      const alertMessage = data.alert || 'Alerta sin detalle';
      setAdminAlert(alertMessage);
      toast.error(`Alerta admin: ${alertMessage}`);
    });
    socket.on('metricUpdate', (data: MetricUpdate) => setMetric(data));
    socket.on('userStatus', (data: { userId?: string; status?: string }) => {
      const currentUserId = data.userId;
      const currentStatus = data.status;
      if (typeof currentUserId !== 'string' || typeof currentStatus !== 'string') return;
      setUserStatus((prev) => ({ ...prev, [currentUserId]: currentStatus }));
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