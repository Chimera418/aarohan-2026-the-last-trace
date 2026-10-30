import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  User,
  FileText,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Shield,
  Lock,
  Unlock,
  Eye,
  Tag,
  Link2,
  Hash,
  Clock,
  Fingerprint,
  Send,
  RotateCcw,
  Star,
  Ban,
} from 'lucide-react';
import {
  SUSPECTS,
  EVIDENCE_FILES,
  MOTIVE_CODEBOOK,
  MOTIVE_CANDIDATE_SENTENCES,
  INTENDED_SOLUTION,
} from '../data/caseData';
import { playKeyClick, playSuccessChime, playErrorBuzz, playAccessGranted } from '../utils/soundEffects';

// ─── Suspect Card ──────────────────────────────────────────────────────────────

function SuspectCard({ suspect, isSelected, onSelect, revealMode }) {
  const [expanded, setExpanded] = useState(false);
  const isCulprit = suspect.isCulprit && revealMode;
  const isExonerated = !suspect.isCulprit && revealMode;

  return (
    <div
      className={`border rounded transition-all duration-200 overflow-hidden
        ${isCulprit
          ? 'border-rose-500/50 bg-[#180b0b]'
          : isExonerated
          ? 'border-emerald-600/30 bg-[#0a130f]'
          : isSelected
          ? 'border-amber-500/40 bg-[#0f1219]'
          : 'border-[#1e2637] bg-[#0b0d13] hover:border-[#2a3448]'
        }`}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 p-3.5">
        {/* Avatar placeholder */}
        <div className={`shrink-0 w-10 h-10 rounded border flex items-center justify-center font-mono font-bold text-sm
          ${isCulprit
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            : isExonerated
            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
            : 'bg-[#111620] border-[#252f42] text-[#94a3b8]'
          }`}>
          {suspect.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold text-sm ${isCulprit ? 'text-rose-300' : isExonerated ? 'text-emerald-300' : 'text-slate-200'}`}>
              {suspect.name}
            </span>
            {isCulprit && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                PRIMARY CULPRIT
              </span>
            )}
            {isExonerated && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                EXONERATED
              </span>
            )}
          </div>
          <div className="text-xs font-mono text-[#94a3b8] mt-0.5 flex items-center gap-2 flex-wrap">
            <span className="text-cyan-400/90">{suspect.role}</span>
            <span className="text-[#3a4558]">·</span>
            <span>Badge: {suspect.badgeId}</span>
            <span className="text-[#3a4558]">·</span>
            <span>Clearance: {suspect.clearance}</span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {/* Select as Culprit */}
          <button
            onClick={() => { playKeyClick(); onSelect(suspect.id); }}
            className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors cursor-pointer whitespace-nowrap
              ${isSelected
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-[#0a0c11] border-[#1e2637] text-[#64748b] hover:text-amber-300 hover:border-amber-500/30'
              }`}
          >
            {isSelected ? '★ ACCUSED' : 'Accuse'}
          </button>

          {/* Expand toggle */}
          <button
            onClick={() => { playKeyClick(); setExpanded(!expanded); }}
            className="p-1.5 rounded text-[#64748b] hover:text-slate-200 hover:bg-[#131721] cursor-pointer"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-[#191f2e] p-4 space-y-3 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[#64748b] text-[10px] tracking-wider">INSTITUTIONAL ROLE</span>
              <p className="text-slate-300 leading-relaxed">{suspect.summary}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#64748b] text-[10px] tracking-wider">RELATIONSHIP TO VICTIM</span>
              <p className="text-slate-300 leading-relaxed">{suspect.relationship}</p>
            </div>
          </div>

          <div className="border-t border-[#17202e] pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[#64748b] text-[10px] tracking-wider">RECORDED STATEMENT</span>
              <p className="text-slate-300 leading-relaxed italic">"{suspect.statement}"</p>
            </div>
            <div className="space-y-1">
              <span className="text-[#64748b] text-[10px] tracking-wider">ALIBI ON RECORD</span>
              <p className="text-slate-300 leading-relaxed">{suspect.alibi}</p>
            </div>
          </div>

          {/* Red herring notice (always show) */}
          <div className="flex items-start gap-2 p-2.5 bg-amber-500/5 border border-amber-500/15 rounded">
            <AlertTriangle size={13} className="shrink-0 mt-0.5 text-amber-400/70" />
            <p className="text-amber-200/70 leading-relaxed">{suspect.redHerring}</p>
          </div>

          {/* Linked evidence */}
          {suspect.evidenceLinks.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#64748b] text-[10px]">LINKED FILES:</span>
              {suspect.evidenceLinks.map(eid => (
                <span key={eid} className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px]">
                  {eid}
                </span>
              ))}
            </div>
          )}

          {/* Reveal mode notes */}
          {revealMode && (
            <div className={`p-2.5 rounded border text-[11px] ${
              suspect.isCulprit
                ? 'bg-rose-500/8 border-rose-500/25 text-rose-200'
                : 'bg-emerald-500/8 border-emerald-500/20 text-emerald-200'
            }`}>
              <span className="font-bold">{suspect.isCulprit ? 'CULPRIT NOTE: ' : 'EXONERATION NOTE: '}</span>
              {suspect.statusNotes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Evidence File Viewer ──────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  'Chronology & Telemetry': { border: 'border-cyan-500/25', bg: 'bg-cyan-500/5', text: 'text-cyan-400' },
  'Physical Security': { border: 'border-amber-500/25', bg: 'bg-amber-500/5', text: 'text-amber-400' },
  'Digital Forensics': { border: 'border-violet-500/25', bg: 'bg-violet-500/5', text: 'text-violet-400' },
  'Operational Evidence': { border: 'border-orange-500/25', bg: 'bg-orange-500/5', text: 'text-orange-400' },
  'Victim Statements': { border: 'border-rose-500/25', bg: 'bg-rose-500/5', text: 'text-rose-400' },
  'System Administration': { border: 'border-indigo-500/25', bg: 'bg-indigo-500/5', text: 'text-indigo-400' },
  'Decryption & Motive': { border: 'border-emerald-500/25', bg: 'bg-emerald-500/5', text: 'text-emerald-400' },
};

function EvidenceFileCard({ file, isMarked, onToggleMark }) {
  const [expanded, setExpanded] = useState(false);
  const style = CATEGORY_STYLES[file.category] ?? { border: 'border-[#1e2637]', bg: 'bg-[#0d1019]', text: 'text-slate-400' };

  const renderContent = () => {
    if (file.id === 'E-04') {
      // Print spool — dot-matrix style
      return (
        <div className="dot-matrix-paper p-5 rounded border border-[#d1d8e0] overflow-x-auto">
          <pre className="text-[11px] leading-relaxed whitespace-pre-wrap text-zinc-800">{file.content}</pre>
        </div>
      );
    }
    if (file.id === 'E-05') {
      // Handwritten diary — lined paper
      return (
        <div className="diary-paper p-6 rounded overflow-x-auto text-zinc-800 font-serif">
          <pre className="text-[12px] leading-7 whitespace-pre-wrap font-['IBM_Plex_Sans'] italic">{file.content}</pre>
        </div>
      );
    }
    return (
      <pre className="bg-[#06080d] border border-[#1a2130] p-4 rounded text-[11px] font-mono text-cyan-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
        {file.content}
      </pre>
    );
  };

  return (
    <div className={`border rounded transition-all duration-200 ${
      isMarked ? `${style.border} ${style.bg}` : 'border-[#1e2637] bg-[#0b0d13] hover:border-[#2a3448]'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-3.5">
        <div className={`shrink-0 px-2 py-1 rounded border font-mono font-bold text-xs ${style.border} ${style.bg} ${style.text}`}>
          {file.code}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-slate-200">{file.title}</div>
          <div className="text-[11px] font-mono text-[#94a3b8] mt-0.5">
            <span className={style.text}>{file.category}</span>
            <span className="text-[#3a4558] mx-1.5">·</span>
            <span>{file.summary}</span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => { playKeyClick(); onToggleMark(file.id); }}
            className={`text-[11px] font-mono px-2 py-1 rounded border transition-colors cursor-pointer
              ${isMarked
                ? 'bg-cyan-500/15 border-cyan-500/35 text-cyan-300'
                : 'bg-[#0a0c11] border-[#1e2637] text-[#64748b] hover:text-cyan-300 hover:border-cyan-500/25'
              }`}
          >
            {isMarked ? '✓ Flagged' : 'Flag'}
          </button>
          <button
            onClick={() => { playKeyClick(); setExpanded(!expanded); }}
            className="p-1.5 rounded text-[#64748b] hover:text-slate-200 hover:bg-[#131721] cursor-pointer"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="border-t border-[#191f2e] p-4 space-y-3">
          {renderContent()}

          {/* Key Takeaway Box */}
          <div className="flex items-start gap-2 p-3 bg-[#0a1018] border border-[#1c2a3a] rounded">
            <Tag size={13} className="shrink-0 mt-0.5 text-cyan-400/80" />
            <div className="text-[11px] font-mono text-cyan-100/80">
              <span className="text-cyan-400 font-semibold">KEY TAKEAWAY: </span>
              {file.keyTakeaway}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Motive Decoder Workbench ──────────────────────────────────────────────────

function MotiveDecoder({ selectedMotive, onSelectMotive, revealMode }) {
  const encodedPhrase = "VAK TOR KORAN ZEL TOR MITH LUR";
  const tokens = encodedPhrase.split(' ');

  const decode = (token) => {
    const entry = MOTIVE_CODEBOOK.find(e => e.token === token);
    return entry ? entry.meaning : '???';
  };

  return (
    <div className="border border-[#1e2637] bg-[#0c0f16] rounded p-5 space-y-4">
      <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-200 border-b border-[#192030] pb-3">
        <BookOpen size={16} className="text-emerald-400" />
        <span>MOTIVE DECODER — FOREIGN LANGUAGE CODEBOOK</span>
      </div>

      {/* Encoded phrase display */}
      <div className="bg-[#07090e] border border-[#1a2230] p-4 rounded">
        <div className="text-[10px] font-mono text-[#64748b] mb-2">RECOVERED ENCODED MOTIVE (from Evidence E-08):</div>
        <div className="flex items-center flex-wrap gap-3">
          {tokens.map((token, idx) => (
            <div key={idx} className="text-center">
              <div className="font-mono font-bold text-amber-300 text-sm tracking-widest">
                {token}
              </div>
              <div className="text-[10px] font-mono mt-0.5 flex items-center justify-center">
                <ChevronDown size={10} className="text-[#3a4558]" />
              </div>
              <div className="font-mono text-emerald-400/90 text-xs bg-[#0b140f] border border-emerald-500/20 px-2 py-0.5 rounded">
                {decode(token)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded font-mono text-emerald-300 text-sm font-bold tracking-wide text-center">
          "{tokens.map(t => decode(t)).join(' ')}"
        </div>
      </div>

      {/* Full Codebook reference */}
      <details className="group">
        <summary className="cursor-pointer text-xs font-mono text-[#94a3b8] hover:text-slate-200 transition-colors flex items-center gap-1.5 list-none">
          <ChevronRight size={14} className="group-open:rotate-90 transition-transform text-cyan-400" />
          View Full Codebook Reference ({MOTIVE_CODEBOOK.length} entries)
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="text-[#64748b] border-b border-[#1a2130] text-left text-[10px]">
                <th className="py-2 px-2">TOKEN</th>
                <th className="py-2 px-2">MEANING</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#131a26]">
              {MOTIVE_CODEBOOK.map(entry => (
                <tr key={entry.token} className="hover:bg-[#0e1420]">
                  <td className="py-1.5 px-2 text-amber-300 font-bold">{entry.token}</td>
                  <td className="py-1.5 px-2 text-emerald-300">{entry.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* Candidate Motive Selection */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono text-[#64748b] tracking-wider">SELECT THE CORRECT DECODED MOTIVE PHRASE:</div>
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {MOTIVE_CANDIDATE_SENTENCES.map(candidate => {
            const isCorrect = candidate.isCorrect && revealMode;
            const isWrong = !candidate.isCorrect && selectedMotive === candidate.id && revealMode;
            return (
              <button
                key={candidate.id}
                onClick={() => { playKeyClick(); onSelectMotive(candidate.id); }}
                className={`w-full text-left p-3 rounded border text-xs font-mono transition-colors cursor-pointer
                  ${selectedMotive === candidate.id && !revealMode
                    ? 'border-amber-500/40 bg-amber-500/8 text-amber-200'
                    : isCorrect
                    ? 'border-emerald-500/40 bg-emerald-500/8 text-emerald-200'
                    : isWrong
                    ? 'border-rose-500/30 bg-rose-500/5 text-rose-300'
                    : 'border-[#1a2232] bg-[#080a0e] text-slate-300 hover:border-[#2a3448] hover:bg-[#0d1018]'
                  }`}
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5 text-[#64748b]">{String(candidate.id).padStart(2, '0')}.</span>
                  <div>
                    <div className="font-semibold">{candidate.text}</div>
                    <div className="text-[10px] text-[#64748b] mt-0.5">Encoded: {candidate.encoded}</div>
                  </div>
                  {isCorrect && (
                    <CheckCircle2 size={14} className="ml-auto shrink-0 text-emerald-400" />
                  )}
                  {isWrong && (
                    <XCircle size={14} className="ml-auto shrink-0 text-rose-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Verdict Submission Panel ──────────────────────────────────────────────────

function VerdictPanel({ selectedCulprit, selectedMotive, markedEvidence, onSubmit, submitted, isCorrect }) {
  const culprit = SUSPECTS.find(s => s.id === selectedCulprit);
  const motiveCandidate = MOTIVE_CANDIDATE_SENTENCES.find(m => m.id === selectedMotive);

  return (
    <div className={`border rounded p-5 space-y-4 transition-all duration-300 ${
      submitted
        ? isCorrect
          ? 'border-emerald-500/40 bg-[#0b1a12]'
          : 'border-rose-500/30 bg-[#130b0b]'
        : 'border-[#2a3448] bg-[#0d1017]'
    }`}>
      <div className="flex items-center gap-2 text-sm font-mono font-bold border-b border-[#192030] pb-3">
        <Send size={16} className={submitted ? (isCorrect ? 'text-emerald-400' : 'text-rose-400') : 'text-amber-400'} />
        <span className={submitted ? (isCorrect ? 'text-emerald-300' : 'text-rose-300') : 'text-slate-200'}>
          {submitted ? (isCorrect ? 'VERDICT ACCEPTED — CASE SOLVED' : 'VERDICT REJECTED — RE-EXAMINE EVIDENCE') : 'FINAL INDICTMENT SUBMISSION'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="bg-[#07090e] border border-[#1a2232] p-3 rounded space-y-1">
          <span className="text-[#64748b] text-[10px] tracking-wider block">PRIMARY ACCUSED</span>
          {culprit ? (
            <span className="text-amber-300 font-semibold">{culprit.name}</span>
          ) : (
            <span className="text-[#475569] italic">No suspect selected</span>
          )}
          <div className="text-[10px] text-[#64748b]">{culprit?.role ?? ''}</div>
        </div>

        <div className="bg-[#07090e] border border-[#1a2232] p-3 rounded space-y-1">
          <span className="text-[#64748b] text-[10px] tracking-wider block">MOTIVE PHRASE</span>
          {motiveCandidate ? (
            <span className="text-emerald-300 font-semibold text-[11px] leading-relaxed">{motiveCandidate.text}</span>
          ) : (
            <span className="text-[#475569] italic">No motive selected</span>
          )}
        </div>

        <div className="bg-[#07090e] border border-[#1a2232] p-3 rounded space-y-1">
          <span className="text-[#64748b] text-[10px] tracking-wider block">FLAGGED EVIDENCE</span>
          {markedEvidence.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {markedEvidence.map(eid => (
                <span key={eid} className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px]">
                  {eid}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[#475569] italic">None flagged</span>
          )}
        </div>
      </div>

      {submitted && isCorrect && (
        <div className="p-4 bg-emerald-500/8 border border-emerald-500/25 rounded space-y-1 text-emerald-200 text-xs font-mono">
          <div className="font-bold text-emerald-300 text-sm">✓ INDICTMENT CONFIRMED — CASE CLOSED</div>
          <div>Culprit identified: <span className="text-emerald-400">{INTENDED_SOLUTION.culpritName}</span></div>
          <div>Motive phrase: <span className="text-emerald-400">"{INTENDED_SOLUTION.motivePhrase}"</span></div>
        </div>
      )}

      {submitted && !isCorrect && (
        <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded text-rose-200 text-xs font-mono">
          One or more verdict fields are incorrect. Re-examine the evidence files and re-submit.
        </div>
      )}

      {!submitted && (
        <button
          onClick={onSubmit}
          disabled={!selectedCulprit || !selectedMotive}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-[#1e2636] disabled:text-[#475569] disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Send size={15} />
          <span>SUBMIT FINAL VERDICT</span>
        </button>
      )}
    </div>
  );
}

// ─── Main Round 2 View ─────────────────────────────────────────────────────────

export default function Round2View({ isUnlocked, revealMode }) {
  const [activeSection, setActiveSection] = useState('suspects');
  const [selectedCulprit, setSelectedCulprit] = useState(null);
  const [selectedMotive, setSelectedMotive] = useState(null);
  const [markedEvidence, setMarkedEvidence] = useState([]);
  const [suspectSearch, setSuspectSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleToggleMark = (eid) => {
    playKeyClick();
    setMarkedEvidence(prev =>
      prev.includes(eid) ? prev.filter(e => e !== eid) : [...prev, eid]
    );
  };

  const filteredSuspects = useMemo(() => {
    if (!suspectSearch) return SUSPECTS;
    const q = suspectSearch.toLowerCase();
    return SUSPECTS.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.badgeId.toLowerCase().includes(q)
    );
  }, [suspectSearch]);

  const handleSubmitVerdict = () => {
    const culpritCorrect = selectedCulprit === INTENDED_SOLUTION.culpritId;
    const motiveCorrect = MOTIVE_CANDIDATE_SENTENCES.find(m => m.id === selectedMotive)?.isCorrect ?? false;
    const correct = culpritCorrect && motiveCorrect;
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      playAccessGranted();
    } else {
      playErrorBuzz();
    }
  };

  if (!isUnlocked) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <Lock size={48} className="text-[#2a3448]" />
        <h2 className="text-2xl font-bold text-slate-400 font-mono tracking-tight">ARCHIVE SEALED</h2>
        <p className="text-sm text-[#64748b] font-mono max-w-md leading-relaxed">
          This module is locked until the 15-character master codeword recovered from Round 1 is entered
          and verified. Complete Round 1 to proceed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Round 2 Header Banner */}
      <div className="border border-amber-500/20 bg-amber-500/5 rounded p-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Unlock size={18} className="text-amber-400" />
          <div className="font-mono">
            <div className="font-bold text-amber-300 text-sm">ARCHIVE BREACH CONFIRMED — INVESTIGATION ACTIVE</div>
            <div className="text-xs text-amber-400/60">Case Room 4B access granted. Examine all available evidence. 45-minute window active.</div>
          </div>
        </div>
        <div className="font-mono text-xs text-[#64748b]">
          {markedEvidence.length} file{markedEvidence.length !== 1 ? 's' : ''} flagged
          &nbsp;·&nbsp;
          {selectedCulprit ? `Suspect: ${SUSPECTS.find(s => s.id === selectedCulprit)?.name}` : 'No accusation yet'}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 flex-wrap border-b border-[#1a2232] pb-3">
        {[
          { id: 'suspects', label: 'Suspect Profiles', count: SUSPECTS.length },
          { id: 'evidence', label: 'Evidence Files', count: EVIDENCE_FILES.length },
          { id: 'motive', label: 'Motive Decoder', count: null },
          { id: 'verdict', label: 'Final Verdict', count: null },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { playKeyClick(); setActiveSection(tab.id); }}
            className={`px-3 py-2 text-xs font-mono font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === tab.id
                ? 'bg-[#1e2638] text-amber-400 border border-amber-500/30'
                : 'text-[#94a3b8] hover:text-slate-200 hover:bg-[#131720] border border-transparent'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count != null && (
              <span className="text-[10px] px-1 rounded bg-[#111620] text-[#64748b] border border-[#1e2637]">
                {tab.count}
              </span>
            )}
            {tab.id === 'suspects' && selectedCulprit && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            )}
            {tab.id === 'motive' && selectedMotive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
            {tab.id === 'verdict' && submitted && (
              <span className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            )}
          </button>
        ))}
      </div>

      {/* ─── SUSPECTS SECTION ─── */}
      {activeSection === 'suspects' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
              <input
                type="text"
                value={suspectSearch}
                onChange={e => { playKeyClick(); setSuspectSearch(e.target.value); }}
                placeholder="Filter suspects..."
                className="w-full bg-[#090c12] border border-[#252f42] rounded pl-9 pr-3 py-2 text-xs font-mono text-slate-200 placeholder-[#3a4558] focus:outline-none focus:border-amber-400/40"
              />
            </div>
            <span className="text-xs font-mono text-[#64748b]">
              Showing {filteredSuspects.length} of {SUSPECTS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredSuspects.map(suspect => (
              <SuspectCard
                key={suspect.id}
                suspect={suspect}
                isSelected={selectedCulprit === suspect.id}
                onSelect={(id) => setSelectedCulprit(prev => prev === id ? null : id)}
                revealMode={revealMode}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── EVIDENCE SECTION ─── */}
      {activeSection === 'evidence' && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-[#64748b] border-b border-[#1a2232] pb-2">
            8 interconnected evidence files — cross-reference with suspect profiles to build the indictment chain.
          </div>
          {EVIDENCE_FILES.map(file => (
            <EvidenceFileCard
              key={file.id}
              file={file}
              isMarked={markedEvidence.includes(file.id)}
              onToggleMark={handleToggleMark}
            />
          ))}
        </div>
      )}

      {/* ─── MOTIVE DECODER ─── */}
      {activeSection === 'motive' && (
        <MotiveDecoder
          selectedMotive={selectedMotive}
          onSelectMotive={(id) => setSelectedMotive(prev => prev === id ? null : id)}
          revealMode={revealMode}
        />
      )}

      {/* ─── VERDICT ─── */}
      {activeSection === 'verdict' && (
        <div className="space-y-4">
          {/* Summary of selections */}
          <div className="text-xs font-mono text-[#64748b] mb-1">
            Review your accusation below. You can navigate back to change selections before submitting.
          </div>

          {!submitted && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* Quick nav shortcuts */}
              {!selectedCulprit && (
                <button onClick={() => { playKeyClick(); setActiveSection('suspects'); }}
                  className="p-3 border border-amber-500/20 rounded text-amber-300/80 bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer flex items-center gap-2">
                  <User size={14} /> Go to Suspect Profiles to select your accused
                </button>
              )}
              {!selectedMotive && (
                <button onClick={() => { playKeyClick(); setActiveSection('motive'); }}
                  className="p-3 border border-emerald-500/20 rounded text-emerald-300/80 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer flex items-center gap-2">
                  <BookOpen size={14} /> Go to Motive Decoder to select the motive phrase
                </button>
              )}
            </div>
          )}

          <VerdictPanel
            selectedCulprit={selectedCulprit}
            selectedMotive={selectedMotive}
            markedEvidence={markedEvidence}
            onSubmit={handleSubmitVerdict}
            submitted={submitted}
            isCorrect={isCorrect}
          />

          {submitted && (
            <button
              onClick={() => { playKeyClick(); setSubmitted(false); setIsCorrect(false); }}
              className="flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-slate-200 cursor-pointer"
            >
              <RotateCcw size={13} />
              Re-examine and resubmit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

