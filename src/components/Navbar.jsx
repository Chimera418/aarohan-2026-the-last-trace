import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Search, 
  KeyRound, 
  Clock, 
  Users, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Award, 
  Lock, 
  Unlock,
  SlidersHorizontal,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { isSoundEnabled, toggleSound, playKeyClick } from '../utils/soundEffects';

export default function Navbar({
  activeTab,
  setActiveTab,
  team,
  score,
  hintsUsedCount,
  round1SolvedCount,
  isRound2Unlocked,
  round1Timer,
  round2Timer,
  timerRunning,
  setTimerRunning,
  onOpenShortcuts,
  onOpenTeamModal,
}) {
  const [muted, setMuted] = useState(!isSoundEnabled());

  const handleSoundToggle = () => {
    const next = toggleSound();
    setMuted(!next);
    if (next) playKeyClick();
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentTimerValue = activeTab === 'round2' ? round2Timer : round1Timer;

  return (
    <header className="sticky top-0 z-40 bg-[#0e1219]/95 border-b border-[#212836] backdrop-blur-md">
      {/* Top micro-bar: Institute identification & status */}
      <div className="bg-[#07090d] border-b border-[#181e2b] px-4 py-1 text-xs font-mono flex items-center justify-between text-[#94a3b8]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            ASTERION INCIDENT PORTAL
          </span>
          <span className="text-[#3b475e]">|</span>
          <span className="hidden sm:inline text-[#94a3b8]">CASE REF: AST-2026-0950</span>
          <span className="text-[#3b475e]">|</span>
          <span className="text-cyan-400">AAROHAN 2026 · FACE CLUB</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#64748b]">PHASE:</span>
            <span className="font-medium text-slate-200">
              {activeTab === 'landing' && 'BRIEFING'}
              {activeTab === 'round1' && 'ROUND 1 (CODE BREAKER)'}
              {activeTab === 'round2' && 'ROUND 2 (INVESTIGATION)'}
              {activeTab === 'admin' && 'ORGANISER CONTROL'}
            </span>
          </div>

          <button
            onClick={onOpenShortcuts}
            className="flex items-center gap-1 text-[#94a3b8] hover:text-amber-400 transition-colors cursor-pointer"
            title="Keyboard Shortcuts (Press ?)"
          >
            <HelpCircle size={13} />
            <span className="hidden md:inline">Shortcuts (?)</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center text-amber-400">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-100 flex items-center gap-2">
              THE LAST TRACE
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e2638] text-amber-300 font-normal border border-[#2d374d]">
                INTERNAL EDITION
              </span>
            </div>
            <div className="text-xs text-[#94a3b8] font-mono">
              Dr. Adrian John Homicide Case Archive
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-[#0a0c10] border border-[#212836] rounded p-1 gap-1" role="tablist">
          <button
            onClick={() => { playKeyClick(); setActiveTab('landing'); }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#1e2638] text-amber-400 border border-amber-500/30'
                : 'text-[#94a3b8] hover:text-slate-200 hover:bg-[#131720]'
            }`}
          >
            <Terminal size={14} />
            <span>00. Briefing</span>
          </button>

          <button
            onClick={() => { playKeyClick(); setActiveTab('round1'); }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'round1'
                ? 'bg-[#1e2638] text-amber-400 border border-amber-500/30'
                : 'text-[#94a3b8] hover:text-slate-200 hover:bg-[#131720]'
            }`}
          >
            <KeyRound size={14} />
            <span>01. Code Breaker</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-[#161b26] text-cyan-300 border border-[#2d374d]">
              {round1SolvedCount}/15
            </span>
          </button>

          <button
            onClick={() => { 
              playKeyClick(); 
              setActiveTab('round2'); 
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'round2'
                ? 'bg-[#1e2638] text-amber-400 border border-amber-500/30'
                : 'text-[#94a3b8] hover:text-slate-200 hover:bg-[#131720]'
            }`}
          >
            <Search size={14} />
            <span>02. Case Room</span>
            {isRound2Unlocked ? (
              <span className="text-[10px] text-emerald-400 flex items-center">
                <Unlock size={11} />
              </span>
            ) : (
              <span className="text-[10px] text-slate-500 flex items-center" title="Locked until master codeword verified">
                <Lock size={11} />
              </span>
            )}
          </button>

          <button
            onClick={() => { playKeyClick(); setActiveTab('admin'); }}
            className={`px-2.5 py-1.5 rounded text-xs font-mono font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-[#1e2638] text-rose-400 border border-rose-500/30'
                : 'text-[#64748b] hover:text-rose-300 hover:bg-[#131720]'
            }`}
            title="Organiser Control & Solution Walkthrough"
          >
            <SlidersHorizontal size={13} />
            <span className="hidden lg:inline">Admin & Reveal</span>
          </button>
        </nav>

        {/* Right Status Panel: Timer & Team & Sound */}
        <div className="flex items-center gap-3">
          {/* Round Timer */}
          <div className="flex items-center gap-2 bg-[#090b0f] border border-[#212836] px-2.5 py-1.5 rounded font-mono">
            <Clock size={14} className={currentTimerValue < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'} />
            <span className={`text-sm font-semibold tracking-wider ${
              currentTimerValue < 300 ? 'text-rose-400' : 'text-slate-200'
            }`}>
              {formatTimer(currentTimerValue)}
            </span>
            <button
              onClick={() => {
                playKeyClick();
                setTimerRunning(!timerRunning);
              }}
              className="text-[10px] uppercase px-1 py-0.5 rounded bg-[#161c27] text-[#94a3b8] hover:text-slate-100 hover:bg-[#202737] cursor-pointer"
              title={timerRunning ? "Pause timer" : "Resume timer"}
            >
              {timerRunning ? "PAUSE" : "RESUME"}
            </button>
          </div>

          {/* Team Session Button */}
          <button
            onClick={onOpenTeamModal}
            className="flex items-center gap-2 bg-[#0d1117] border border-[#212836] hover:border-amber-500/40 px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer group"
          >
            <Users size={14} className="text-cyan-400" />
            <div className="text-left font-mono">
              <div className="font-semibold text-slate-200 flex items-center gap-1">
                {team.name}
              </div>
              <div className="text-[10px] text-[#64748b] flex items-center gap-2">
                <span className="text-amber-300 font-medium">PTS: {score}</span>
                {hintsUsedCount > 0 && (
                  <span className="text-rose-400">(-{hintsUsedCount * 5})</span>
                )}
              </div>
            </div>
            <ChevronRight size={13} className="text-[#475569] group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Audio toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded bg-[#0d1117] border border-[#212836] text-[#94a3b8] hover:text-slate-200 hover:border-[#334155] cursor-pointer transition-colors"
            title={muted ? "Enable audio feedback" : "Mute audio feedback"}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
}

