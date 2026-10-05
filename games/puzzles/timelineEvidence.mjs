export const timelineEvidence = [
  { id: "rencontre", title: "Rencontre", asset: "/images/enigme-06/rencontre.jpg", type: "polaroid", placeholder: "PHOTO" },
  { id: "appel", title: "Appel", asset: "/images/enigme-06/appel.jpg", type: "phone", placeholder: "APPEL" },
  { id: "dieppe", title: "Dieppe", asset: "/images/enigme-06/dieppe.jpg", type: "receipt", placeholder: "SÉJOUR" },
  { id: "montreal", title: "Montréal", asset: "/images/enigme-06/montreal.png", type: "ticket", placeholder: "VOL" },
  { id: "portugal", title: "Portugal", asset: "/images/enigme-06/portugal.jpg", type: "travel", placeholder: "VOYAGE" },
  { id: "travaux", title: "Travaux", asset: "/images/enigme-06/travaux.png", type: "evidence", placeholder: "TRAVAUX" },
];

export const restoredTimeline = timelineEvidence.map((evidence) => evidence.id);

// Ordre de consultation dans les archives : volontairement différent de la chronologie.
export const shuffledTimelineEvidence = [
  timelineEvidence[4],
  timelineEvidence[0],
  timelineEvidence[5],
  timelineEvidence[1],
  timelineEvidence[3],
  timelineEvidence[2],
];

export function isRestoredTimeline(placement) {
  return placement.length === restoredTimeline.length && placement.every((id, index) => id === restoredTimeline[index]);
}
