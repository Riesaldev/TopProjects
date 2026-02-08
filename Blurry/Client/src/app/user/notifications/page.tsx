"use client";

import NotificationItem from "@/components/NotificationItem";
import { Notification } from "@/types";
import { useRealtime } from '@/context/RealtimeContext';
import { useEffect, useState } from 'react';

function groupByType(notifications: Notification[]): Record<string, Notification[]> {
  return notifications.reduce((acc, n) => {
    const type = n.type || "sin_categoria";
    acc[type] = acc[type] || [];
    acc[type].push(n);
    return acc;
  }, {} as Record<string, Notification[]>);
}

export default function NotificationsPage({ userId, contactId }: Readonly<{ userId: string; contactId: string }>) {
  const realtimeContext = useRealtime();
  const notifications = realtimeContext?.notifications || [];
  const [localNotifications, setLocalNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleMarkRead = async (id: number) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true })
    });
    setLocalNotifications((n: Notification[]) => n.map((notif: Notification) => notif.id === id ? { ...notif, read: true } : notif));
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/notifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setLocalNotifications((n: Notification[]) => n.filter((notif: Notification) => notif.id !== id));
  };

  const grouped = groupByType(localNotifications);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-accent-400">
      <h1 className="text-2xl font-bold mb-4 text-primary-700">Notificaciones</h1>
      <div className="w-full max-w-md">
        {Object.keys(grouped).length === 0 && <div className="text-accent-600">No tienes notificaciones.</div>}
        {Object.entries(grouped).map(([type, notifs]: [string, Notification[]]) => (
          <div key={type} className="mb-6">
            <h2 className="font-semibold mb-2 capitalize text-primary-600">{type}</h2>
            {notifs.map((n: Notification) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkRead={() => handleMarkRead(n.id)}
                onDelete={() => handleDelete(n.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
} 