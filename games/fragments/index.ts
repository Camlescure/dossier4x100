export type Fragment = { id: number; preview: string; description: string; kind: "symbols" | "text" | "image" | "graphic" | "map" };

export const fragments: Fragment[] = [
  { id: 1, preview: "◇ 17 ↑ 04 ○", description: "Fragment de démonstration. Son sens n’est volontairement pas expliqué.", kind: "symbols" },
  { id: 2, preview: "— — —", description: "Fragment en attente de récupération.", kind: "text" },
  { id: 3, preview: "◌", description: "Fragment en attente de récupération.", kind: "graphic" },
  { id: 4, preview: "···", description: "Fragment en attente de récupération.", kind: "symbols" },
  { id: 5, preview: "□", description: "Fragment en attente de récupération.", kind: "image" },
  { id: 6, preview: "↗", description: "Fragment en attente de récupération.", kind: "map" },
];
