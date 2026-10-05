"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { finalPhotoLayout, finalPhotoSource } from "@/lib/finalFragments.mjs";
import { PhotoFragment } from "@/components/PhotoFragment";

export function FinalReconstruction({ animate, onClose }: { animate: boolean; onClose: () => void }) {
  const [assembled, setAssembled] = useState(!animate), [cleanPhoto, setCleanPhoto] = useState(!animate), [flipped, setFlipped] = useState(!animate), [available, setAvailable] = useState<boolean | null>(null), [photoRatio, setPhotoRatio] = useState(4 / 3);
  useEffect(() => { const image = new window.Image(); image.onload = () => { setPhotoRatio(image.naturalWidth / image.naturalHeight); setAvailable(true); }; image.onerror = () => setAvailable(false); image.src = finalPhotoSource; }, []);
  useEffect(() => {
    if (!animate) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = (value: number) => reducedMotion ? 0 : value;
    const first = window.setTimeout(() => setAssembled(true), delay(120));
    const second = window.setTimeout(() => setCleanPhoto(true), delay(1150));
    const third = window.setTimeout(() => setFlipped(true), delay(2050));
    return () => { window.clearTimeout(first); window.clearTimeout(second); window.clearTimeout(third); };
  }, [animate]);
  return <div className="finale-screen fade"><header className="finale-header"><button onClick={onClose}>← Progression</button><span>ARCHIVE / 04.100</span></header><div className="finale-content"><p className="eyebrow">{flipped ? "MESSAGE RETROUVÉ" : cleanPhoto ? "DOSSIER RECONSTITUÉ" : "RECONSTRUCTION EN COURS…"}</p><div className={`final-photo-stage ${assembled ? "assembled" : ""} ${cleanPhoto ? "clean" : ""} ${flipped ? "flipped" : ""}`} style={{ aspectRatio: photoRatio }}><div className="photo-card"><div className="photo-face photo-front"><div className="assembly-grid">{finalPhotoLayout.map((fragmentId, index) => <PhotoFragment key={fragmentId} fragmentId={fragmentId} variant="assembly" className={`assembly-piece piece-${index + 1}`}/>)}</div>{cleanPhoto && (available === false ? <div className="final-photo-placeholder">PHOTO FINALE</div> : <Image src={finalPhotoSource} alt="Photo finale reconstituée" width={1200} height={800} unoptimized onError={() => setAvailable(false)}/>)}</div><div className="photo-face photo-back"><p>Tu es arrivé au bout du dossier.<br/><br/>Mais il reste une dernière chose à trouver.<br/><br/>Ton cadeau t’attend sous le canapé.</p></div></div></div>{cleanPhoto && <button className="return-photo" onClick={() => setFlipped((previous) => !previous)}>{flipped ? "Voir le recto" : "Retourner la photo"}</button>}</div></div>;
}
