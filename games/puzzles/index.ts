export type Puzzle = { id: string; order: number; title: string; shortDescription: string; introduction: string; fragmentId: number; demoAnswer?: string };

export const puzzles: Puzzle[] = [
  { id: "memory-signal", order: 1, title: "Signal mémoriel", shortDescription: "Une première vérification d’intégrité vous attend.", introduction: "Un signal a été détecté dans les données de la session.", fragmentId: 1, demoAnswer: "dossier 4x100" },
  ...[2, 3, 4, 5, 6].map((order) => ({ id: `puzzle-0${order}`, order, title: "Fragment absent", shortDescription: "Cette énigme sera ajoutée ultérieurement.", introduction: "", fragmentId: order })),
];
