import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Achievement, UserAchievement } from "@/types";

const ACHIEVEMENTS_TYPES_PATH = path.join(process.cwd(), "data", "achievements.json");

export async function GET() {
  try {
    // Leer los tipos de logros disponibles (no las asignaciones de usuarios)
    // Primero voy a verificar qué estructura tiene el archivo de achievements
    const data = await fs.readFile(ACHIEVEMENTS_TYPES_PATH, "utf-8");
    const allData: (Achievement | UserAchievement)[] = JSON.parse(data);
    
    // Filtrar solo los tipos de logros (Achievement tiene id, name, description; UserAchievement tiene userId, achievementId)
    const achievementTypes = allData.filter((item): item is Achievement => 
      'name' in item && 'description' in item && !('userId' in item)
    );
    
    return NextResponse.json(achievementTypes);
  } catch (error) {
    console.error("Error reading achievements:", error);
    return NextResponse.json({ error: "Error al leer logros" }, { status: 500 });
  }
}
