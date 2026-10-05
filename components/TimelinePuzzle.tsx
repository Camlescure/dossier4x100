"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { isRestoredTimeline, shuffledTimelineEvidence, timelineEvidence } from "@/games/puzzles/timelineEvidence.mjs";

type Evidence = (typeof timelineEvidence)[number];

export function TimelinePuzzle({ onBack, onSolved }: { onBack: () => void; onSolved: () => void }) {
  const [slots, setSlots] = useState<(string | null)[]>(Array(6).fill(null)), [selectedId, setSelectedId] = useState<string | null>(null), [status, setStatus] = useState<"idle" | "incorrect" | "stable">("idle"), [unavailableImages, setUnavailableImages] = useState<string[]>([]);
  const completionLocked = useRef(false);
  const selected = timelineEvidence.find((item) => item.id === selectedId);
  const unplaced = shuffledTimelineEvidence.filter((item) => !slots.includes(item.id));
  const markImageUnavailable = (id: string) => setUnavailableImages((previous) => previous.includes(id) ? previous : [...previous, id]);
  const placeInSlot = (slotIndex: number) => {
    if (!selectedId || completionLocked.current) return;
    const next = [...slots]; next[slotIndex] = selectedId;
    setSlots(next); setSelectedId(null);
    if (next.every(Boolean)) {
      if (isRestoredTimeline(next)) { completionLocked.current = true; setStatus("stable"); window.setTimeout(onSolved, 950); }
      else setStatus("incorrect");
    } else setStatus("idle");
  };
  const liftFromSlot = (slotIndex: number) => {
    if (completionLocked.current || !slots[slotIndex]) return;
    const next = [...slots]; const id = next[slotIndex]; next[slotIndex] = null; setSlots(next); setSelectedId(id); setStatus("idle");
  };
  return <div className="content timeline-puzzle fade"><button className="back" onClick={onBack}>← Retour</button><p className="eyebrow">ÉNIGME 06</p><h2>Reconstitution</h2><p className="timeline-intro">Six pièces ont été retrouvées.<br/>Leur ordre a été perdu.<br/><br/>Reconstitue la chronologie.</p><section className="timeline-status"><span className={status === "stable" ? "status-light stable-light" : "status-light"}/><div><b>{status === "stable" ? "CHRONOLOGIE RESTAURÉE" : status === "incorrect" ? "INCOHÉRENCE TEMPORELLE DÉTECTÉE" : "CHRONOLOGIE INCOMPLÈTE"}</b><small>{selected ? "PIÈCE SÉLECTIONNÉE" : "Sélectionnez une pièce, puis sa position."}</small></div></section><section className="archive-zone"><p>ARCHIVES RÉCUPÉRÉES</p><div className="evidence-grid">{unplaced.map((evidence) => <EvidenceCard key={evidence.id} evidence={evidence} selected={selectedId === evidence.id} unavailable={unavailableImages.includes(evidence.id)} onImageError={() => markImageUnavailable(evidence.id)} onSelect={() => setSelectedId(selectedId === evidence.id ? null : evidence.id)}/>)}</div></section><section className="chronology"><div className="chronology-label"><span>DÉBUT</span><b>FIL DE PREUVES</b><span>AUJOURD’HUI</span></div><div className="chronology-slots">{slots.map((id, index) => { const evidence = timelineEvidence.find((item) => item.id === id); return <button key={index} className={`timeline-slot ${evidence ? "occupied" : ""}`} onClick={() => evidence ? liftFromSlot(index) : placeInSlot(index)} aria-label={evidence ? `Retirer la pièce de la position ${index + 1}` : `Placer la pièce sélectionnée en position ${index + 1}`}><span>SÉQUENCE {String(index + 1).padStart(2, "0")}</span>{evidence ? <EvidenceCard evidence={evidence} compact unavailable={unavailableImages.includes(evidence.id)} onImageError={() => markImageUnavailable(evidence.id)}/> : <i>{selectedId ? "POSER LA PIÈCE ICI" : "POCHETTE D’ARCHIVE"}</i>}</button>; })}</div></section></div>;
}

function EvidenceCard({ evidence, selected = false, compact = false, unavailable = false, onImageError, onSelect }: { evidence: Evidence; selected?: boolean; compact?: boolean; unavailable: boolean; onImageError: () => void; onSelect?: () => void }) {
  const content = <><div className="evidence-visual">{unavailable ? <span className="evidence-placeholder">{evidence.placeholder}</span> : <Image src={evidence.asset} alt={evidence.title} width={640} height={480} unoptimized onError={onImageError}/>}</div>{evidence.type === "receipt" && <small>RÉSERVATION CONFIRMÉE</small>}{evidence.type === "ticket" && <small>BOARDING PASS</small>}{evidence.type === "phone" && <small>APPEL ENTRANT</small>}</>;
  if (compact) return <div className={`evidence-card ${evidence.type} compact`}>{content}</div>;
  return <button className={`evidence-card ${evidence.type} ${selected ? "selected" : ""}`} onClick={onSelect}>{content}</button>;
}
