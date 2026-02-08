import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Streak } from "@/types";

const STREAKS_PATH = path.join(process.cwd(), "data", "streaks.json");

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const userId = url.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "userId es requerido" }, { status: 400 });
    }
    
    const data = await fs.readFile(STREAKS_PATH, "utf-8");
    const streaks: Streak[] = JSON.parse(data);
    
    // Buscar el streak del usuario
    const userStreak = streaks.find((s: Streak) => String(s.userId) === String(userId));
    
    if (!userStreak) {
      // Si no existe, crear uno nuevo
      const newStreak = {
        userId: parseInt(userId),
        currentStreak: 0,
        maxStreak: 0,
        lastActivity: null
      };
      return NextResponse.json(newStreak);
    }
    
    return NextResponse.json(userStreak);
  } catch (error) {
    console.error("Error reading streaks:", error);
    // Si el archivo no existe, devolver valores por defecto
    return NextResponse.json({
      userId: parseInt(req.url!.split("userId=")[1]),
      currentStreak: 0,
      maxStreak: 0,
      lastActivity: null
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: "userId es requerido" }, { status: 400 });
    }
    
    let streaks: Streak[] = [];
    
    try {
      const data = await fs.readFile(STREAKS_PATH, "utf-8");
      streaks = JSON.parse(data);
    } catch {
      // Si el archivo no existe, crear array vacío
      streaks = [];
    }
    
    const today = new Date().toISOString().split('T')[0];
    const userStreakIndex = streaks.findIndex((s: Streak) => String(s.userId) === String(userId));
    
    if (userStreakIndex >= 0) {
      const userStreak = streaks[userStreakIndex];
      const lastActivity = userStreak.lastActivity;
      
      if (lastActivity === today) {
        // Ya registró actividad hoy
        return NextResponse.json(userStreak);
      }
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastActivity === yesterdayStr) {
        // Continúa el streak
        userStreak.currentStreak += 1;
        userStreak.maxStreak = Math.max(userStreak.maxStreak, userStreak.currentStreak);
      } else {
        // Rompe el streak
        userStreak.currentStreak = 1;
      }
      
      userStreak.lastActivity = today;
      streaks[userStreakIndex] = userStreak;
    } else {
      // Crear nuevo streak
      const newStreak = {
        userId: parseInt(userId),
        currentStreak: 1,
        maxStreak: 1,
        lastActivity: today
      };
      streaks.push(newStreak);
    }
    
    await fs.writeFile(STREAKS_PATH, JSON.stringify(streaks, null, 2));
    
    const updatedStreak = streaks.find((s: Streak) => String(s.userId) === String(userId));
    return NextResponse.json(updatedStreak);
  } catch (error) {
    console.error("Error updating streak:", error);
    return NextResponse.json({ error: "Error al actualizar streak" }, { status: 500 });
  }
}
