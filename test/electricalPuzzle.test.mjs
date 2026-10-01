import test from "node:test";
import assert from "node:assert/strict";
import { allElectricalConfigurations, isStableElectricalConfiguration } from "../lib/electricalPuzzle.mjs";
import { isRestoredTimeline, restoredTimeline } from "../games/puzzles/timelineEvidence.mjs";

test("la configuration stable est unique parmi les 64 possibilités", () => {
  const solutions = allElectricalConfigurations().filter(isStableElectricalConfiguration);
  assert.equal(solutions.length, 1);
  assert.deepEqual(solutions[0], { salon: true, cuisine: false, garage: true, chambre: false, bureau: true, jardin: false });
});

test("la chronologie ne valide que l’ordre attendu", () => {
  assert.equal(isRestoredTimeline(restoredTimeline), true);
  assert.equal(isRestoredTimeline([...restoredTimeline].reverse()), false);
});
