import React, { useState } from 'react';
import { X, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { playKeyClick, playSuccessChime } from '../utils/soundEffects';

export default function TeamModal({ isOpen, onClose, team, setTeam }) {
  const [nameInput, setNameInput] = useState(team.name);
  const [membersInput, setMembersInput] = useState(team.members.join(', '));
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const members = membersInput.split(',').map(m => m.trim()).filter(Boolean);
    setTeam({ ...team, name: nameInput || 'Team Alpha', members });
    setSaved(true);
    playSuccessChime();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { playKeyClick(); onClose(); }} />

      <div className="relative w-full max-w-sm border border-[#2a3448] bg-[#0d1017] rounded shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a2232]">
          <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-200">
            <Users size={16} className="text-cyan-400" />
            <span>TEAM CREDENTIALS</span>
          </div>
          <button
            onClick={() => { playKeyClick(); onClose(); }}
            className="p-1.5 rounded text-[#64748b] hover:text-slate-200 hover:bg-[#131721] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs font-mono">
          <div className="space-y-1.5">
            <label className="text-[#64748b] text-[10px] tracking-wider block">TEAM DESIGNATION</label>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="w-full bg-[#090c12] border border-[#252f42] rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400/50"
              placeholder="e.g. Unit Cipher Delta"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#64748b] text-[10px] tracking-wider block">MEMBERS (comma-separated)</label>
            <input
              type="text"
              value={membersInput}
              onChange={e => setMembersInput(e.target.value)}
              className="w-full bg-[#090c12] border border-[#252f42] rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400/50"
              placeholder="Name A, Name B, Name C"
            />
          </div>

          <div className="bg-[#090c12] border border-[#1a2232] p-3 rounded space-y-1">
            <div className="text-[#64748b] text-[10px] tracking-wider">SESSION CODE</div>
            <div className="text-amber-300 font-bold tracking-widest">{team.code}</div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#1a2333] hover:bg-[#232f44] text-slate-200 border border-[#2d3a52] hover:border-amber-400/40 font-medium rounded transition-colors cursor-pointer"
          >
            Save Credentials
          </button>

          {saved && (
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] justify-center">
              <CheckCircle2 size={13} />
              <span>Credentials updated.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

