import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertCircle,
  KeyRound,
  Terminal,
  Binary,
  FlaskConical,
  Code2,
  Search,
  Calculator,
  Microscope,
  Lock,
  Unlock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ROUND1_TASKS, EVENT_INFO } from '../data/caseData';
import { playKeyClick, playSuccessChime, playErrorBuzz } from '../utils/soundEffects';

const TASK_DOMAIN_ICONS = {
  'Cipher / Coding': <Terminal size={14} className="text-cyan-400" />,
  'Binary / ASCII': <Binary size={14} className="text-violet-400" />,
  'Mathematics & Physics': <Calculator size={14} className="text-amber-400" />,
  'Pattern Recognition': <Search size={14} className="text-cyan-300" />,
  'Programming Trace': <Code2 size={14} className="text-green-400" />,
  'Modular Arithmetic / Crypto': <Lock size={14} className="text-rose-400" />,
  'Steganography': <Microscope size={14} className="text-purple-400" />,
  'Fictional OSINT': <Search size={14} className="text-teal-400" />,
  'Chemistry / Data Analysis': <FlaskConical size={14} className="text-amber-300" />,
  'Logic / Forensic Log Cross-Check': <Search size={14} className="text-blue-400" />,
  'Programming / Algorithm Reasoning': <Code2 size={14} className="text-emerald-400" />,
  'Multi-Stage Cipher': <Lock size={14} className="text-rose-300" />,
  'Physics / Mathematical Clue': <Calculator size={14} className="text-orange-400" />,
  'Forensic Cross-Reference': <Microscope size={14} className="text-red-400" />,
  'Multi-Step Synthesis': <FlaskConical size={14} className="text-amber-500" />,
};

const DIFFICULTY_COLORS = {
  Easy: 'text-emerald-400',
  Medium: 'text-amber-400',
  'Medium-Hard': 'text-orange-400',
  Hard: 'text-rose-400',
  'Very Hard': 'text-red-400',
};

