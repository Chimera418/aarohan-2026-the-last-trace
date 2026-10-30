import React, { useState, useRef, useEffect } from 'react';
import { KeyRound, Unlock, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { EVENT_INFO, ROUND1_TASKS } from '../data/caseData';
import { playKeyClick, playSuccessChime, playErrorBuzz, playAccessGranted } from '../utils/soundEffects';

// ─── Codeword Entry Modal ─────────────────────────────────────────────────────

export default function KeyEntryModal({ isOpen, onUnlock, keyCharacters, solvedCount }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    if (!isOpen) {
      setInput('');
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  // Auto-fill reconstructed key from solved tasks
  const handleAutoFill = () => {
    playKeyClick();
    const key = ROUND1_TASKS.map(t => keyCharacters[t.id] ?? '·').join('');
    setInput(key.replace(/·/g, ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entered = input.trim().toUpperCase();
    const target = EVENT_INFO.codeword.toUpperCase();

    if (entered === target) {
      setSuccess(true);
      setError('');
      playAccessGranted();
      setTimeout(() => {
        onUnlock();
      }, 1400);
    } else {
      setError(`Incorrect codeword. Verify all 15 characters match the characters recovered in Round 1.`);
      playErrorBuzz();
    }
  };

  if (!isOpen) return null;

  const masterKey = EVENT_INFO.codeword;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Panel */}
      <div className={`relative w-full max-w-lg border rounded shadow-2xl overflow-hidden transition-all duration-300 ${
        success
          ? 'border-emerald-500/50 bg-[#07120a]'
          : 'border-amber-500/30 bg-[#0d1017]'
      }`}>
        {/* Scan line decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.5) 2px)',
            backgroundSize: '100% 3px',
          }}
        />

        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center gap-3 ${success ? 'border-emerald-500/20' : 'border-amber-500/15'}`}>
          <div className={`w-10 h-10 rounded border flex items-center justify-center ${
            success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            {success ? <Unlock size={20} /> : <Lock size={20} />}
          </div>
          <div>
            <div className={`font-mono font-bold text-sm ${success ? 'text-emerald-300' : 'text-amber-300'}`}>
              {success ? 'ARCHIVE BREACH — ACCESS GRANTED' : 'ARCHIVE UNLOCK VERIFICATION'}
            </div>
            <div className="font-mono text-[11px] text-[#64748b]">
              {success
                ? 'Entering Investigation Room 4B...'
                : `Enter the 15-character master key recovered from Round 1.`
              }
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Key progress display */}
          <div>
            <div className="text-[10px] font-mono text-[#64748b] mb-2 tracking-wider">RECOVERED KEY CHARACTERS ({solvedCount}/15)</div>
            <div className="flex gap-1 flex-wrap">
              {masterKey.split('').map((char, idx) => {
                const taskId = idx + 1;
                const recovered = keyCharacters[taskId];
                return (
                  <div
                    key={idx}
                    className={`w-9 h-11 flex flex-col items-center justify-between border rounded font-mono transition-all
                      ${recovered
                        ? 'bg-amber-500/10 border-amber-500/40'
                        : 'bg-[#090b0f] border-[#1a2130]'
                      }`}
                  >
                    <span className="text-[8px] pt-0.5 text-[#475569]">{String(taskId).padStart(2, '0')}</span>
                    <span className={`text-base font-bold pb-1 ${recovered ? 'text-amber-300 glow-amber' : 'text-[#1e2638]'}`}>
                      {recovered ?? '·'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#64748b] tracking-wider block">
                  ENTER 15-CHARACTER MASTER KEY
                </label>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => {
                      setInput(e.target.value.toUpperCase().slice(0, 15));
                      setError('');
                    }}
                    onKeyDown={e => { if (e.key !== 'Enter') playKeyClick(); }}
                    placeholder="E.g. THELASTTRACEKEY"
                    maxLength={15}
                    className={`flex-1 bg-[#060810] border rounded px-3 py-2.5 text-sm font-mono tracking-[0.2em] text-amber-300 placeholder-[#2a3448] focus:outline-none transition-colors ${
                      error ? 'border-rose-500/50' : 'border-[#252f42] focus:border-amber-400/40'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    disabled={solvedCount === 0}
                    className="px-3 py-2.5 bg-[#131921] border border-[#252f42] hover:border-[#334158] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono text-[#94a3b8] hover:text-slate-200 rounded cursor-pointer transition-colors whitespace-nowrap"
                    title="Auto-fill from solved tasks"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b]">
                  <span>{input.length} / 15 characters</span>
                  {input.length === 15 && <span className="text-amber-400">Ready to verify</span>}
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-rose-500/5 border border-rose-500/20 rounded text-rose-300 text-xs font-mono">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={input.length < 15}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-[#1a2030] disabled:text-[#3a4558] disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <KeyRound size={15} />
                <span>VERIFY ARCHIVE CODEWORD</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}

          {success && (
            <div className="py-6 text-center space-y-3">
              <div className="text-4xl font-mono font-black tracking-widest text-emerald-400 glow-emerald">
                ACCESS GRANTED
              </div>
              <div className="text-sm font-mono text-emerald-200/70">
                Entering Case Investigation Room 4B...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

