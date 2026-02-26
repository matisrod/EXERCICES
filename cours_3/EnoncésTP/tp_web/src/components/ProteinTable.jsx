import { objectives } from '../constants/objectivesData';
import { generateWeightSteps, getProteinRange } from '../utils/calculations';

function ProteinTable({ selectedObjectives, minWeight, maxWeight, rowCount }) {
  const weights = generateWeightSteps(minWeight, maxWeight, rowCount);
  
  // On filtre le tableau de base pour ne garder que les objectifs cochés par l'utilisateur
  const activeObjectives = objectives.filter(obj => selectedObjectives.includes(obj.id));

  if (activeObjectives.length === 0) return null;

  return (
    <div className="table-container">
      <h2>Besoins en protéines</h2>
      <table>
        <thead>
          <tr>
            <th>Poids (kg)</th>
            {activeObjectives.map(obj => (
              <th key={obj.id}>{obj.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 1ère boucle : on crée une ligne (tr) pour chaque palier de poids */}
          {weights.map(weight => (
            <tr key={weight}>
              <td>{weight}</td>
              
              {/* 2ème boucle : dans cette ligne, on crée une cellule (td) par objectif actif */}
              {activeObjectives.map(obj => (
                <td key={obj.id}>
                  {getProteinRange(weight, obj.minMultiplier, obj.maxMultiplier)}
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