function TaskCard({ task, index, solved, solvedKey, onSolve, onHint, hintUsed, hintsUsedCount }) {
  const [expanded, setExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = answer.trim().toUpperCase().replace(/\s+/g, ' ');
    const accepted = task.acceptedAnswer.toString().toUpperCase().replace(/\s+/g, ' ');
    
    if (normalized === accepted) {
      playSuccessChime();
      onSolve(task.id, task.character);
      setError('');
    } else {
      playErrorBuzz();
      setError('Incorrect. Check your reasoning and try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleHintReveal = (hintNum) => {
    playKeyClick();
    if (hintNum === 1) {
      setShowHint1(true);
      if (!hintUsed[task.id]) {
        onHint(task.id);
      }
    }
    if (hintNum === 2) {
      setShowHint2(true);
    }
  };

  return (
    <div className={`border rounded transition-all duration-300 ${
      solved
        ? 'border-emerald-500/30 bg-[#0c1a15]'
        : expanded
        ? 'border-amber-500/25 bg-[#0d1017]'
        : 'border-[#1e2637] bg-[#0a0c11] hover:border-[#2a3448]'
    }`}>
      {/* Task Header */}
      <button
        onClick={() => {
          playKeyClick();
          setExpanded(!expanded);
          if (!expanded && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
          }
        }}
        className="w-full flex items-center gap-3 p-3.5 text-left cursor-pointer"
      >
        {/* Status Icon */}
        <div className="shrink-0">
          {solved ? (
            <CheckCircle2 size={20} className="text-emerald-400 glow-emerald" />
          ) : (
            <Circle size={20} className="text-[#3a4558]" />
          )}
        </div>

        {/* Task ID Box */}
        <div className={`shrink-0 w-10 h-10 flex items-center justify-center border rounded font-mono font-bold text-sm
          ${solved 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-[#131721] border-[#252f42] text-slate-400'
          }`}>
          {String(task.id).padStart(2, '0')}
        </div>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold text-sm ${solved ? 'text-emerald-300' : 'text-slate-200'}`}>
              {task.title}
            </h3>
            {solved && (
              <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-mono text-[11px] text-emerald-400 animate-letter-flip">
                <Unlock size={11} />
                <span>KEY CHAR: {task.character}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-[#94a3b8]">
              {TASK_DOMAIN_ICONS[task.domain] ?? <Circle size={12} />}
              <span>{task.domain}</span>
            </span>
            <span className={`font-medium ${DIFFICULTY_COLORS[task.difficulty] ?? 'text-slate-400'}`}>
              {task.difficulty}
            </span>
            <span className="text-[#64748b]">~{task.timeEstimate}</span>
          </div>
        </div>

        {/* Chevron */}
        <div className="shrink-0 text-[#3a4558]">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-[#191f2c] p-4 space-y-5">
          {/* Prompt */}
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#090b0f] p-4 rounded border border-[#1a212e]">
            {task.prompt}
          </div>

          {/* Artifact box (code / table / formula / hex) */}
          <div className="bg-[#06080c] border border-[#1c2232] rounded overflow-hidden">
            <div className="flex items-center justify-between bg-[#0e1119] px-3 py-2 border-b border-[#1c2232]">
              <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider">
                FORENSIC ARTIFACT — {task.artifactType.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/25">
                EXHIBIT {String(task.id).padStart(2, '0')}
              </span>
            </div>
            <pre className="p-4 font-mono text-[12px] text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
              {task.artifact}
            </pre>
          </div>

          {/* Answer Input */}
          {!solved ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') playKeyClick();
                  }}
                  placeholder="Enter your answer..."
                  className={`flex-1 bg-[#090c12] border rounded px-3 py-2.5 text-sm font-mono text-slate-100 placeholder-[#3a4558] focus:outline-none transition-colors ${
                    error ? 'border-rose-500/50 focus:border-rose-400' : `border-[#252f42] focus:border-amber-400/50 ${shake ? 'animate-pulse border-rose-500' : ''}`
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Submit
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-mono">
                  <AlertCircle size={13} />
                  <span>{error}</span>
                </div>
              )}

              {/* Hint System */}
              <div className="flex items-center flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleHintReveal(1)}
                  disabled={showHint1}
                  className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${
                    showHint1
                      ? 'bg-[#0f1520] border-[#1a2232] text-[#64748b] cursor-default'
                      : 'bg-[#13191f] border-[#252f42] text-[#94a3b8] hover:text-amber-300 hover:border-amber-500/30'
                  }`}
                >
                  <HelpCircle size={13} />
                  <span>Hint 1 {!showHint1 ? '(−5 pts)' : '(revealed)'}</span>
                </button>

                {showHint1 && (
                  <button
                    type="button"
                    onClick={() => handleHintReveal(2)}
                    disabled={showHint2}
                    className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${
                      showHint2
                        ? 'bg-[#0f1520] border-[#1a2232] text-[#64748b] cursor-default'
                        : 'bg-[#13191f] border-[#252f42] text-[#94a3b8] hover:text-amber-300 hover:border-amber-500/30'
                    }`}
                  >
                    <HelpCircle size={13} />
                    <span>Hint 2 {!showHint2 ? '(−5 more pts)' : '(revealed)'}</span>
                  </button>
                )}
              </div>

              {/* Show Hints */}
              {showHint1 && (
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded text-xs text-amber-200/90 font-mono">
                  <span className="text-amber-400 font-semibold block mb-0.5">HINT 1:</span>
                  {task.hints[0]}
                </div>
              )}
              {showHint2 && (
                <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded text-xs text-orange-200/90 font-mono">
                  <span className="text-orange-400 font-semibold block mb-0.5">HINT 2 (SPOILER):</span>
                  {task.hints[1]}
                </div>
              )}
            </form>
          ) : (
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/25 rounded space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
                <CheckCircle2 size={15} />
                <span>TASK CLEARED — Character Recovered: [{task.character}]</span>
              </div>
              <div className="text-xs text-emerald-200/80 font-mono bg-[#0a130e] p-3 rounded border border-emerald-800/40">
                <span className="text-emerald-400/70">SOLUTION: </span>{task.solution}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Round1View({
  solvedTasks,
  onSolveTask,
  onHint,
  hintUsed,
  keyCharacters,
}) {
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [showKeyDisplay, setShowKeyDisplay] = useState(true);

  const filteredTasks = useMemo(() => {
    if (filterDifficulty === 'All') return ROUND1_TASKS;
    return ROUND1_TASKS.filter((t) => t.difficulty === filterDifficulty);
  }, [filterDifficulty]);

  const difficulties = ['All', 'Easy', 'Medium', 'Medium-Hard', 'Hard', 'Very Hard'];
  const masterKey = EVENT_INFO.codeword;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Master Key Progress Display */}
      <div className="border border-[#1e2637] bg-[#0c0f16] rounded p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-amber-400">
            <KeyRound size={16} />
            <span>ARCHIVE MASTER UNLOCK KEY — RECOVERY PROGRESS</span>
          </div>
          <button
            onClick={() => { playKeyClick(); setShowKeyDisplay(!showKeyDisplay); }}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
          >
            {showKeyDisplay ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showKeyDisplay ? 'Hide Key' : 'Show Key'}</span>
          </button>
        </div>

        {showKeyDisplay && (
          <div className="flex items-center flex-wrap gap-1 py-2">
            {masterKey.split('').map((char, idx) => {
              const taskId = idx + 1;
              const isSolved = solvedTasks.has(taskId);
              return (
                <div
                  key={idx}
                  className={`w-10 h-12 flex flex-col items-center justify-between border rounded font-mono transition-all duration-300
                    ${isSolved 
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                      : 'bg-[#090b0f] border-[#1a2130] text-[#1e2638]'
                    }`}
                >
                  <span className="text-[9px] pt-1 text-[#475569]">{String(taskId).padStart(2, '0')}</span>
                  <span className={`text-xl font-bold pb-1 ${isSolved ? 'glow-amber' : ''}`}>
                    {isSolved ? char : '·'}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-t border-[#192030] pt-3">
          <span className="text-emerald-400 font-medium">
            {solvedTasks.size} / {ROUND1_TASKS.length} SOLVED
          </span>
          <div className="flex-1 h-1.5 bg-[#131923] rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400/80 rounded-full transition-all duration-500"
              style={{ width: `${(solvedTasks.size / ROUND1_TASKS.length) * 100}%` }}
            />
          </div>
          <span className="text-slate-500">{Math.round((solvedTasks.size / ROUND1_TASKS.length) * 100)}%</span>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono text-[#64748b]">FILTER:</span>
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => { playKeyClick(); setFilterDifficulty(d); }}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${
              filterDifficulty === d
                ? 'bg-[#1e2638] border-amber-500/30 text-amber-300'
                : 'bg-[#0a0c11] border-[#1c2232] text-[#94a3b8] hover:border-[#2d3a52] hover:text-slate-200'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {filteredTasks.map((task, idx) => (
          <TaskCard
            key={task.id}
            task={task}
            index={idx}
            solved={solvedTasks.has(task.id)}
            onSolve={(id, char) => onSolveTask(id, char)}
            onHint={onHint}
            hintUsed={hintUsed}
            hintsUsedCount={hintUsed[task.id] ? 1 : 0}
          />
        ))}
      </div>
    </div>
  );
}

