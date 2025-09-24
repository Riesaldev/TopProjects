import { DiceResult } from '../types';

export function parseDiceFormula(formula: string): DiceResult | null {
  try {
    // Remove spaces and convert to lowercase
    const cleanFormula = formula.replace(/\s/g, '').toLowerCase();
    
    // Match dice notation like 1d20, 3d6, etc.
    const dicePattern = /(\d*)d(\d+)/g;
    const rolls: Array<{ die: string; results: number[] }> = [];
    let processedFormula = cleanFormula;
    
    let match;
    while ((match = dicePattern.exec(cleanFormula)) !== null) {
      const count = parseInt(match[1]) || 1;
      const sides = parseInt(match[2]);
      const results: number[] = [];
      
      for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
      }
      
      rolls.push({
        die: `${count}d${sides}`,
        results
      });
      
      // Replace dice notation with sum for calculation
      const sum = results.reduce((a, b) => a + b, 0);
      processedFormula = processedFormula.replace(match[0], sum.toString());
    }
    
    // Evaluate the mathematical expression
    const total = evaluateMathExpression(processedFormula);
    
    return {
      formula: cleanFormula,
      rolls,
      total
    };
  } catch (error) {
    return null;
  }
}

function evaluateMathExpression(expression: string): number {
  // Simple math expression evaluator (safe for basic operations)
  const validExpression = /^[0-9+\-*/().]+$/;
  if (!validExpression.test(expression)) {
    throw new Error('Invalid expression');
  }
  
  try {
    return Function(`"use strict"; return (${expression})`)();
  } catch {
    throw new Error('Invalid math expression');
  }
}

export function generateDiceId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}