import patterns from "../../data/moderationPatterns.json";

export type ModerationResult = {
  violation: boolean;
  type?: string;
  fragment?: string;
  message?: string;
};

// Punto de integración para IA externa (ejemplo OpenAI, Perspective, etc.)
export async function checkWithExternalAI(text: string): Promise<ModerationResult> {
  // Aquí puedes conectar con una API real
  // Por ahora, siempre devuelve no violation
  return { violation: false };
}

export function checkModeration(message: string): { isBlocked: boolean; reason?: string } {
  const lower = message.toLowerCase();
  // Palabras prohibidas
  for (const word of patterns["patterns.prohibitedWords"]) {
    if (lower.includes(word)) {
      return { isBlocked: true, reason: `palabra prohibida: ${word}` };
    }
  }
  // Frases sexuales
  for (const phrase of patterns["patterns.sexualPhrases"]) {
    if (lower.includes(phrase)) {
      return { isBlocked: true, reason: `connotación sexual: ${phrase}` };
    }
  }
  // Vejaciones
  for (const phrase of patterns["patterns.vejaciones"]) {
    if (lower.includes(phrase)) {
      return { isBlocked: true, reason: `vejación: ${phrase}` };
    }
  }
  // Apariencia física (regex)
  for (const regex of patterns["patterns.appearancePatterns"]) {
    const re = new RegExp(regex, "i");
    if (re.test(message)) {
      return { isBlocked: true, reason: `comentario sobre apariencia física: ${message.match(re)?.[0]}` };
    }
  }
  return { isBlocked: false };
} 