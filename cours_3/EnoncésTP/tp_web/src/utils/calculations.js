export const generateWeightSteps = (min, max, count) => {
  if (count <= 1) return [min];
  const step = (max - min) / (count - 1);
  
  // Crée un tableau vide de taille 'count' et le remplit en calculant le poids de chaque ligne (avec un arrondi à 1 décimale)
  return Array.from({ length: count }, (_, i) => 
    Math.round((min + step * i) * 10) / 10
  );
};

export const getProteinRange = (weight, minMult, maxMult) => {
  return `${Math.round(weight * minMult)} - ${Math.round(weight * maxMult)}g`;
};