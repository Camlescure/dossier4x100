"use client";

import { useRef, useState } from "react";
import { activeCircuitCount, initialElectricalConfiguration, isStableElectricalConfiguration } from "@/lib/electricalPuzzle.mjs";

type Circuit = keyof typeof initialElectricalConfiguration;
const circuitLabels: Record<Circuit, string> = { salon: "Salon", cuisine: "Cuisine", garage: "Garage", chambre: "Chambre", bureau: "Bureau", jardin: "Jardin" };

export function ElectricalPuzzle({ onBack, onSolved }: { onBack: () => void; onSolved: () => void }) {
  const [configuration, setConfiguration] = useState(initialElectricalConfiguration), [stable, setStable] = useState(false), [hintVisible, setHintVisible] = useState(false);
  const completionLocked = useRef(false);
  const toggle = (circuit: Circuit) => {
    if (completionLocked.current) return;
    const next = { ...configuration, [circuit]: !configuration[circuit] };
    setConfiguration(next);
    if (isStableElectricalConfiguration(next)) {
      completionLocked.current = true; setStable(true);
      window.setTimeout(onSolved, 950);
    }
  };
  return <div className="content electrical-puzzle fade"><button className="back" onClick={onBack}>← Retour</button><p className="eyebrow">ÉNIGME 05</p><h2>Panne générale</h2><p className="electrical-intro">Une anomalie a provoqué l’arrêt du système.<br/><br/>Le réseau refuse de redémarrer tant que les circuits ne sont pas configurés correctement.</p><section className={`electrical-panel ${stable ? "stable" : "unstable"}`}><div className="panel-screw top-left"/><div className="panel-screw top-right"/><div className="panel-screw bottom-left"/><div className="panel-screw bottom-right"/><div className="panel-header"><span>RÉSEAU / SECTEUR 04</span><i>220V · MAINTENANCE</i></div><div className="network-status"><span className="status-light"/><div><b>{stable ? "SYSTÈME STABLE" : "CONFIGURATION INSTABLE"}</b><small>{stable ? "Alimentation restaurée." : `CIRCUITS ACTIFS : ${activeCircuitCount(configuration)} / 3`}</small></div></div><div className="breaker-grid">{(Object.keys(circuitLabels) as Circuit[]).map((circuit, index) => <button key={circuit} className={`breaker ${configuration[circuit] ? "on" : "off"}`} onClick={() => toggle(circuit)} aria-pressed={configuration[circuit]}><span className="breaker-number">0{index + 1}</span><span className="breaker-label">{circuitLabels[circuit]}</span><span className="switch-track"><i/></span><strong>{configuration[circuit] ? "ON" : "OFF"}</strong></button>)}</div></section><section className="maintenance-sheet"><p>FICHE DE MAINTENANCE</p><dl><div><dt>CAPACITÉ MAXIMALE</dt><dd>3 CIRCUITS ACTIFS</dd></div><div><dt>SALON / CUISINE</dt><dd>Fonctionnement inversé.</dd></div><div><dt>GARAGE / JARDIN</dt><dd>Fonctionnement inversé.</dd></div><div><dt>CHAMBRE</dt><dd>Alimentation impossible sans CUISINE.</dd></div><div><dt>BUREAU</dt><dd>Alimentation impossible sans GARAGE.</dd></div><div><dt>CUISINE ACTIVE</dt><dd>GARAGE hors tension.</dd></div><div><dt>JARDIN / CHAMBRE</dt><dd>Activation simultanée interdite.</dd></div></dl></section>{hintVisible ? <p className="hint"><b>Indice</b>Un circuit peut être correctement alimenté et pourtant empêcher l’ensemble du réseau d’être stable.</p> : <button className="hint-button" onClick={() => setHintVisible(true)}>Afficher l’indice <span>+</span></button>}</div>;
}
