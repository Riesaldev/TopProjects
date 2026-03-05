import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Notification } from "@/types";

const NOTIFICATIONS_PATH = path.join(process.cwd(), "data", "notifications.json");

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const userId = url.searchParams.get("userId");
    const data = await fs.readFile(NOTIFICATIONS_PATH, "utf-8");
    let notifications: Notification[] = JSON.parse(data);
    
    if (userId) {
      notifications = notifications.filter((n: Notification) => String(n.userId) === String(userId));
    }
    
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error en GET /api/notifications:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const newNotification = await req.json();
    const data = await fs.readFile(NOTIFICATIONS_PATH, "utf-8");
    const notifications: Notification[] = JSON.parse(data);
    
    newNotification.id = notifications.length ? Math.max(...notifications.map((n: Notification) => n.id)) + 1 : 1;
    newNotification.date = newNotification.date || new Date().toISOString();
    newNotification.read = false;
    
    notifications.push(newNotification);
    await fs.writeFile(NOTIFICATIONS_PATH, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json(newNotification);
  } catch (error) {
    console.error("Error en POST /api/notifications:", error);
    return NextResponse.json(
      { message: "Error al crear notificación" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    const data = await fs.readFile(NOTIFICATIONS_PATH, "utf-8");
    let notifications: Notification[] = JSON.parse(data);
    
    const notificationIndex = notifications.findIndex((n: Notification) => n.id === id);
    if (notificationIndex === -1) {
      return NextResponse.json(
        { message: "Notificación no encontrada" },
        { status: 404 }
      );
    }
    
    notifications[notificationIndex] = { ...notifications[notificationIndex], ...updates };
    await fs.writeFile(NOTIFICATIONS_PATH, JSON.stringify(notifications, null, 2));
    
    return NextResponse.json(notifications[notificationIndex]);
  } catch (error) {
    console.error("Error en PATCH /api/notifications:", error);
    return NextResponse.json(
      { message: "Error al actualizar notificación" },
      { status: 500 }
    );
  }
}
