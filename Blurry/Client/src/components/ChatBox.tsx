import { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { SOCKET_URL } from '@/constants';
import { toast } from 'react-toastify';
import { Send, Bell, Video, Gamepad2, Settings, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    if (userStatus === 'online') return 'text-success-400 bg-success-500/10 border-success-500/30';
    if (userStatus === 'typing') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-zinc-500 bg-zinc-800/50 border-zinc-700';
  };

  return (
    <div className="w-full h-full flex flex-col font-sans bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/globe.svg" alt="Avatar" className="w-10 h-10 rounded-full border border-zinc-700 bg-zinc-800 p-1" />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-900 ${userStatus === 'online' || userStatus === 'typing' ? 'bg-success-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-zinc-600'}`}></div>
          </div>
          <div>
            <h3 className="text-white font-bold tracking-wide">ID: {contactId.slice(0, 8)}...</h3>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${getStatusColorClass()} flex items-center gap-1`}>
                {userStatus === 'typing' ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Typing...</>
                ) : (
                  <><span className={`w-1.5 h-1.5 rounded-full ${userStatus === 'online' ? 'bg-success-400' : 'bg-zinc-500'}`}></span> {userStatus}</>
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <button onClick={() => sendInvite('videollamada')} className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all group" title="Video Call">
            <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => sendGameInvite('Trivia')} className="p-2 rounded-xl bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/40 hover:shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all group" title="Invite Game">
            <Gamepad2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((msg, i) => {
            const isMe = msg.from === userId;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={msg.id || `${msg.from}-${msg.timestamp}-${i}`}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Bubble */}
                  <div
                    className={`relative rounded-2xl px-4 py-2.5 shadow-md ${
                      isMe
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-br-sm border border-primary-500/50 shadow-[0_4px_20px_-5px_rgba(168,85,247,0.4)]' 
                      : 'bg-zinc-800/80 text-zinc-200 rounded-bl-sm border border-zinc-700/50 backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed break-words">{msg.message}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium text-zinc-500 mt-1 uppercase tracking-wider ${isMe ? 'mr-1' : 'ml-1'}`}>{msg.timestamp}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* System Alerts Zone overlay */}
      <div className="absolute top-20 right-4 flex flex-col gap-2 z-20 pointer-events-none w-64 items-end">
        <AnimatePresence>
          {notifications.map((n, i) => (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} key={`notification-${i}-${n}`} className="bg-primary-500/10 backdrop-blur-md border border-primary-500/30 text-primary-400 p-3 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-2 pointer-events-auto w-full">
              <Bell className="w-4 h-4 flex-shrink-0" /> <span className="truncate">{n}</span>
            </motion.div>
          ))}
          {invite && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-400 p-3 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center gap-2 pointer-events-auto w-full">
              <Video className="w-4 h-4 flex-shrink-0 animate-pulse" /> <span className="truncate">{invite}</span>
            </motion.div>
          )}
          {gameInvite && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-orange-500/10 backdrop-blur-md border border-orange-500/30 text-orange-400 p-3 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(249,115,22,0.2)] flex items-center gap-2 pointer-events-auto w-full">
              <Gamepad2 className="w-4 h-4 flex-shrink-0 animate-bounce" /> <span className="truncate">{gameInvite}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/80 border-t border-zinc-800/80 relative z-10 backdrop-blur-md">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Initialize protocol message..."
            className="flex-1 bg-zinc-950/50 border border-zinc-700/80 rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all font-sans text-sm shadow-inner"
          />
          <button 
            onClick={sendMessage} 
            disabled={!input.trim()}
            className={`p-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
              input.trim() 
              ? 'bg-gradient-to-tr from-primary-600 to-accent-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105' 
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700/50'
            }`}
          >
            <Send className={`w-5 h-5 ${input.trim() && 'ml-0.5 -mt-0.5'}`} />
          </button>
        </div>
        
        {/* Admin Dev Tools Layer */}
        {adminAlert && (
          <div className="mt-4 p-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{adminAlert}</span>
          </div>
        )}
      </div>
    </div>
  );
}; 