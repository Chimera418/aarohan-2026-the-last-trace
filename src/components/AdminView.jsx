import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Users,
  FileText,
  BookOpen,
  KeyRound,
  Star,
  Shield,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import {
  INTENDED_SOLUTION,
  SUSPECTS,
  EVIDENCE_FILES,
  ROUND1_TASKS,
  MOTIVE_CODEBOOK,
} from '../data/caseData';
import { playKeyClick, playSuccessChime } from '../utils/soundEffects';

// ─── Organiser Gate ───────────────────────────────────────────────────────────

const ORGANISER_PIN = 'FACE2026';

export default function AdminView({ solvedTasks, score, hintsUsedCount, round1Timer, round2Timer }) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [expandedSection, setExpandedSection] = useState('stats');

  const handlePinSubmit = (e) => {
    e.preventDefault();
    playKeyClick();
    if (pin.toUpperCase() === ORGANISER_PIN) {
      setUnlocked(true);
      setPinError(false);
      playSuccessChime();
    } else {
      setPinError(true);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!unlocked) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-5">
        <Shield size={40} className="text-rose-400/60" />
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-300 font-mono">ORGANISER ACCESS ONLY</h2>
          <p className="text-xs text-[#64748b] font-mono mt-1">Enter the organiser PIN to access solution reveal and statistics.</p>
        </div>

        <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-3">
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Organiser PIN..."
            className={`w-full bg-[#090c12] border rounded px-3 py-2.5 text-sm font-mono text-slate-100 placeholder-[#3a4558] focus:outline-none transition-colors text-center tracking-widest ${
              pinError ? 'border-rose-500/50' : 'border-[#252f42] focus:border-amber-400/50'
            }`}
          />
          {pinError && (
            <div className="text-rose-400 text-xs font-mono flex items-center gap-1.5 justify-center">
              <AlertCircle size={13} /> Incorrect PIN.
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded cursor-pointer transition-colors"
          >
            Authenticate
          </button>
          <p className="text-[10px] text-center font-mono text-[#475569]">Hint: The default PIN is FACE2026</p>
        </form>
      </div>
    );
  }

  const totalSolved = solvedTasks.size;
  const round1ElapsedSecs = 45 * 60 - round1Timer;
  const round2ElapsedSecs = 45 * 60 - round2Timer;

  const sectionToggle = (id) => {
    playKeyClick();
    setExpandedSection(prev => prev === id ? null : id);
  };

  const Section = ({ id, title, icon, children }) => (
    <div className="border border-[#1e2637] bg-[#0b0d13] rounded overflow-hidden">
      <button
        onClick={() => sectionToggle(id)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-[#0f1219]"
      >
        <div className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-200">
          {icon}
          <span>{title}</span>
        </div>
        {expandedSection === id ? <ChevronDown size={16} className="text-amber-400" /> : <ChevronRight size={16} className="text-[#64748b]" />}
      </button>
      {expandedSection === id && (
        <div className="border-t border-[#1a2232] p-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
      {/* Admin header */}
      <div className="border border-rose-500/20 bg-rose-500/5 rounded p-4 flex items-center gap-3">
        <SlidersHorizontal size={18} className="text-rose-400" />
        <div>
          <div className="font-mono font-bold text-rose-300 text-sm">ORGANISER CONTROL PANEL — AUTHENTICATED</div>
          <div className="text-xs font-mono text-rose-400/60">Full solution walkthrough, team statistics, and reveal controls.</div>
        </div>
      </div>

      {/* Session Stats */}
      <Section id="stats" title="Session Statistics" icon={<Users size={16} className="text-cyan-400" />}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          {[
            { label: 'ROUND 1 TASKS SOLVED', value: `${totalSolved} / 15`, color: 'text-amber-300' },
            { label: 'HINTS USED', value: hintsUsedCount, color: 'text-rose-400' },
            { label: 'CURRENT SCORE', value: score, color: 'text-emerald-400' },
            { label: 'ROUND 1 TIME', value: formatTime(round1ElapsedSecs), color: 'text-cyan-300' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#090c12] border border-[#1a2232] p-3 rounded">
              <div className="text-[#64748b] text-[10px] tracking-wider">{stat.label}</div>
              <div className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="text-[10px] font-mono text-[#64748b] tracking-wider">ROUND 1 TASK COMPLETION MAP</div>
          <div className="flex flex-wrap gap-1.5">
            {ROUND1_TASKS.map(task => (
              <div
                key={task.id}
                title={`Task ${task.id}: ${task.title}`}
                className={`w-8 h-8 rounded flex items-center justify-center font-mono text-[11px] font-bold border transition-colors ${
                  solvedTasks.has(task.id)
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                    : 'bg-[#111620] border-[#1e2637] text-[#3a4558]'
                }`}
              >
                {String(task.id).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution Walkthrough */}
      <Section id="solution" title="Solution Reveal & Walkthrough" icon={<Eye size={16} className="text-amber-400" />}>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { playKeyClick(); setShowSolution(!showSolution); }}
              className={`flex items-center gap-2 px-4 py-2 rounded border font-mono font-bold text-xs transition-colors cursor-pointer ${
                showSolution
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-[#0d1017] border-[#252f42] text-[#94a3b8] hover:border-amber-400/30 hover:text-amber-300'
              }`}
            >
              {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
              {showSolution ? 'Hide Solution Details' : 'Reveal Full Solution'}
            </button>
            {showSolution && (
              <span className="text-xs font-mono text-amber-400/70">Showing full solution — do not screen-share this panel during the event.</span>
            )}
          </div>

          {showSolution && (
            <div className="space-y-4">
              {/* The Indictment */}
              <div className="p-4 bg-rose-500/8 border border-rose-500/25 rounded space-y-3">
                <div className="font-mono font-bold text-rose-300 text-sm flex items-center gap-2">
                  <Star size={15} />
                  CORRECT VERDICT
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[#64748b] text-[10px] tracking-wider block mb-0.5">PRIMARY CULPRIT</span>
                    <span className="text-rose-300 font-bold">{INTENDED_SOLUTION.culpritName}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] text-[10px] tracking-wider block mb-0.5">MOTIVE PHRASE</span>
                    <span className="text-amber-300 font-bold">"{INTENDED_SOLUTION.motivePhrase}"</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#64748b] text-[10px] tracking-wider block mb-0.5">KEY EVIDENCE CHAIN</span>
                  <div className="flex flex-wrap gap-1.5">
                    {INTENDED_SOLUTION.keyEvidence.map(eid => (
                      <span key={eid} className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[11px] font-mono">{eid}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-[#0a0c11] border border-[#1c2232] rounded text-[11px] font-mono text-slate-300 leading-relaxed">
                  {INTENDED_SOLUTION.summary}
                </div>
              </div>

              {/* Round 1 Answer Key */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#64748b] tracking-wider">ROUND 1 — ANSWER KEY</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono border-collapse">
                    <thead>
                      <tr className="text-[#64748b] text-[10px] border-b border-[#1a2232] text-left">
                        <th className="py-2 px-2">TASK</th>
                        <th className="py-2 px-2">TITLE</th>
                        <th className="py-2 px-2">ACCEPTED ANSWER</th>
                        <th className="py-2 px-2">CHAR</th>
                        <th className="py-2 px-2">DOMAIN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#111820]">
                      {ROUND1_TASKS.map(task => (
                        <tr key={task.id} className={`hover:bg-[#0e1420] transition-colors ${solvedTasks.has(task.id) ? 'opacity-60' : ''}`}>
                          <td className="py-2 px-2 text-[#64748b]">{String(task.id).padStart(2, '0')}</td>
                          <td className="py-2 px-2 text-slate-200">{task.title}</td>
                          <td className="py-2 px-2 text-amber-300 font-bold">{task.acceptedAnswer}</td>
                          <td className="py-2 px-2">
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/25 text-amber-400 font-bold">{task.character}</span>
                          </td>
                          <td className="py-2 px-2 text-[#94a3b8]">{task.domain}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Motive Codebook Answer */}
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded text-xs font-mono">
                <div className="text-emerald-400 font-bold mb-1">MOTIVE CODEBOOK DECODE ANSWER</div>
                <div className="text-slate-300">
                  Encoded: <span className="text-amber-300">VAK TOR KORAN ZEL TOR MITH LUR</span>
                  {' → '}
                  Decoded: <span className="text-emerald-400 font-bold">"{INTENDED_SOLUTION.motivePhrase}"</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Suspect Summary Quick Table */}
      <Section id="suspects" title="Suspect Grid (Exoneration Summary)" icon={<Users size={16} className="text-cyan-400" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="text-[#64748b] text-[10px] border-b border-[#1a2232] text-left">
                <th className="py-2 px-2">BADGE</th>
                <th className="py-2 px-2">NAME</th>
                <th className="py-2 px-2">ROLE</th>
                <th className="py-2 px-2">CLEARANCE</th>
                <th className="py-2 px-2">STATUS</th>
                <th className="py-2 px-2">ALIBI DIGEST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111820]">
              {SUSPECTS.map(s => (
                <tr key={s.id} className={`transition-colors ${s.isCulprit ? 'hover:bg-rose-500/5' : 'hover:bg-[#0e1420]'}`}>
                  <td className="py-2 px-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#111620] border border-[#1e2637] text-[#94a3b8] text-[10px]">{s.badgeId}</span>
                  </td>
                  <td className="py-2 px-2 font-semibold text-slate-200">{s.name}</td>
                  <td className="py-2 px-2 text-[#94a3b8]">{s.role}</td>
                  <td className="py-2 px-2 text-[#64748b]">{s.clearance.split(' ')[0]} {s.clearance.split(' ')[1]}</td>
                  <td className="py-2 px-2">
                    {s.isCulprit ? (
                      <span className="text-rose-400 font-bold">✗ CULPRIT</span>
                    ) : (
                      <span className="text-emerald-400">✓ EXONERATED</span>
                    )}
                  </td>
                  <td className="py-2 px-2 text-[#64748b] max-w-[220px] truncate" title={s.statusNotes}>{s.statusNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Evidence Cross-Reference */}
      <Section id="evidence" title="Evidence File Summary" icon={<FileText size={16} className="text-violet-400" />}>
        <div className="space-y-1.5">
          {EVIDENCE_FILES.map(f => (
            <div key={f.id} className="flex items-center gap-3 p-2.5 bg-[#07090e] border border-[#131c29] rounded text-xs font-mono">
              <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#0f1623] border border-[#1e2d40] text-cyan-400 font-bold">{f.code}</span>
              <span className="text-slate-200 font-medium flex-1">{f.title}</span>
              <span className="text-[#64748b] hidden sm:block">{f.category}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

