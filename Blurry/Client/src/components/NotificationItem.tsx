
type Notification = {
  id: number;
  text: string;
  type?: "sistema" | "recompensa" | "actividad" | "alerta";
  read?: boolean;
  timestamp: string;
};

type Props = {
  notification: Notification;
  onMarkRead?: () => void;
  onDelete?: () => void;
};

export default function NotificationItem({ notification, onMarkRead, onDelete }: Props) {
  let color = "bg-primary-100 text-primary-700";
  if (notification.type === "recompensa") color = "bg-secondary-100 text-secondary-700";
  if (notification.type === "alerta") color = "bg-accent-100 text-accent-700";
  if (notification.type === "actividad") color = "bg-accent-100 text-accent-700";

  return (
    <div className={`rounded p-3 mb-2 shadow flex flex-col gap-1 ${color} ${notification.read ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-center">
        <span>{notification.text}</span>
        <span className="text-xs text-gray-400 ml-2">
          {notification.timestamp ? new Date(notification.timestamp).toLocaleString() : 'Fecha inválida'}
        </span>
      </div>
      <div className="flex gap-2 text-xs items-center">
        {notification.read ? <span className="text-gray-500">Leída</span> : <span className="text-primary-500">No leída</span>}
        {onMarkRead && !notification.read && (
          <button className="underline text-primary-700" onClick={onMarkRead}>Marcar como leída</button>
        )}
        {onDelete && (
          <button className="underline text-accent-700" onClick={onDelete}>Eliminar</button>
        )}
      </div>
    </div>
  );
} 