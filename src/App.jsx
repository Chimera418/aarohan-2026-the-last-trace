import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import LandingView from './components/LandingView';
import Round1View from './components/Round1View';
import Round2View from './components/Round2View';
import AdminView from './components/AdminView';
import KeyEntryModal from './components/KeyEntryModal';
import TeamModal from './components/TeamModal';
import ShortcutsModal from './components/ShortcutsModal';
import { playKeyClick } from './utils/soundEffects';

// ─── Constants ─────────────────────────────────────────────────────────────────

const ROUND1_TOTAL_SECS = 45 * 60;
const ROUND2_TOTAL_SECS = 45 * 60;
const SCORE_PER_TASK = Math.floor(100 / 15); // ≈6 pts per task

function generateSessionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('landing');

  // Team info
  const [team, setTeam] = useState({
    name: 'Team Delta-7',
    members: ['Investigator A', 'Investigator B'],
    code: generateSessionCode(),
  });

  // Round 1 state
  const [solvedTasks, setSolvedTasks] = useState(new Set());
  const [keyCharacters, setKeyCharacters] = useState({}); // taskId -> char
  const [hintUsed, setHintUsed] = useState({}); // taskId -> true (if any hint used)
  const [hintsUsedCount, setHintsUsedCount] = useState(0);

  // Round 2 unlock
  const [isRound2Unlocked, setIsRound2Unlocked] = useState(false);
  const [revealMode, setRevealMode] = useState(false);

  // Modals
  const [showKeyEntryModal, setShowKeyEntryModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Timers
  const [round1Timer, setRound1Timer] = useState(ROUND1_TOTAL_SECS);
  const [round2Timer, setRound2Timer] = useState(ROUND2_TOTAL_SECS);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Score calculation
  const score = Math.max(0, solvedTasks.size * SCORE_PER_TASK - hintsUsedCount * 5);

  // Timer tick
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        if (activeTab === 'round1') {
          setRound1Timer(prev => Math.max(0, prev - 1));
        } else if (activeTab === 'round2' && isRound2Unlocked) {
          setRound2Timer(prev => Math.max(0, prev - 1));
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, activeTab, isRound2Unlocked]);

  // Start Round 1 timer when entering round1 tab for first time
  useEffect(() => {
    if (activeTab === 'round1' && !timerRunning && round1Timer === ROUND1_TOTAL_SECS) {
      setTimerRunning(true);
    }
    if (activeTab === 'round2' && isRound2Unlocked && !timerRunning) {
      setTimerRunning(true);
    }
  }, [activeTab, isRound2Unlocked]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    // Only fire if no input/textarea is focused
    const active = document.activeElement;
    const isTyping = active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA';

    if (e.key === 'Escape') {
      if (showKeyEntryModal) setShowKeyEntryModal(false);
      if (showTeamModal) setShowTeamModal(false);
      if (showShortcutsModal) setShowShortcutsModal(false);
      return;
    }

    if (e.key === '?' && !isTyping) {
      e.preventDefault();
      playKeyClick();
      setShowShortcutsModal(prev => !prev);
      return;
    }

    if (e.altKey) {
      if (e.key === '1') { e.preventDefault(); playKeyClick(); setActiveTab('landing'); }
      if (e.key === '2') { e.preventDefault(); playKeyClick(); setActiveTab('round1'); }
      if (e.key === '3') { e.preventDefault(); playKeyClick(); setActiveTab('round2'); }
      if (e.key === 'k' || e.key === 'K') { e.preventDefault(); playKeyClick(); setShowKeyEntryModal(true); }
      if (e.key === 'm' || e.key === 'M') { e.preventDefault(); }
    }
  }, [showKeyEntryModal, showTeamModal, showShortcutsModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleSolveTask = useCallback((taskId, character) => {
    setSolvedTasks(prev => {
      const next = new Set(prev);
      next.add(taskId);
      return next;
    });
    setKeyCharacters(prev => ({ ...prev, [taskId]: character }));
  }, []);

  const handleHint = useCallback((taskId) => {
    setHintUsed(prev => {
      if (prev[taskId]) return prev; // Already charged once per task
      setHintsUsedCount(c => c + 1);
      return { ...prev, [taskId]: true };
    });
  }, []);

  const handleUnlockRound2 = useCallback(() => {
    setIsRound2Unlocked(true);
    setShowKeyEntryModal(false);
    setActiveTab('round2');
    setTimerRunning(true);
  }, []);

  const handleStartRound1 = () => {
    playKeyClick();
    setActiveTab('round1');
    if (!timerRunning && round1Timer === ROUND1_TOTAL_SECS) {
      setTimerRunning(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 forensic-grid">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        team={team}
        score={score}
        hintsUsedCount={hintsUsedCount}
        round1SolvedCount={solvedTasks.size}
        isRound2Unlocked={isRound2Unlocked}
        round1Timer={round1Timer}
        round2Timer={round2Timer}
        timerRunning={timerRunning}
        setTimerRunning={setTimerRunning}
        onOpenShortcuts={() => setShowShortcutsModal(true)}
        onOpenTeamModal={() => setShowTeamModal(true)}
      />

      {/* Main Content */}
      <main>
        {activeTab === 'landing' && (
          <LandingView
            team={team}
            setTeam={setTeam}
            onStartRound1={handleStartRound1}
            onOpenTeamModal={() => setShowTeamModal(true)}
          />
        )}

        {activeTab === 'round1' && (
          <>
            {/* Codeword unlock strip — shown when all 15 tasks are solved */}
            {solvedTasks.size === 15 && !isRound2Unlocked && (
              <div className="max-w-7xl mx-auto px-4 pt-6">
                <div className="border border-emerald-500/40 bg-emerald-500/5 rounded p-4 flex items-center justify-between flex-wrap gap-3 animate-pulse-border">
                  <div className="font-mono text-sm text-emerald-300 font-bold">
                    ✓ All 15 tasks completed. Master key recovered: THELASTTRACEKEY
                  </div>
                  <button
                    onClick={() => setShowKeyEntryModal(true)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded font-mono cursor-pointer transition-colors flex items-center gap-2"
                  >
                    Enter Archive Codeword →
                  </button>
                </div>
              </div>
            )}

            {/* Partial unlock button — always accessible once at least 1 task solved */}
            {solvedTasks.size > 0 && solvedTasks.size < 15 && !isRound2Unlocked && (
              <div className="max-w-7xl mx-auto px-4 pt-4">
                <div className="border border-[#1e2637] bg-[#0b0d13] rounded p-3 flex items-center justify-between gap-3 text-xs font-mono text-[#64748b]">
                  <span>{solvedTasks.size}/15 tasks solved. Try entering the codeword when all 15 are complete, or attempt early:</span>
                  <button
                    onClick={() => { playKeyClick(); setShowKeyEntryModal(true); }}
                    className="px-3 py-1.5 border border-[#252f42] hover:border-amber-500/30 rounded text-[#94a3b8] hover:text-amber-300 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Enter Key (Alt+K)
                  </button>
                </div>
              </div>
            )}

            <Round1View
              solvedTasks={solvedTasks}
              onSolveTask={handleSolveTask}
              onHint={handleHint}
              hintUsed={hintUsed}
              keyCharacters={keyCharacters}
            />
          </>
        )}

        {activeTab === 'round2' && (
          <Round2View
            isUnlocked={isRound2Unlocked}
            revealMode={revealMode}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            solvedTasks={solvedTasks}
            score={score}
            hintsUsedCount={hintsUsedCount}
            round1Timer={round1Timer}
            round2Timer={round2Timer}
          />
        )}
      </main>

      {/* Footer micro-bar */}
      <footer className="border-t border-[#181f2d] mt-16 py-3 px-4 text-center text-[10px] font-mono text-[#2d3a4f]">
        THE LAST TRACE · AAROHAN 2026 · FACE CLUB · All case data is entirely fictional and self-contained.
        &nbsp;|&nbsp; Keyboard: Press <kbd className="px-1 rounded bg-[#111720] text-[#475569]">?</kbd> for shortcuts
      </footer>

      {/* Modals */}
      <KeyEntryModal
        isOpen={showKeyEntryModal}
        onUnlock={handleUnlockRound2}
        keyCharacters={keyCharacters}
        solvedCount={solvedTasks.size}
      />

      <TeamModal
        isOpen={showTeamModal}
        onClose={() => setShowTeamModal(false)}
        team={team}
        setTeam={setTeam}
      />

      <ShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
    </div>
  );
}
