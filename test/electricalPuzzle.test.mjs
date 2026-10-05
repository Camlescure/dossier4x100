import test from "node:test";
import assert from "node:assert/strict";
import { allElectricalConfigurations, isStableElectricalConfiguration } from "../lib/electricalPuzzle.mjs";
import { isRestoredTimeline, restoredTimeline } from "../games/puzzles/timelineEvidence.mjs";
import { finalPhotoLayout, fragmentPhotoPositions } from "../lib/finalFragments.mjs";

test("la configuration stable est unique parmi les 64 possibilités", () => {
  const solutions = allElectricalConfigurations().filter(isStableElectricalConfiguration);
  assert.equal(solutions.length, 1);
  assert.deepEqual(solutions[0], { salon: true, cuisine: false, garage: true, chambre: false, bureau: true, jardin: false });
});

test("la chronologie ne valide que l’ordre attendu", () => {
  assert.equal(isRestoredTimeline(restoredTimeline), true);
  assert.equal(isRestoredTimeline([...restoredTimeline].reverse()), false);
});

test("les fragments couvrent les six zones de la photo finale", () => {
  assert.deepEqual(finalPhotoLayout, [4, 1, 6, 2, 5, 3]);
  assert.deepEqual(fragmentPhotoPositions[1], { column: 1, row: 0, shape: "top-middle" });
  assert.deepEqual(fragmentPhotoPositions[2], { column: 0, row: 1, shape: "bottom-left" });
  assert.deepEqual(fragmentPhotoPositions[3], { column: 2, row: 1, shape: "bottom-right" });
  assert.deepEqual(fragmentPhotoPositions[4], { column: 0, row: 0, shape: "top-left" });
  assert.deepEqual(fragmentPhotoPositions[5], { column: 1, row: 1, shape: "bottom-middle" });
  assert.deepEqual(fragmentPhotoPositions[6], { column: 2, row: 0, shape: "top-right" });
});
