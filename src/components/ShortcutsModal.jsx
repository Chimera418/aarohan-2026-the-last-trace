import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { playKeyClick } from '../utils/soundEffects';

const shortcuts = [
  { key: '?', description: 'Open / close this keyboard shortcuts panel' },
  { key: 'Alt + 1', description: 'Navigate to Briefing (landing page)' },
  { key: 'Alt + 2', description: 'Navigate to Round 1 — Code Breaker' },
  { key: 'Alt + 3', description: 'Navigate to Round 2 — Investigation Room' },
  { key: 'Alt + K', description: 'Open Archive Codeword Entry (unlock Round 2)' },
  { key: 'Alt + M', description: 'Toggle sound on / off' },
  { key: 'Escape', description: 'Close any open modal or overlay' },
  { key: 'Tab', description: 'Focus next interactive element' },
  { key: 'Enter', description: 'Submit current form or confirm selection' },
];

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { playKeyClick(); onClose(); }} />

      <div className="relative w-full max-w-sm border border-[#252f42] bg-[#0b0e14] rounded shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2232]">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-200">
            <Keyboard size={16} className="text-cyan-400" />
            <span>KEYBOARD SHORTCUTS</span>
          </div>
          <button
            onClick={() => { playKeyClick(); onClose(); }}
            className="p-1.5 rounded text-[#64748b] hover:text-slate-200 hover:bg-[#131721] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-1.5">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 text-xs font-mono border-b border-[#111820] last:border-0">
              <span className="text-slate-300">{s.description}</span>
              <kbd className="px-2 py-0.5 rounded bg-[#1a2133] border border-[#2a3448] text-amber-300 text-[11px] ml-4 whitespace-nowrap">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

