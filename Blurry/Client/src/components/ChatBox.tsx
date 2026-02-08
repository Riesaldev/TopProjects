import { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { SOCKET_URL } from '@/constants';
import { toast } from 'react-toastify';

interface Message {
  id?: string;
  from: string;
  to: string;
  message: string;
  timestamp?: string;
}

export const ChatBox: React.FC<{ userId: string; contactId: string; jwt: string }> = ({ userId, contactId, jwt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [invite, setInvite] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<'online' | 'offline' | 'typing'>('offline');
  const [gameInvite, setGameInvite] = useState<string | null>(null);
  const [metric, setMetric] = useState<{ metric: string; value: number } | null>(null);
  const [adminAlert, setAdminAlert] = useState<string | null>(null);
  const socket = useSocket(SOCKET_URL, jwt);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!socket) return;
    
    const onReceive = (data: Message) => {
      if ((data.from === contactId && data.to === userId) || (data.from === userId && data.to === contactId)) {
        setMessages((prev) => [...prev, { ...data, id: `${Date.now()}-${Math.random()}`, timestamp: new Date().toLocaleTimeString() }]);
      }
    };
    const onNotify = (data: { to: string; notification: string }) => {
      if (data.to === userId) {
        setNotifications((prev) => [...prev, data.notification]);
        toast.info(data.notification);
      }
    };
    const onInvite = (data: { to: string; from: string; type: string }) => {
      if (data.to === userId) {
        setInvite(`${data.from} te ha invitado a una ${data.type}`);
        toast.info(`${data.from} te ha invitado a una ${data.type}`);
      }
    };
    const onUserStatus = (data: { userId: string; status: 'online' | 'offline' | 'typing' }) => {
      if (data.userId === contactId) setUserStatus(data.status);
    };
    const onGameInvite = (data: { to: string; from: string; gameType: string }) => {
      if (data.to === userId) {
        setGameInvite(`${data.from} te ha invitado a jugar: ${data.gameType}`);
        toast.info(`${data.from} te ha invitado a jugar: ${data.gameType}`);
      }
    };
    const onMetricUpdate = (data: { metric: string; value: number }) => {
      setMetric(data);
      toast.info(`Métrica actualizada: ${data.metric} = ${data.value}`);
    };
    const onAdminAlert = (data: { to: string; alert: string }) => {
      if (data.to === userId) {
        setAdminAlert(data.alert);
        toast.error(`Alerta admin: ${data.alert}`);
      }
    };
    socket.on('receiveMessage', onReceive);
    socket.on('receiveNotification', onNotify);
    socket.on('receiveInvite', onInvite);
    socket.on('userStatus', onUserStatus);
    socket.on('receiveGameInvite', onGameInvite);
    socket.on('metricUpdate', onMetricUpdate);
    socket.on('receiveAdminAlert', onAdminAlert);
    return () => {
      socket.off('receiveMessage', onReceive);
      socket.off('receiveNotification', onNotify);
      socket.off('receiveInvite', onInvite);
      socket.off('userStatus', onUserStatus);
      socket.off('receiveGameInvite', onGameInvite);
      socket.off('metricUpdate', onMetricUpdate);
      socket.off('receiveAdminAlert', onAdminAlert);
    };
  }, [socket, userId, contactId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const sendMessage = () => {
    if (input.trim() && socket) {
      const msg: Message = { id: `${Date.now()}-${Math.random()}`, from: userId, to: contactId, message: input, timestamp: new Date().toLocaleTimeString() };
      socket.emit('sendMessage', msg);
      setMessages((prev) => [...prev, msg]);
      setInput('');
      socket.emit('status', { userId, status: 'online' });
      socket.emit('status', { userId, status: 'online' });
    }
  };
  const sendNotification = (notification: string) => {
    if (socket) {
      socket.emit('notify', { to: contactId, notification });
    }
  };

  const sendInvite = (type: string) => {
    if (socket) {
      socket.emit('invite', { to: contactId, from: userId, type });
    }
  };

  const sendGameInvite = (gameType: string) => {
    if (socket) {
      socket.emit('startGame', { to: contactId, from: userId, gameType });
    }
  };

  const sendMetricUpdate = (metric: string, value: number) => {
    if (socket) {
      socket.emit('metricUpdate', { metric, value });
    }
  };

  const sendAdminAlert = (alert: string) => {
    if (socket) {
      socket.emit('adminAlert', { to: contactId, alert });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (socket) {
      socket.emit('status', { userId, status: 'typing' });
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        socket.emit('status', { userId, status: 'online' });
      }, 1500);
    }
  };

  const getStatusColorClass = () => {
    if (userStatus === 'online') return 'text-green-500';
    if (userStatus === 'typing') return 'text-orange-500';
    return 'text-gray-400';
  };

  return (
    <div className="max-w-[420px] mx-auto font-[Montserrat] bg-[#f4f6fa] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-4">
      <div className={`mb-1 font-semibold ${getStatusColorClass()}`}>
      Estado de contacto: {userStatus === 'typing' ? 'escribiendo...' : userStatus}
      </div>
      {messages.map((msg, i) => (
        <div
        key={msg.id || `${msg.from}-${msg.timestamp}-${i}`}
        className={`flex flex-col mb-1 ${msg.from === userId ? 'items-end' : 'items-start'}`}
        >
        <div
          className={`max-w-[75%] rounded-2xl px-3 py-2 ${
            msg.from === userId
            ? 'bg-[#6c63ff] text-white' 
            : 'bg-gray-200 text-[#222]'
          }`}
        >
          <b>{msg.from === userId ? 'Tú' : 'Contacto'}:</b> {msg.message}
        </div>
        <span className="text-[10px] text-gray-500 mt-0.5">{msg.timestamp}</span>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <input
      value={input}
      onChange={handleInputChange}
      onKeyDown={e => e.key === 'Enter' && sendMessage()}
      placeholder="Escribe un mensaje..."
      className="w-[80%] rounded-lg border border-gray-400 p-2 text-[15px]"
      />
      <button onClick={sendMessage} className="w-[18%] bg-[#6c63ff] text-white border-none rounded-lg ml-1 p-2">Enviar</button>
      <button onClick={() => sendNotification('¡Tienes una nueva notificación!')} className="w-full mt-2 bg-[#00bfae] text-white border-none rounded-lg p-2">Enviar notificación</button>
      <button onClick={() => sendInvite('videollamada')} className="w-full mt-2 bg-blue-600 text-white border-none rounded-lg p-2">Invitar a videollamada</button>
      <button onClick={() => sendGameInvite('Trivia')} className="w-full mt-2 bg-orange-500 text-white border-none rounded-lg p-2">Invitar a juego: Trivia</button>
      <button onClick={() => sendMetricUpdate('usuarios_online', Math.floor(Math.random() * 100))} className="w-full mt-2 bg-green-500 text-white border-none rounded-lg p-2">Actualizar métrica (admin)</button>
      <button onClick={() => sendAdminAlert('¡Incidencia detectada!')} className="w-full mt-2 bg-red-600 text-white border-none rounded-lg p-2">Enviar alerta admin</button>
      <div className="mt-2">
      {notifications.map((n, i) => (
        <div key={`notification-${i}-${n}`} className="text-[#00bfae]">🔔 {n}</div>
      ))}
      {invite && <div className="text-blue-600 font-semibold">🎥 {invite}</div>}
      {gameInvite && <div className="text-orange-500 font-semibold">🎮 {gameInvite}</div>}
      {metric && <div className="text-green-500 font-semibold">📊 {metric.metric}: {metric.value}</div>}
      {adminAlert && <div className="text-red-600 font-semibold">🚨 {adminAlert}</div>}
      </div>
    </div>
  );
}; 