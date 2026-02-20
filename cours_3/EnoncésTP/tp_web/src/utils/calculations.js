/**
 * Génère un tableau contenant les paliers de poids entre le minimum et le maximum.
 */
export const generateWeightSteps = (minWeight, maxWeight, rowCount) => {
  if (rowCount <= 1) return [minWeight];

  const steps = [];
  // Calcul de l'écart (le "pas") entre chaque ligne
  const stepValue = (maxWeight - minWeight) / (rowCount - 1);

  for (let i = 0; i < rowCount; i++) {
    // On arrondit à 1 décimale pour un affichage plus propre
    const currentWeight = minWeight + (stepValue * i);
    steps.push(Math.round(currentWeight * 10) / 10);
  }

  return steps;
};

/**
 * Calcule la plage de protéines en grammes par jour pour un poids et un objectif donnés.
 */
export const calculateProteinRange = (weight, minMultiplier, maxMultiplier) => {
  const minProtein = Math.round(weight * minMultiplier);
  const maxProtein = Math.round(weight * maxMultiplier);
  
  return `${minProtein} – ${maxProtein} g/jour`;
};