"use client";

import { useEffect, useState } from "react";

export function OpeningIntroduction({ onOpen }: { onOpen: () => void }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setReady(true), reducedMotion ? 0 : 10_600);
    return () => window.clearTimeout(timer);
  }, []);

  return <section className="case-launch" aria-labelledby="case-launch-title"><button className="case-launch-skip" onClick={onOpen}>Passer l’introduction</button><div className="case-launch-content"><div className="case-launch-heading"><p className="case-launch-kicker">ARCHIVES CONFIDENTIELLES</p><h1 id="case-launch-title">DOSSIER 4X100</h1><p className="case-launch-restricted">ACCÈS RESTREINT</p></div><article className="case-launch-file" aria-label="Fiche du sujet Victor"><div className="case-launch-file-head"><span>FICHE SUJET</span><i>RÉF. 04.100</i></div><dl><div><dt>SUJET</dt><dd>VICTOR</dd></div><div><dt>IDENTIFIANT</dt><dd>4X100</dd></div><div><dt>ÉTAT DU DOSSIER</dt><dd>INCOMPLET</dd></div><div><dt>FRAGMENTS MANQUANTS</dt><dd>6</dd></div></dl><small>CLASSIFICATION / PERSONNEL</small></article><div className="case-launch-access" aria-label="État d’accès au dossier"><span className="case-launch-line"/><p className="case-launch-locked">DOSSIER VERROUILLÉ</p><p className="case-launch-granted">ACCÈS ACCORDÉ</p></div><div className="case-launch-message"><p>Victor,</p><p>Ce dossier a été fragmenté.</p><p>Six éléments ont été dispersés et verrouillés derrière six épreuves.</p><p>Certaines réponses se trouvent sous tes yeux.<br/>D’autres te demanderont peut-être de regarder ailleurs.</p><p>Chaque énigme résolue te permettra de récupérer une partie du dossier.</p><p>Récupère les six fragments.<br/>Reconstitue ce qui a été perdu.</p></div>{ready && <button className="action case-launch-open" onClick={onOpen}>Ouvrir le dossier<span>→</span></button>}</div></section>;
}
