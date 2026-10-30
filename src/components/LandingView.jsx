import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  FileText, 
  Calendar, 
  Clock, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  AlertCircle,
  FileSearch,
  Fingerprint,
  Building2,
  ExternalLink
} from 'lucide-react';
import { EVENT_INFO, STORYLINE } from '../data/caseData';
import { playKeyClick, playSuccessChime } from '../utils/soundEffects';

export default function LandingView({
  team,
  setTeam,
  onStartRound1,
  onOpenTeamModal,
}) {
  const [teamNameInput, setTeamNameInput] = useState(team.name);
  const [membersInput, setMembersInput] = useState(team.members.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveTeam = (e) => {
    e.preventDefault();
    playKeyClick();
    const members = membersInput
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);
    
    setTeam({
      ...team,
      name: teamNameInput || "Team Delta-7",
      members: members.length > 0 ? members : ["Investigator A", "Investigator B"],
    });
    setSavedSuccess(true);
    playSuccessChime();
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Top Incident Banner */}
      <div className="border border-[#222938] bg-[#0d1017] rounded p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Fingerprint size={240} />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1c2230] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>RESTRICTED ARCHIVAL REPOSITORY // LEVEL -1 ACCESS</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 uppercase">
              {EVENT_INFO.title}
            </h1>
            <p className="text-sm font-mono text-slate-400">
              {EVENT_INFO.institute} · {EVENT_INFO.edition} · Presented by {EVENT_INFO.club}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="bg-[#121622] border border-[#21293a] px-3 py-2 rounded">
              <span className="text-slate-500 block">CASE INCIDENT ID</span>
              <span className="text-cyan-400 font-semibold">{EVENT_INFO.incidentId}</span>
            </div>
            <div className="bg-[#121622] border border-[#21293a] px-3 py-2 rounded">
              <span className="text-slate-500 block">TIME DISCOVERED</span>
              <span className="text-amber-300 font-semibold">{EVENT_INFO.incidentTime}</span>
            </div>
            <div className="bg-[#121622] border border-[#21293a] px-3 py-2 rounded">
              <span className="text-slate-500 block">LOCATION</span>
              <span className="text-slate-200 font-semibold">{EVENT_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Story Briefing Text */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 tracking-wider">
              <Building2 size={16} className="text-amber-400" />
              <span>OFFICIAL FORENSIC INCIDENT DISCLOSURE</span>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-[#090c12] p-5 rounded border border-[#1a2130]">
              {STORYLINE.briefing}
            </div>

            {/* Quote from Dr. John */}
            <div className="p-4 bg-[#141822] border-l-2 border-amber-500/70 rounded-r text-xs font-mono text-slate-300 italic">
              "At 9:50 p.m., Dr. Adrian John was found dead inside the Asterion Institute’s Archive Room. 
              By morning, the ethics board was due to receive evidence that could overturn the institute’s most celebrated research result. 
              Ten people had a reason to fear what Dr. John knew. Follow the trace that survives cross-checking."
            </div>
          </div>

          {/* Team Registration & Access Panel */}
          <div className="space-y-4">
            <div className="bg-[#11151f] border border-[#232c3d] rounded p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1f2738] pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                  <Users size={15} />
                  <span>INVESTIGATION UNIT ROSTER</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {team.code}
                </span>
              </div>

              <form onSubmit={handleSaveTeam} className="space-y-3.5 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">TEAM DESIGNATION</label>
                  <input
                    type="text"
                    value={teamNameInput}
                    onChange={(e) => setTeamNameInput(e.target.value)}
                    className="w-full bg-[#090c12] border border-[#252f42] rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    placeholder="e.g. Unit Cipher Delta"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">
                    TEAM MEMBERS (2–3 PARTICIPANTS)
                  </label>
                  <input
                    type="text"
                    value={membersInput}
                    onChange={(e) => setMembersInput(e.target.value)}
                    className="w-full bg-[#090c12] border border-[#252f42] rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    placeholder="Separate names with commas"
                  />
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#1a2333] hover:bg-[#232f44] text-slate-200 border border-[#2d3a52] hover:border-amber-400/50 py-2 rounded font-medium transition-colors cursor-pointer"
                  >
                    Update Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playKeyClick();
                      setTeamNameInput("Team Delta-7");
                      setMembersInput("A. Verma, S. Raman, K. Nair");
                    }}
                    className="px-2.5 py-2 bg-[#090c12] hover:bg-[#131822] text-[#94a3b8] hover:text-slate-200 border border-[#1f2738] rounded text-[11px] cursor-pointer"
                    title="Load sample roster"
                  >
                    Preset
                  </button>
                </div>

                {savedSuccess && (
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] rounded flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Credentials confirmed for session.</span>
                  </div>
                )}
              </form>

              {/* Enter Round 1 Button */}
              <div className="pt-2 border-t border-[#1c2230]">
                <button
                  onClick={() => {
                    playKeyClick();
                    onStartRound1();
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer tracking-wide"
                >
                  <KeyRound size={16} />
                  <span>ENTER ROUND 1: THE CODE BREAKER</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Quick Rules Snapshot */}
            <div className="bg-[#0b0e14] border border-[#1f2636] p-4 rounded text-xs font-mono space-y-2 text-[#94a3b8]">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5 text-xs">
                <AlertCircle size={14} className="text-cyan-400" />
                <span>SCORING & TIE-BREAKER PROTOCOL</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-slate-400 text-[11px]">
                <li>Round 1: 100 marks total (15 solved technical tasks).</li>
                <li>Round 2: 60 marks for culprit + 40 marks for motive phrase.</li>
                <li>Hints deduct -5 marks each; score floor is 0.</li>
                <li>Tie-breaker: Shorter Round 2 completion time.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Round Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Round 1 Card */}
        <div className="border border-[#1f2637] bg-[#0c0f16] rounded p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a2130] pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-cyan-400 font-semibold">ROUND 01</span>
              <h2 className="text-xl font-bold text-slate-100">The Code Breaker</h2>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-[#64748b] block">DURATION</span>
              <span className="text-slate-200 font-medium">45 Minutes</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Solve 15 diverse forensic and technical challenges across cryptography, binary/ASCII streams,
            Grade 11–12 mathematics & physics, algorithms, and fictional OSINT. Each valid solution releases
            one character of the 15-letter master key:
          </p>

          <div className="bg-[#080a0f] border border-[#1c2230] p-3 rounded font-mono text-center">
            <span className="text-xs text-slate-500 block mb-1">TARGET MASTER KEYWORD</span>
            <div className="text-base tracking-[0.25em] font-bold text-amber-400 font-mono">
              THELASTTRACEKEY
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-1">
            <div className="bg-[#121622] p-2 rounded border border-[#1b2230]">
              <span className="text-slate-500 block text-[10px]">DIFFICULTY SPLIT</span>
              <span className="text-slate-200">5 Easy · 4 Med · 2 MH · 2 Hard · 2 VH</span>
            </div>
            <div className="bg-[#121622] p-2 rounded border border-[#1b2230]">
              <span className="text-slate-500 block text-[10px]">SCORE POTENTIAL</span>
              <span className="text-slate-200">100 Marks (−5 per hint)</span>
            </div>
          </div>
        </div>

        {/* Round 2 Card */}
        <div className="border border-[#1f2637] bg-[#0c0f16] rounded p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a2130] pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-amber-400 font-semibold">ROUND 02</span>
              <h2 className="text-xl font-bold text-slate-100">The Investigation</h2>
            </div>
            <div className="text-right font-mono text-xs">
              <span className="text-[#64748b] block">DURATION</span>
              <span className="text-slate-200 font-medium">45 Minutes</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Gain entry into the sealed Asterion Archive Case Room. Cross-examine 10 suspect placards,
            8 interconnected evidence files (badge exports, SHA-256 checksum diffs, print queues, diary fragments),
            and the foreign-language motive codebook to uncover who murdered Dr. John and why.
          </p>

          <div className="bg-[#080a0f] border border-[#1c2230] p-3 rounded font-mono text-center">
            <span className="text-xs text-slate-500 block mb-1">FINAL VERDICT OBJECTIVE</span>
            <div className="text-xs text-slate-300">
              Identify Primary Culprit + Submit Canonical Motive Phrase
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 pt-1">
            <div className="bg-[#121622] p-2 rounded border border-[#1b2230]">
              <span className="text-slate-500 block text-[10px]">CASE EVIDENCE</span>
              <span className="text-slate-200">10 Suspects · 8 Files · Codebook</span>
            </div>
            <div className="bg-[#121622] p-2 rounded border border-[#1b2230]">
              <span className="text-slate-500 block text-[10px]">SCORE SPLIT</span>
              <span className="text-slate-200">60 Culprit + 40 Motive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proposed Event Schedule Table */}
      <div className="border border-[#1f2636] bg-[#0c0f16] rounded p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1b2232] pb-3">
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-200">
            <Calendar size={16} className="text-cyan-400" />
            <span>PROPOSED EVENT TIMETABLE (TOTAL 2 HOURS)</span>
          </div>
          <span className="text-xs font-mono text-slate-400">90 min competition · 30 min buffer & reveal</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#1e2637] text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">TIME</th>
                <th className="py-2.5 px-3">ACTIVITY</th>
                <th className="py-2.5 px-3">FIELD NOTES & OBJECTIVES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171e2c] text-slate-300">
              {STORYLINE.schedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#121622]/60 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-amber-300 whitespace-nowrap">{row.time}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-200">{row.activity}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

