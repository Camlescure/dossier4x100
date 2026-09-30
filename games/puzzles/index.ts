export type Puzzle = { id: string; order: number; title: string; shortDescription: string; introduction: string; fragmentId: number; demoAnswer?: string };

export const puzzles: Puzzle[] = [
  { id: "polybius-square", order: 1, title: "Code 88", shortDescription: "Un message chiffré attend d’être déchiffré.", introduction: "Certains messages ne sont pas faits pour être lus. Ils doivent être déchiffrés.", fragmentId: 1, demoAnswer: "NOM DE ZEUS" },
  { id: "terminal-access", order: 2, title: "Accès refusé", shortDescription: "Un environnement local attend d’être exploré.", introduction: "", fragmentId: 2, demoAnswer: "JOHNNY" },
  ...[3, 4, 5, 6].map((order) => ({ id: `puzzle-0${order}`, order, title: "Fragment absent", shortDescription: "Cette énigme sera ajoutée ultérieurement.", introduction: "", fragmentId: order })),
];
