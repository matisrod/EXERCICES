import { objectives } from '../constants/objectivesData';

function ConfigForm({
  selectedObjectives,
  setSelectedObjectives,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  rowCount,
  setRowCount
}) {

  const toggleObjective = (id) => {
    // On prend l'état précédent ('prev'). Si l'id y est déjà, on le filtre pour le retirer.
    // Sinon, on recrée un tableau avec les anciens ids + le nouveau.
    setSelectedObjectives(prev => 
      prev.includes(id) ? prev.filter(objId => objId !== id) : [...prev, id]
    );
  };

  return (
    <section className="config-form">
      <h2>Paramètres</h2>
      
      <div className="form-group objectives-group">
        <h3>Objectifs</h3>
        <div className="checkboxes-container">
          {objectives.map((obj) => (
            <label className="checkbox-label">
              <input
                type="checkbox"
                value={obj.id}
                checked={selectedObjectives.includes(obj.id)}
                onChange={() => toggleObjective(obj.id)}
              />
              {obj.label}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group inputs-group">
        <h3>Données</h3>
        
        <div className="input-row">
          <label>
            Poids min (kg) :
            <input
              type="number"
              min="1"
              value={minWeight}
              onChange={(e) => setMinWeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-row">
          <label>
            Poids max (kg) :
            <input
              type="number"
              min={minWeight + 1}
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-row">
          <label>
            Lignes :
            <input
              type="number"
              min="2"
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export default ConfigForm;