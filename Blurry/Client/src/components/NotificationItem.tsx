
import { Bell, Trophy, Activity, AlertCircle, X, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Notification = {
  id: number;
  text: string;
  type?: "sistema" | "recompensa" | "actividad" | "alerta" | string;
  read?: boolean;
  timestamp: string;
};

type Props = {
  notification: Notification;
  onMarkRead?: () => void;
  onDelete?: () => void;
  markReadLoading?: boolean;
  deleteLoading?: boolean;
};

export default function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
  markReadLoading = false,
  deleteLoading = false,
}: Props) {
  const hasActionLoading = markReadLoading || deleteLoading;
  let colorClass = "bg-primary-500/10 border-primary-500/30 text-primary-400";
  let Icon = Bell;

  if (notification.type === "recompensa") {
    colorClass = "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
    Icon = Trophy;
  }
  if (notification.type === "alerta") {
    colorClass = "bg-red-500/10 border-red-500/30 text-red-400";
    Icon = AlertCircle;
  }
  if (notification.type === "actividad") {
    colorClass = "bg-green-500/10 border-green-500/30 text-green-400";
    Icon = Activity;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative overflow-hidden group rounded-2xl p-4 mb-3 border backdrop-blur-md flex flex-col gap-2 transition-all duration-300 ${!notification.read ? 'bg-zinc-900/80 shadow-[0_0_15px_rgba(255,255,255,0.02)]' : 'bg-zinc-900/40 opacity-70'} hover:bg-zinc-800/80 hover:border-zinc-700`}
    >
      {/* Indicador de "No Leída" */}
      {!notification.read && (
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
      )}

      <div className="flex gap-4 items-start">
        <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm md:text-base leading-tight ${notification.read ? 'text-zinc-400' : 'text-zinc-200 font-medium'}`}>
            {notification.text}
          </p>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1.5 block">
            {notification.timestamp ? new Date(notification.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Hora desconocida'}
          </span>
        </div>

        <div className={`flex gap-2 items-center shrink-0 transition-opacity ${hasActionLoading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          {onMarkRead && !notification.read && (
            <button 
              type="button"
              onClick={onMarkRead} 
              title="Marcar como leída"
              aria-label="Marcar notificacion como leida"
              aria-busy={markReadLoading}
              disabled={markReadLoading}
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500/50 hover:text-primary-400 transition-all text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {markReadLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
          )}
          {onDelete && (
            <button 
              type="button"
              onClick={onDelete} 
              title="Eliminar"
              aria-label="Eliminar notificacion"
              aria-busy={deleteLoading}
              disabled={deleteLoading}
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 