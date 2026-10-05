export type GameState = {
  started: boolean;
  solvedPuzzleIds: string[];
  unlockedFragmentIds: number[];
  finalRevealSeen: boolean;
  introSeen: boolean;
};

export const emptyGameState: GameState = {
  started: false,
  solvedPuzzleIds: [],
  unlockedFragmentIds: [],
  finalRevealSeen: false,
  introSeen: false,
};

const storageKey = "dossier-4x100-game-state";

export function loadGameState(): GameState {
  if (typeof window === "undefined") return emptyGameState;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
    if (!parsed || !Array.isArray(parsed.solvedPuzzleIds) || !Array.isArray(parsed.unlockedFragmentIds)) return emptyGameState;

    const hasExistingProgress = parsed.started === true || parsed.solvedPuzzleIds.length > 0 || parsed.unlockedFragmentIds.length > 0 || parsed.finalRevealSeen === true;

    return {
      started: Boolean(parsed.started),
      solvedPuzzleIds: parsed.solvedPuzzleIds,
      unlockedFragmentIds: parsed.unlockedFragmentIds,
      finalRevealSeen: Boolean(parsed.finalRevealSeen),
      introSeen: typeof parsed.introSeen === "boolean" ? parsed.introSeen : hasExistingProgress,
    };
  } catch {
    return emptyGameState;
  }
}

export function saveGameState(state: GameState) {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}
