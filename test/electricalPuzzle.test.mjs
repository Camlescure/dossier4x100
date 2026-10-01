import test from "node:test";
import assert from "node:assert/strict";
import { allElectricalConfigurations, isStableElectricalConfiguration } from "../lib/electricalPuzzle.mjs";

test("la configuration stable est unique parmi les 64 possibilités", () => {
  const solutions = allElectricalConfigurations().filter(isStableElectricalConfiguration);
  assert.equal(solutions.length, 1);
  assert.deepEqual(solutions[0], { salon: true, cuisine: false, garage: true, chambre: false, bureau: true, jardin: false });
});
