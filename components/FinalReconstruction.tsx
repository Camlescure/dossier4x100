"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { finalPhotoLayout, finalPhotoSource } from "@/lib/finalFragments.mjs";
import { PhotoFragment } from "@/components/PhotoFragment";

export function FinalReconstruction({ animate, onClose }: { animate: boolean; onClose: () => void }) {
  const [assembled, setAssembled] = useState(!animate);
  const [cleanPhoto, setCleanPhoto] = useState(!animate);
  const [flipped, setFlipped] = useState(false);
  const [readyToReveal, setReadyToReveal] = useState(!animate);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [photoRatio, setPhotoRatio] = useState(4 / 3);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => {
      setPhotoRatio(image.naturalWidth / image.naturalHeight);
      setAvailable(true);
    };
    image.onerror = () => setAvailable(false);
    image.src = finalPhotoSource;
  }, []);

  useEffect(() => {
    if (!animate) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = (value: number) => (reducedMotion ? 0 : value);
    const assemble = window.setTimeout(() => setAssembled(true), delay(340));
    const revealPhoto = window.setTimeout(() => setCleanPhoto(true), delay(2200));
    const enableMessage = window.setTimeout(() => setReadyToReveal(true), delay(2740));

    return () => {
      window.clearTimeout(assemble);
      window.clearTimeout(revealPhoto);
      window.clearTimeout(enableMessage);
    };
  }, [animate]);

  const phase = flipped ? "MESSAGE RETROUVÉ" : cleanPhoto ? "DOSSIER RECONSTITUÉ" : assembled ? "ASSEMBLAGE EN COURS…" : "SYNCHRONISATION DES FRAGMENTS…";
  const status = cleanPhoto ? "06 / 06 — ARCHIVE COMPLÈTE" : assembled ? "LES ÉLÉMENTS SONT EN COURS D’ALIGNEMENT" : "06 / 06 — LIAISON DES FRAGMENTS";
  const finishImmediately = () => {
    setAssembled(true);
    setCleanPhoto(true);
    setReadyToReveal(true);
  };

  return <div className="finale-screen fade"><header className="finale-header"><button onClick={onClose}>← Progression</button><span>ARCHIVE / 04.100</span></header><div className="finale-content"><p className="eyebrow final-phase">{phase}</p><p className="reconstruction-status"><i aria-hidden="true"/>{status}</p><span className="sr-only" aria-live="polite">{readyToReveal ? "Dossier reconstitué. Le message peut être révélé." : ""}</span><div className={`final-photo-stage ${assembled ? "assembled" : ""} ${cleanPhoto ? "clean" : ""} ${flipped ? "flipped" : ""} ${!cleanPhoto ? "reconstructing" : ""}`} style={{ aspectRatio: photoRatio }}><div className="photo-card"><div className="photo-face photo-front"><div className="assembly-grid">{finalPhotoLayout.map((fragmentId, index) => <PhotoFragment key={fragmentId} fragmentId={fragmentId} variant="assembly" className={`assembly-piece piece-${index + 1}`}/>)}</div><div className="reconstruction-scan" aria-hidden="true"/>{cleanPhoto && (available === false ? <div className="final-photo-placeholder">PHOTO FINALE</div> : <Image src={finalPhotoSource} alt="Photo finale reconstituée" width={1200} height={800} unoptimized onError={() => setAvailable(false)}/>)}</div><div className="photo-face photo-back"><p>Tu es arrivé au bout du dossier.<br/><br/>Mais il reste une dernière chose à trouver.<br/><br/>Ton cadeau t’attend sous le canapé.</p></div></div></div>{animate && !readyToReveal && <button className="skip-reconstruction" onClick={finishImmediately}>Passer l’animation</button>}{readyToReveal && <button className="return-photo" onClick={() => setFlipped((previous) => !previous)}>{flipped ? "Voir la photo" : "Révéler le message"}</button>}</div></div>;
}
