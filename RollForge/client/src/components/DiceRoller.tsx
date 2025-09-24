import React, { useState } from 'react';
import { Dices, Send } from 'lucide-react';
import { parseDiceFormula } from '../utils/dice';
import { DiceResult } from '../types';
import { motion } from 'framer-motion';

interface DiceRollerProps {
  onRoll: (result: DiceResult) => void;
}

export function DiceRoller({ onRoll }: DiceRollerProps) {
  const [formula, setFormula] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<DiceResult | null>(null);

  const handleRoll = () => {
    if (!formula.trim()) return;

    setIsRolling(true);
    setTimeout(() => {
      const parsed = parseDiceFormula(formula);
      if (parsed) {
        onRoll(parsed);
        setResult(parsed);
        setFormula('');
      }
      setIsRolling(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRoll();
    }
  };

  const quickDice = ['1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '1d100'];

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center gap-2 mb-3">
        <Dices className="w-5 h-5 text-yellow-400" />
        <h3 className="text-white font-semibold">Dice Roller</h3>
      </div>

      {/* Quick dice buttons */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {quickDice.map(die => (
          <button
            key={die}
            onClick={() => setFormula(prev => prev + die)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm transition-colors"
          >
            {die}
          </button>
        ))}
      </div>

      {/* Formula input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., 1d20+3d6+5"
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
        />
        <motion.button
          onClick={handleRoll}
          disabled={!formula.trim() || isRolling}
          className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          whileTap={{ scale: 0.95 }}
          animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Use standard dice notation: 2d6+3, 1d20+5, etc.
        {result && (
          <div className="mt-3 p-2 bg-gray-700 rounded text-sm text-white space-y-1">
            <div className="font-semibold">Resultado: {result.total}</div>
            <div className="text-gray-300">Fórmula: {result.formula}</div>
            <div className="space-y-0.5">
              {(() => {
                // Persist history on window to avoid changing surrounding component code
                const w = window as any;
                w.__diceHistory = w.__diceHistory || [] as DiceResult[];

                // Add current result if it's new (avoid duplicate re-renders)
                const last = w.__diceHistory[w.__diceHistory.length - 1];
                if (!last || last !== result) {
                  w.__diceHistory.push(result);
                  if (w.__diceHistory.length > 100) w.__diceHistory.shift();
                }

                return null;
              })()}

              {/* Detalle de la tirada actual */}
              <div className="space-y-0.5 mb-3">
                {result.rolls.map((r, i) => (
                  <div key={i}>
                    {r.die}: [{r.results.join(', ')}] = {r.results.reduce((a, b) => a + b, 0)}
                  </div>
                ))}
              </div>

              {/* Histórico de tiradas */}
              <div className="pt-2 border-t border-gray-600">
                <div className="font-semibold mb-1">Histórico</div>
                <div className="max-h-40 overflow-auto pr-1 space-y-1 text-xs">
                  {[...(window as any).__diceHistory]
                    .slice()
                    .reverse()
                    .map((h: DiceResult, idx: number) => (
                      <div
                        key={idx}
                        className="bg-gray-600/40 rounded px-2 py-1 flex flex-col"
                      >
                        <div className="flex justify-between">
                          <span>{h.formula}</span>
                          <span className="text-yellow-300 font-semibold">{h.total}</span>
                        </div>
                        <div className="text-[10px] text-gray-300 truncate">
                          {h.rolls
                            .map(r => `${r.die}: [${r.results.join(',')}]`)
                            .join(' | ')}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceRoller;
