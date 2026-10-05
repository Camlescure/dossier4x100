export type GameState = { started: boolean; solvedPuzzleIds: string[]; unlockedFragmentIds: number[]; finalRevealSeen: boolean };
export const emptyGameState: GameState = { started: false, solvedPuzzleIds: [], unlockedFragmentIds: [], finalRevealSeen: false };
const storageKey = "dossier-4x100-game-state";
export function loadGameState(): GameState { if (typeof window === "undefined") return emptyGameState; try { const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "null"); if (!parsed || !Array.isArray(parsed.solvedPuzzleIds) || !Array.isArray(parsed.unlockedFragmentIds)) return emptyGameState; return { started: Boolean(parsed.started), solvedPuzzleIds: parsed.solvedPuzzleIds, unlockedFragmentIds: parsed.unlockedFragmentIds, finalRevealSeen: Boolean(parsed.finalRevealSeen) }; } catch { return emptyGameState; } }
export function saveGameState(state: GameState) { window.localStorage.setItem(storageKey, JSON.stringify(state)); }
