import { OBJECTIVES_DATA } from '../constants/objectivesData';
import { generateWeightSteps, calculateProteinRange } from '../utils/calculations';

function ProteinTable({ selectedObjectives, minWeight, maxWeight, rowCount }) {
  // 1. On génère les lignes de poids dynamiquement
  const weights = generateWeightSteps(minWeight, maxWeight, rowCount);

  // 2. On filtre nos données de référence pour ne garder que les objectifs cochés
  const activeObjectives = OBJECTIVES_DATA.filter((obj) =>
    selectedObjectives.includes(obj.id)
  );

  return (
    <div className="table-container">
      <h2>📊 Vos besoins en protéines</h2>
      <table>
        <thead>
          <tr>
            {/* La première colonne fixe obligatoire */}
            <th>Poids (kg)</th>
            
            {/* Génération dynamique des colonnes selon les objectifs cochés */}
            {activeObjectives.map((obj) => (
              <th key={obj.id}>{obj.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* On boucle sur chaque poids calculé pour créer une ligne */}
          {weights.map((weight, index) => (
            <tr key={index}>
              <td>{weight} kg</td>
              
              {/* Pour chaque poids, on calcule la valeur pour chaque objectif actif */}
              {activeObjectives.map((obj) => (
                <td key={obj.id}>
                  {calculateProteinRange(weight, obj.minMultiplier, obj.maxMultiplier)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProteinTable;