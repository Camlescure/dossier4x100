export type Puzzle = { id: string; order: number; title: string; shortDescription: string; introduction: string; fragmentId: number; demoAnswer?: string };

export const puzzles: Puzzle[] = [
  { id: "polybius-square", order: 1, title: "Code 88", shortDescription: "Un message chiffré attend d’être déchiffré.", introduction: "Certains messages ne sont pas faits pour être lus. Ils doivent être déchiffrés.", fragmentId: 1, demoAnswer: "NOM DE ZEUS" },
  { id: "terminal-access", order: 2, title: "Accès refusé", shortDescription: "Un environnement local attend d’être exploré.", introduction: "", fragmentId: 2, demoAnswer: "JOHNNY" },
  { id: "minutes-crimes", order: 3, title: "Minutes Crimes", shortDescription: "Une archive audio attend d’être écoutée.", introduction: "", fragmentId: 3, demoAnswer: "DIEPPE" },
  { id: "off-screen-map", order: 4, title: "Hors écran", shortDescription: "Des fragments ont été dissimulés dans votre environnement.", introduction: "", fragmentId: 4, demoAnswer: "SKYNET" },
  { id: "electrical-failure", order: 5, title: "Panne générale", shortDescription: "Un réseau électrique instable demande une intervention.", introduction: "", fragmentId: 5 },
  { id: "timeline-reconstruction", order: 6, title: "Reconstitution", shortDescription: "Six pièces à conviction doivent retrouver leur ordre.", introduction: "", fragmentId: 6 },
];
