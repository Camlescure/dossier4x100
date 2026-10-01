export const circuitNames = ["salon", "cuisine", "garage", "chambre", "bureau", "jardin"];

export const initialElectricalConfiguration = {
  salon: true,
  cuisine: true,
  garage: false,
  chambre: true,
  bureau: false,
  jardin: true,
};

export function activeCircuitCount(configuration) {
  return Object.values(configuration).filter(Boolean).length;
}

export function isStableElectricalConfiguration(configuration) {
  const { salon, cuisine, garage, chambre, bureau, jardin } = configuration;
  return activeCircuitCount(configuration) === 3
    && salon !== cuisine
    && garage !== jardin
    && (!chambre || cuisine)
    && (!bureau || garage)
    && (!cuisine || !garage)
    && !(jardin && chambre);
}

export function allElectricalConfigurations() {
  return Array.from({ length: 64 }, (_, value) => Object.fromEntries(circuitNames.map((name, index) => [name, Boolean(value & (1 << index))])));
}
