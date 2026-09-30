export type GameState = { started: boolean; solvedPuzzleIds: string[]; unlockedFragmentIds: number[] };
export const emptyGameState: GameState = { started: false, solvedPuzzleIds: [], unlockedFragmentIds: [] };
const storageKey = "dossier-4x100-game-state";
export function loadGameState(): GameState { if (typeof window === "undefined") return emptyGameState; try { const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "null"); if (!parsed || !Array.isArray(parsed.solvedPuzzleIds) || !Array.isArray(parsed.unlockedFragmentIds)) return emptyGameState; return { started: Boolean(parsed.started), solvedPuzzleIds: parsed.solvedPuzzleIds, unlockedFragmentIds: parsed.unlockedFragmentIds }; } catch { return emptyGameState; } }
export function saveGameState(state: GameState) { window.localStorage.setItem(storageKey, JSON.stringify(state)); }
